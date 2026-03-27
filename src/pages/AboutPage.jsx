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
            Delicadeza, propósito e uma presença digital mais forte para a
            Toque de Bençãos
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            A Toque de Bençãos nasce com uma proposta acolhedora e cheia de
            identidade. O objetivo do site é transformar essa essência em uma
            experiência visual mais elegante, organizada e profissional, sem
            perder a leveza que faz parte da marca.
          </p>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            O projeto foi construído para valorizar melhor sua logo, melhorar a
            navegação e apresentar os produtos com mais clareza. Assim, a loja
            transmite confiança tanto para quem acessa pelo celular quanto para
            quem acessa pelo computador.
          </p>

          <p className="mt-5 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            Além do visual refinado, a estrutura também foi alinhada ao mix real
            da sua loja: Baby Look Feminina, Camiseta Masculina, Baby Look
            Infantil, Camiseta Infantil e Body para Bebês. Isso deixa o catálogo
            mais profissional, mais sofisticado e mais coerente com a proposta
            da marca.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Identidade
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Visual leve, elegante e acolhedor
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Estrutura
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Navegação clara e responsiva
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Catálogo
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Categorias mais profissionais
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Experiência
              </div>
              <div className="mt-2 text-lg font-semibold text-[#24384d]">
                Mais confiança para converter
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
          Uma loja pensada para vestir com beleza, simplicidade e presença
        </h2>

        <p className="mt-5 max-w-4xl text-sm leading-7 text-[#5a6b7b] sm:text-base">
          A intenção da Toque de Bençãos é oferecer peças com estética delicada
          e apresentação cuidadosa, criando uma experiência mais agradável para
          o cliente e uma vitrine mais forte para a marca. O site foi desenhado
          para crescer junto com a loja e servir como base para uma operação
          digital ainda mais completa no futuro.
        </p>
      </section>
    </main>
  )
}