import { Link } from 'react-router-dom'
import { storeConfig } from '../data/storeData'

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
      <section className="overflow-hidden rounded-[2.2rem] border border-[#ddd0c1] bg-white/80 shadow-[0_20px_60px_rgba(36,56,77,0.06)]">
        <div className="border-b border-[#eadfce] bg-[linear-gradient(135deg,rgba(239,227,212,0.55),rgba(255,255,255,0.95))] px-6 py-8 sm:px-8 lg:px-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Pedido enviado
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Seu pedido foi encaminhado com sucesso
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            Recebemos sua solicitação e o pedido foi direcionado para o WhatsApp da loja.
            Agora nossa equipe poderá confirmar os detalhes, frete e pagamento com você.
          </p>
        </div>

        <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-10">
          <div className="space-y-5">
            <div className="rounded-[1.7rem] border border-[#ddd0c1] bg-[#fbf8f4] p-5 shadow-[0_10px_24px_rgba(36,56,77,0.03)]">
              <div className="text-sm font-semibold text-[#24384d]">
                O que acontece agora?
              </div>

              <div className="mt-4 space-y-3 text-sm leading-7 text-[#5d6d7d]">
                <p>
                  1. A loja recebe seu pedido e analisa os produtos selecionados.
                </p>
                <p>
                  2. O valor do frete e os detalhes finais são confirmados no atendimento.
                </p>
                <p>
                  3. Depois disso, a finalização do pagamento é combinada com você.
                </p>
              </div>
            </div>

            <div className="rounded-[1.7rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_10px_24px_rgba(36,56,77,0.03)]">
              <div className="text-sm font-semibold text-[#24384d]">
                Atendimento da loja
              </div>

              <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
                Se quiser acelerar o contato, você também pode falar diretamente com a loja pelo WhatsApp.
              </p>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)]"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <aside className="rounded-[1.7rem] border border-[#ddd0c1] bg-[#fffdfb] p-5 shadow-[0_10px_24px_rgba(36,56,77,0.03)]">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
              Próximos passos
            </div>

            <div className="mt-4 space-y-3">
              <Link
                to="/catalogo"
                className="block w-full rounded-full bg-[#24384d] px-6 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)]"
              >
                Continuar comprando
              </Link>

              <Link
  to="/catalogo"
  className="block w-full rounded-full border border-[#d8cbb9] bg-white px-6 py-4 text-center text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]"
>
  Ver mais produtos
</Link>

              <Link
                to="/"
                className="block w-full rounded-full border border-[#e4d7c8] bg-[#fbf8f4] px-6 py-4 text-center text-sm font-semibold text-[#6a5848] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#f4ede5]"
              >
                Voltar para a home
              </Link>
            </div>

            <div className="mt-6 rounded-[1.3rem] border border-[#ece2d6] bg-[#fbf8f4] p-4">
              <div className="text-sm font-semibold text-[#24384d]">
                Importante
              </div>
              <p className="mt-2 text-sm leading-6 text-[#5d6d7d]">
                O frete e a confirmação final do pedido podem variar de acordo com sua região e disponibilidade.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}