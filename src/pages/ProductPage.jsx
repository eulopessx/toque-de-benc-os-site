import { Link, useParams } from 'react-router-dom'
import {
  products,
  formatPrice,
  getCategoryName,
} from '../data/storeData'
import { useCart } from '../context/CartContext'

function InfoPill({ children }) {
  return (
    <span className="rounded-full border border-[#ddd0c1] bg-white px-4 py-2 text-xs font-semibold text-[#526374]">
      {children}
    </span>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const product = products.find((item) => String(item.id) === String(id))

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_20px_60px_rgba(36,56,77,0.05)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Produto não encontrado
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Não encontramos este produto no catálogo.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            Pode ser que ele ainda não tenha sido cadastrado, tenha sido removido
            ou que o link não esteja correto.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-block rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <Link
          to="/catalogo"
          className="text-sm font-semibold text-[#3b648c] transition hover:text-[#24384d]"
        >
          ← Voltar ao catálogo
        </Link>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="h-full min-h-[420px] w-full object-cover"
            />
            <div className="absolute left-5 top-5 rounded-full bg-[#24384d] px-4 py-2 text-xs font-semibold text-white">
              {product.badge}
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Produto em destaque
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-sm leading-7 text-[#5d6d7d] sm:text-base">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span className="text-2xl font-bold text-[#24384d] sm:text-3xl">
              {formatPrice(product.price)}
            </span>
            <span className="text-base text-[#8f96a0] line-through sm:text-lg">
              {formatPrice(product.oldPrice)}
            </span>
          </div>

          <div className="mt-2 text-sm text-[#6d7a88]">
            ou em até 6x sem complicação
          </div>

          <div className="mt-8">
            <div className="text-sm font-semibold text-[#24384d]">Tamanhos disponíveis</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {product.sizes?.map((size) => (
                <InfoPill key={size}>{size}</InfoPill>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Categoria
              </div>
              <div className="mt-2 text-sm font-semibold text-[#24384d]">
                {getCategoryName(product.category)}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Compra segura
              </div>
              <div className="mt-2 text-sm font-semibold text-[#24384d]">
                Pix, cartão e atendimento via WhatsApp
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToCart(product)}
              className="rounded-full bg-[#24384d] px-7 py-4 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Adicionar ao carrinho
            </button>

            <a
              href="https://wa.me/5500000000000"
              className="rounded-full border border-[#b8a894] px-7 py-4 text-center text-sm font-semibold text-[#24384d] transition hover:bg-[#efe3d4]"
            >
              Comprar pelo WhatsApp
            </a>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
              Observação
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
              Esta página já está pronta como base para uma página real de produto.
              Depois você poderá conectar estoque, variações, parcelamento real,
              frete e checkout.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}