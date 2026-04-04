import { Link } from 'react-router-dom'
import { formatPrice } from '../data/storeData'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart()

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          Carrinho
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Suas peças selecionadas
        </h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-10 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <h2 className="text-2xl font-semibold text-[#24384d]">
            Seu carrinho está vazio
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            Explore o catálogo e adicione as peças que mais combinam com a proposta da sua compra.
          </p>
          <Link
            to="/catalogo"
            className="mt-6 inline-block rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Ir para o catálogo
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-4">
            {cartItems.map((item) => {
              const imageSrc =
                item.image || item.image_url || 'https://placehold.co/600x600?text=Produto'

              return (
                <div
                  key={item.cartKey}
                  className="grid gap-4 rounded-[1.75rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_10px_30px_rgba(36,56,77,0.04)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d7c8b5] hover:shadow-[0_18px_40px_rgba(36,56,77,0.08)] sm:grid-cols-[120px_1fr]"
                >
                  <img
                    src={imageSrc}
                    alt={item.name}
                    className="h-32 w-full rounded-[1.25rem] object-cover transition-all duration-300 hover:scale-[1.02] sm:w-[120px]"
                  />

                  <div className="flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-[#24384d]">{item.name}</h3>
                      <p className="mt-2 text-sm text-[#5d6d7d]">
                        {formatPrice(item.price)} cada
                      </p>
                      {item.selectedSize ? (
                        <p className="mt-2 text-sm font-medium text-[#3b648c]">
                          Tamanho escolhido: {item.selectedSize}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(item.cartKey)}
                        className="rounded-full border border-[#d8cbb9] bg-white px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
                      >
                        -
                      </button>

                      <span className="min-w-[40px] rounded-full border border-[#ebe1d6] bg-[#fcfaf7] px-3 py-2 text-center text-sm font-semibold text-[#24384d]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.cartKey)}
                        className="rounded-full border border-[#d8cbb9] bg-white px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
                      >
                        +
                      </button>

                      <button
                        onClick={() => removeFromCart(item.cartKey)}
                        className="rounded-full bg-[#efe3d4] px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e5d4c0] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </section>

          <aside className="h-max rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
              Resumo do pedido
            </div>

            <div className="mt-6 flex items-center justify-between border-b border-[#eadfce] pb-4">
              <span className="text-sm text-[#5d6d7d]">Subtotal</span>
              <span className="text-lg font-semibold text-[#24384d]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-b border-[#eadfce] pb-4">
              <span className="text-sm text-[#5d6d7d]">Envio</span>
              <span className="text-sm font-semibold text-[#24384d]">
                Definido na finalização
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-semibold text-[#24384d]">Total</span>
              <span className="text-2xl font-bold text-[#24384d]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-8 block w-full rounded-full bg-[#24384d] px-6 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Ir para a finalização
            </Link>

            <button
              onClick={clearCart}
              className="mt-3 w-full rounded-full border border-[#d8cbb9] bg-white px-6 py-4 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Limpar carrinho
            </button>
          </aside>
        </div>
      )}
    </main>
  )
}