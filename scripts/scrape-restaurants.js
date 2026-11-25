const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const rawUrls = [
  'https://domrestaurante.com.br/',
  'https://www.restaurantemani.com.br/',
  'https://mocoto.com.br/',
  'https://www.evvai.com.br/',
  'https://cocobambu.com/',
  'https://www.outback.com.br/',
  'https://www.restaurantemadero.com.br/pt',
  'https://familiabraz.com.br/',
  'https://bullguer.com/',
  'https://ororestaurante.com.br/',
  'https://restaurantedrummond.com.br/',
  'https://www.jardimsecretogastronomia.com.br/',
  'https://salcumbuco.com/',
  'https://www.casadosolrestaurante.com.br/',
  'https://meatzburger.com/',
  'https://www.institutopizza.com.br/',
  'https://pizzabis.com.br/',
  'https://artesanopizzabar.com.br/',
  'https://www.fortalezapizzaria.com/'
];

function normalizeUrl(urlStr) {
  try {
    const parsed = new URL(urlStr.trim());
    let host = parsed.hostname.toLowerCase();
    if (host.startsWith('www.')) host = host.slice(4);
    let pathname = parsed.pathname.replace(/\/+$/, '');
    return `${parsed.protocol}//${host}${pathname}${parsed.search}`;
  } catch (e) {
    return urlStr.trim().replace(/\/+$/, '');
  }
}

// Deduplicate
const seen = new Set();
const cleanUrls = [];

for (const raw of rawUrls) {
  const norm = normalizeUrl(raw);
  if (!seen.has(norm)) {
    seen.add(norm);
    cleanUrls.push(raw.trim());
  }
}

console.log(`[Etapa 1] URLs fornecidas: ${rawUrls.length} | URLs únicas: ${cleanUrls.length}`);

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function run() {
  const outputDir = path.resolve(__dirname, '../public/restaurantes');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    ignoreHTTPSErrors: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--window-size=1440,900',
      '--ignore-certificate-errors'
    ]
  });

  const results = [];

  for (let i = 0; i < cleanUrls.length; i++) {
    const url = cleanUrls[i];
    console.log(`\n[${i + 1}/${cleanUrls.length}] Acessando: ${url}`);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');

    let loaded = false;
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      loaded = true;
    } catch (err) {
      console.warn(`Aviso ao carregar ${url}: ${err.message}. Tentando continuar...`);
      try {
        await page.goto(url, { waitUntil: 'load', timeout: 20000 });
        loaded = true;
      } catch (e) {
        console.error(`Falha ao abrir ${url}: ${e.message}`);
      }
    }

    if (loaded) {
      try {
        // Wait 3.5s for fonts, hero images and CSS animations
        await new Promise(r => setTimeout(r, 3500));

        // Auto-accept cookie banners if visible
        try {
          await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button, a'));
            const acceptBtn = buttons.find(b => {
              const text = (b.innerText || '').toLowerCase().trim();
              return text === 'aceitar' || text === 'aceitar todos' || text === 'concordo' || text === 'fechar' || text.includes('aceito');
            });
            if (acceptBtn) acceptBtn.click();
          });
          await new Promise(r => setTimeout(r, 800));
        } catch (_) {}

        const siteData = await page.evaluate(() => {
          const title = (document.title || '').trim();
          const metaDesc = (
            document.querySelector('meta[name="description"]')?.getAttribute('content') ||
            document.querySelector('meta[property="og:description"]')?.getAttribute('content') ||
            document.querySelector('meta[name="twitter:description"]')?.getAttribute('content') ||
            ''
          ).trim();
          const ogTitle = (document.querySelector('meta[property="og:title"]')?.getAttribute('content') || '').trim();
          const ogSiteName = (document.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || '').trim();

          // Search hero headlines
          const h1 = (document.querySelector('h1')?.innerText || '').trim();
          const h2 = (document.querySelector('h2')?.innerText || '').trim();
          const heroP = (
            document.querySelector('.hero p, header p, [class*="hero"] p, [id*="hero"] p, main p, section p, p')?.innerText || ''
          ).trim();

          return { title, metaDesc, ogTitle, ogSiteName, h1, h2, heroP };
        });

        // Determine company name
        let companyName = siteData.ogSiteName;
        if (!companyName || companyName.length < 3) {
          companyName = siteData.ogTitle || siteData.title;
        }

        // Clean up title decorations
        if (companyName) {
          companyName = companyName
            .split(/[|\-–—•]/)[0]
            .replace(/\.(com|br|net|org).*/i, '')
            .replace(/^(Bem-vindo(a)?\s+(a(o)?\s+)?|Conheça\s+(o\s+)?)/i, '')
            .trim();
        }

        const parsed = new URL(url);
        if (!companyName || companyName.length < 2) {
          const rawDomain = parsed.hostname.replace(/^(www\.)?/, '').split('.')[0];
          companyName = rawDomain.charAt(0).toUpperCase() + rawDomain.slice(1);
        }

        const slug = slugify(companyName || `restaurante-${i+1}`);
        const imageFilename = `hero-${slug}.png`;
        const imagePath = path.join(outputDir, imageFilename);
        const publicImagePath = `/restaurantes/${imageFilename}`;

        // Viewport screenshot strictly above the fold (1440x900)
        await page.screenshot({
          path: imagePath,
          clip: { x: 0, y: 0, width: 1440, height: 900 }
        });

        console.log(`✓ [${companyName}] Screenshot salvo: ${imageFilename}`);

        results.push({
          url,
          companyName,
          slug,
          imagePath: publicImagePath,
          meta: siteData,
          status: 'success'
        });

      } catch (innerErr) {
        console.error(`Erro ao processar página ${url}:`, innerErr.message);
        results.push({
          url,
          error: innerErr.message,
          status: 'partial_error'
        });
      }
    } else {
      results.push({
        url,
        status: 'failed'
      });
    }

    await page.close();
  }

  await browser.close();

  fs.writeFileSync(path.resolve(__dirname, 'scraping-results.json'), JSON.stringify(results, null, 2), 'utf8');
  console.log('\n[Fim] Scraping finalizado. Resultados salvos em scripts/scraping-results.json');
}

run().catch(console.error);
