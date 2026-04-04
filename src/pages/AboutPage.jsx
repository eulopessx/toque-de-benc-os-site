export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <img
            src="/logo-toque-de-bencaos.png"
            alt="Logo Toque de Bençãos"
            className="h-full min-h-[380px] w-full object-cover"
          />
        </div>

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/70 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Sobre a marca
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Fé, delicadeza e elegância em cada detalhe da Toque de Bençãos
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            A Toque de Bençãos nasceu com o desejo de unir beleza, modéstia e
            identidade cristã em uma proposta de moda acolhedora e cheia de
            significado. Mais do que apresentar peças, a marca busca transmitir
            leveza, feminilidade, cuidado e uma presença visual coerente com os
            valores da fé católica.
          </p>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            O site foi pensado para refletir essa essência com mais clareza e
            profissionalismo, valorizando a logo, organizando melhor a navegação
            e apresentando o catálogo de maneira elegante, intuitiva e
            agradável. Assim, cada visita se transforma em uma experiência mais
            bonita, mais segura e mais alinhada ao posicionamento da marca.
          </p>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            A estrutura da loja foi desenvolvida de acordo com as categorias
            reais trabalhadas pela marca, como Baby Look Feminina, Camiseta
            Masculina, Baby Look Infantil, Camiseta Infantil e Body para Bebês.
            Isso fortalece a identidade da vitrine e ajuda a loja a crescer com
            mais consistência, presença e credibilidade.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Essência
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Moda católica com suavidade e propósito
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Navegação
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Estrutura clara, elegante e responsiva
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Catálogo
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Peças organizadas com mais presença e beleza
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Experiência
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Mais confiança para acolher e converter
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 rounded-[2rem] border border-[#ddd0c1] bg-white/70 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          Nossa proposta
        </div>

        <h2 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Vestir com beleza, recato, identidade e presença cristã
        </h2>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-[#5a6b7b] sm:text-base">
          A proposta da Toque de Bençãos é oferecer uma vitrine digital que una
          bom gosto, acolhimento e profissionalismo, criando uma presença mais
          forte para a marca e uma experiência mais agradável para quem compra.
          Cada detalhe do site foi pensado para valorizar a identidade da loja,
          fortalecer a confiança do cliente e servir como base para um
          crescimento sólido, bonito e coerente com os valores da moda católica.
        </p>
      </section>
    </main>
  )
}