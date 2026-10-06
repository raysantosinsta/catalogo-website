/*
  Test GIF page – verifies that GIFs from the public folder render correctly.
  The page showcases a single GIF (doce1.gif) with a premium layout.
*/

export const metadata = {
  title: "GIF Test – Antigravity Catalog",
  description: "A simple page to verify GIF rendering using the existing doce1.gif asset."
};

export default function GifTestPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] flex items-center justify-center p-8">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-light mb-6 text-[var(--foreground)]">
          Testando GIF
        </h1>
        <p className="mb-8 text-[var(--muted)]">
          Se o GIF aparecer abaixo, o carregamento de arquivos GIF está funcionando.
        </p>
        {/* Using a native <img> tag because Next.js Image component can have issues with animated GIFs */}
        <img
          src="/doce1.gif"
          alt="Teste de GIF"
          className="mx-auto rounded-lg shadow-lg border border-[var(--border)]"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </section>
    </main>
  );
}
