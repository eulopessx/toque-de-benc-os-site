import { Link } from 'react-router-dom'
import { storeConfig } from '../data/storeData'

export default function OrderSuccessPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:px-8 lg:py-16">
      <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-10 text-center shadow-[0_20px_60px_rgba(36,56,77,0.05)] sm:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#efe3d4] text-3xl text-[#24384d]">
          ✓
        </div>

        <div className="mt-6 text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          Pedido confirmado
        </div>

        <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Seu pedido foi enviado com sucesso
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
          Obrigado por comprar na Toque de Bençãos. Agora você pode continuar
          navegando no site ou falar com a loja para acompanhar os próximos passos.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <a
            href={`https://wa.me/${storeConfig.whatsappNumber}`}
            className="rounded-full bg-[#24384d] px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Falar no WhatsApp
          </a>

          <Link
            to="/catalogo"
            className="rounded-full border border-[#d8cbb9] px-6 py-4 text-sm font-semibold text-[#24384d] transition hover:bg-white"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </main>
  )
}