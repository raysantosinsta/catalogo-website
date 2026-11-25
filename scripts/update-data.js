const fs = require('fs');
const path = require('path');

const dataFilePath = path.resolve(__dirname, '../data.json');
const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

const restaurantsData = [
  {
    id: "dom-restaurante",
    title: "D.O.M. Restaurante",
    summary: "Referência internacional em alta gastronomia brasileira comandada pelo chef Alex Atala.",
    description: "Referência internacional em alta gastronomia brasileira comandada pelo chef Alex Atala, explorando ingredientes autênticos e sabores únicos da biodiversidade nacional.",
    architecture: "Landing page institucional moderna desenvolvida com Next.js, React e Tailwind CSS, destacando a alta gastronomia, cardápio autoral e sistema de reservas online.",
    tags: ["Gastronomia", "Alta Culinária", "Next.js", "React", "Tailwind CSS"],
    image: "/restaurantes/hero-dom-restaurante.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://domrestaurante.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "restaurante-mani",
    title: "Maní",
    summary: "Cozinha contemporânea brasileira, autoral e orgânica liderada pela chef Helena Rizzo.",
    description: "Cozinha brasileira contemporânea, autoral e orgânica liderada pela chef premiada Helena Rizzo e Willem Vandeven, unindo alta técnica e memória afetiva.",
    architecture: "Landing page sofisticada desenvolvida com Next.js, React e Tailwind CSS, com tipografia editorial e experiência visual imersiva.",
    tags: ["Cozinha Autoral", "Orgânica", "Helena Rizzo", "React", "Next.js"],
    image: "/restaurantes/hero-mani.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.restaurantemani.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "mocoto-restaurante",
    title: "Mocotó",
    summary: "Tradicional restaurante de comida sertaneja acolhendo diferentes paladares sob a direção de Rodrigo Oliveira.",
    description: "O Mocotó une tradição sertaneja e inovação gastronômica na Vila Medeiros em São Paulo, servindo sabores autênticos reconhecidos internacionalmente.",
    architecture: "Plataforma web ágil e responsiva com cardápio digital, integração com delivery e apresentação de história da casa.",
    tags: ["Comida Sertaneja", "Tradição", "Next.js", "Tailwind CSS", "Cardápio Digital"],
    image: "/restaurantes/hero-mocoto.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://mocoto.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "evvai-restaurante",
    title: "Evvai",
    summary: "Duas estrelas Michelin celebrando a cozinha oriundi moderna em conexão entre Brasil e Itália.",
    description: "Restaurante com duas estrelas Michelin sob comando do chef Luiz Filipe Souza, reinterpretando raízes italianas com os melhores ingredientes brasileiros.",
    architecture: "Interface minimalista e elegante com foco em storytelling gastronômico, reserva integrada e fotografia de alta definição.",
    tags: ["Michelin 2 Estrelas", "Cozinha Oriundi", "Alta Gastronomia", "React", "Next.js"],
    image: "/restaurantes/hero-evvai.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.evvai.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "coco-bambu",
    title: "Coco Bambu",
    summary: "A maior e mais premiada rede de restaurantes de frutos do mar do Brasil.",
    description: "Referência em frutos do mar com porções fartas, ambiente familiar acolhedor e mais de 100 restaurantes espalhados pelo território nacional.",
    architecture: "Portal corporativo de alta escalabilidade com localização de lojas, reservas, pedidos online e clube de fidelidade.",
    tags: ["Frutos do Mar", "Rede Nacional", "Portal Institucional", "E-commerce"],
    image: "/restaurantes/hero-portal-coco-bambu.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://cocobambu.com/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "outback-steakhouse",
    title: "Outback Steakhouse",
    summary: "Steakhouse de inspiração australiana famosa por cortes nobres e clima descontraído.",
    description: "Site oficial da rede Outback Steakhouse no Brasil, onde a regra é estar tudo do seu jeito com carnes suculentas e o tradicional Momento Outback.",
    architecture: "Web app responsivo com catálogo de itens interativo, busca de unidades por geolocalização e canal de delivery integrado.",
    tags: ["Steakhouse", "Carnes Nobres", "Next.js", "Geolocalização", "Delivery"],
    image: "/restaurantes/hero-outback-steakhouse.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.outback.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "restaurante-madero",
    title: "Madero",
    summary: "Famoso pelo 'melhor cheeseburger do mundo', carnes nobres e ingredientes 100% naturais.",
    description: "Referência gastronômica em hambúrgueres artesanais e grelhados nobres, priorizando sustentabilidade, produção própria e alimentação saudável.",
    architecture: "Portal de alta performance para a rede Madero, destacando cardápio saudável, rastreabilidade de ingredientes e mapa de restaurantes.",
    tags: ["Hambúrguer Gourmet", "Carnes Nobres", "Sustentabilidade", "Next.js"],
    image: "/restaurantes/hero-madero.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://restaurantemadero.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "familia-braz",
    title: "Família Bráz",
    summary: "Há mais de 25 anos honrando e perpetuando o legado da pizza e gastronomia italiana no Brasil.",
    description: "A Família Bráz transforma ingredientes simples em momentos inesquecíveis, com receitas autênticas de pizzas e massas tradicionais.",
    architecture: "Landing page com design acolhedor, atmosfera rústica contemporânea e cardápio interativo com histórico das receitas.",
    tags: ["Pizzaria Tradicional", "Cozinha Italiana", "Herança Familiar", "Tailwind CSS"],
    image: "/restaurantes/hero-familia-braz.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://familiabraz.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "bullguer-brasil",
    title: "Bullguer",
    summary: "O primeiro smash burger do Brasil, oferecendo hambúrgueres artesanais rápidos e leves.",
    description: "Pioneira na revolução do smash burger no Brasil desde 2014, combinando pão fofinho, carne prensada no ponto certo e molhos especiais.",
    architecture: "Landing page vibrante com foco no público jovem, pedidos online integrados e catálogo visual dos produtos prediletos.",
    tags: ["Smash Burger", "Fast-Casual", "Delivery", "React", "Mobile First"],
    image: "/restaurantes/hero-bullguer.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://bullguer.com/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "oro-restaurante",
    title: "Oro",
    summary: "Cozinha brasileira de vanguarda feita no fogo por Felipe Bronze, duas estrelas Michelin no Leblon.",
    description: "Com duas estrelas Michelin, o Oro celebra a criatividade e ousadia na brasa com menus degustação exclusivos no coração do Leblon, Rio de Janeiro.",
    architecture: "Design minimalista escuro com fotos de alta gastronomia, foco em reservas antecipadas e apresentação detalhada dos menus autorais.",
    tags: ["Michelin 2 Estrelas", "Felipe Bronze", "Vanguarda na Brasa", "Next.js"],
    image: "/restaurantes/hero-oro.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://ororestaurante.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "restaurante-drummond",
    title: "Restaurante Drummond",
    summary: "Gastronomia contemporânea com notas de poesia na Praia Brava, valorizando a brasilidade.",
    description: "Restaurante contemporâneo elegante na Praia Brava (SC) com pratos arrojados inspirados na cultura e riqueza culinária brasileira.",
    architecture: "Layout sofisticado com visualização de reservas, cardápio executivo e integração com redes sociais.",
    tags: ["Gastronomia Contemporânea", "Praia Brava", "Culinária Brasileira", "Tailwind CSS"],
    image: "/restaurantes/hero-restaurante-drummond.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://restaurantedrummond.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "jardim-secreto-gastronomia",
    title: "Jardim Secreto Gastronomia",
    summary: "Restaurante com jardim no Batel em Curitiba, unindo gastronomia, natureza e afeto sem pressa.",
    description: "Espaço intimista cercado de verde no Batel, perfeito para almoços, jantares e celebrações especiais com cozinha artesanal autoral.",
    architecture: "Landing page botânica e acolhedora com tipografia serifada, galeria de fotos do jardim e módulo de reserva de mesas.",
    tags: ["Restaurante Jardim", "Cozinha Afetiva", "Curitiba", "React", "Next.js"],
    image: "/restaurantes/hero-jardim-secreto.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.jardimsecretogastronomia.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "sal-cumbuco-restaurante",
    title: "Sal Cumbuco Restaurante",
    summary: "Frutos do mar frescos, moquecas e menu executivo em ambiente praiano com jardim no Ceará.",
    description: "Restaurante especializado em frutos do mar em Cumbuco (Caucaia-CE), com atmosfera tropical, piscina, jardim arborizado e proposta pet-friendly.",
    architecture: "Site com estética litorânea e descontraída, destacando o menu executivo, moquecas tradicionais e localização à beira-mar.",
    tags: ["Frutos do Mar", "Cumbuco", "Pet Friendly", "Next.js", "Tailwind CSS"],
    image: "/restaurantes/hero-sal-cumbuco-restaurante.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://salcumbuco.com/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "casa-do-sol-restaurante",
    title: "Casa do Sol Cozinha e Jardim",
    summary: "Restaurante contemporâneo no Botânico Shopping em BH com cozinha afetiva e jardim acolhedor.",
    description: "Espaço de encontros e celebrações em Belo Horizonte, mesclando arquitetura natural, drinks autorais e pratos contemporâneos afetivos.",
    architecture: "Interface clean com micro-interações elegantes, apresentação do cardápio sazonal e sistema de reserva de eventos.",
    tags: ["Cozinha Afetiva", "Coquetelaria", "Jardim", "Belo Horizonte", "Next.js"],
    image: "/restaurantes/hero-casa-do-sol-cozinha-e-jardim.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.casadosolrestaurante.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "meatz-burger",
    title: "Meatz Burger",
    summary: "Hamburgueria artesanal com foco no simples da melhor forma, carnes frescas e receita exclusiva.",
    description: "Hambúrguer artesanal de alta qualidade feito com ingredientes frescos e processo rigoroso de smash, entregando sabor genuíno e entrega rápida.",
    architecture: "Web app de pedidos diretos com design moderno, promoções do dia e checkout otimizado.",
    tags: ["Hambúrguer Artesanal", "Smash Burger", "Delivery Rápido", "React"],
    image: "/restaurantes/hero-meatz-burger.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://meatzburger.com/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "instituto-pizza",
    title: "Instituto Pizza",
    summary: "Pizza artesanal no Butantã em São Paulo com forno quente e ambiente acolhedor para encontros sem pressa.",
    description: "Pizzaria artesanal focada em fermentação lenta, ingredientes selecionados e receitas tradicionais em ambiente aconchegante no Butantã.",
    architecture: "Landing page moderna com tema escuro e acolhedor, cardápio digital dinâmico e integração direta para reserva de mesas.",
    tags: ["Pizza Artesanal", "Fermentação Lenta", "São Paulo", "Next.js", "Tailwind CSS"],
    image: "/restaurantes/hero-instituto-pizza.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.institutopizza.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "pizza-bis",
    title: "Pizza Bis",
    summary: "Tradição em pizza artesanal no Sul e Sudeste há mais de 15 anos com sabores e ingredientes premium.",
    description: "Rede conceituada com unidades em Balneário Camboriú, Itajaí, Curitiba e Maringá, famosa por massas leves e combinações autorais exclusivas.",
    architecture: "Portal multi-unidades com seletor de cidade, integração com WhatsApp e delivery integrado.",
    tags: ["Pizzaria Artesanal", "Multi-unidades", "Ingredientes Premium", "Next.js"],
    image: "/restaurantes/hero-pizza-bis.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://pizzabis.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "artesano-pizza-bar",
    title: "Artesano Pizza Bar",
    summary: "Gastronomia feita com arte e eleita entre as melhores pizzarias do mundo na Lagoa da Conceição.",
    description: "Desde 2008 criando novos sabores em Florianópolis, o Artesano Pizza Bar preza pela excelência em ingredientes e harmonização com carta de bebidas.",
    architecture: "Design rústico elegante com visualização da carta de vinhos e pizzas autorais, fotos do ambiente e reservas online.",
    tags: ["Pizza Gourmet", "TripAdvisor Top 10%", "Florianópolis", "Next.js"],
    image: "/restaurantes/hero-artesano-pizza-bar.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://artesanopizzabar.com.br/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  },
  {
    id: "pizzaria-fortaleza",
    title: "Pizzaria Fortaleza",
    summary: "Pizzas artesanais com massas crocantes, ingredientes frescos e pedidos online rápidos via WhatsApp.",
    description: "Pizzaria tradicional com foco em qualidade, carinho no preparo e entrega rápida de pizzas doces e salgadas diretamente do forno pra sua mesa.",
    architecture: "Landing page de alta conversão com pedido direto no WhatsApp, cálculo de taxa de entrega e catálogo interativo.",
    tags: ["Pizzaria", "Pedidos WhatsApp", "Massa Artesanal", "Conversão Rápida"],
    image: "/restaurantes/hero-pizzaria-fortaleza.png",
    colSpan: "col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    demoUrl: "https://www.fortalezapizzaria.com/",
    repoUrl: "",
    category: "restaurante",
    segment: "restaurante"
  }
];

// Check and append without duplication
const existingIds = new Set(data.criacaoDeSites.map(p => p.id));
let addedCount = 0;

for (const rest of restaurantsData) {
  if (!existingIds.has(rest.id)) {
    data.criacaoDeSites.push(rest);
    existingIds.add(rest.id);
    addedCount++;
  }
}

fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Sucesso: ${addedCount} novos restaurantes adicionados a data.json! Total criacaoDeSites: ${data.criacaoDeSites.length}`);
