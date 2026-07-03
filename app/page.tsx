export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-700 to-black px-6 text-white">
      <section className="max-w-3xl text-center">
        <div className="mb-8 text-6xl">❤️</div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Fundación Corazón Valiente
        </h1>

        <p className="text-xl md:text-2xl text-red-100 mb-8">
          Nuestro sitio web se encuentra en construcción.
        </p>

        <p className="text-lg text-white/80 max-w-2xl mx-auto">
          Muy pronto compartiremos nuestros programas, proyectos e iniciativas
          para transformar vidas y construir esperanza junto a la comunidad.
        </p>

        <div className="mt-10 inline-flex rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-widest">
          Próximamente
        </div>

        <p className="mt-12 text-sm text-white/60">
          © {new Date().getFullYear()} Fundación Corazón Valiente
        </p>
      </section>
    </main>
  );
}