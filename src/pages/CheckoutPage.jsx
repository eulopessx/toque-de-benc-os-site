import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, storeConfig } from '../data/storeData'
import { useCart } from '../context/CartContext'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()

  function handleFinishOrder() {
    clearCart()
    navigate('/pedido-sucesso')
  }

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-10 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Checkout
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Seu carrinho está vazio
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            Adicione produtos antes de continuar para o checkout.
          </p>
          <Link
            to="/catalogo"
            className="mt-6 inline-block rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
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
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          Checkout
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Finalize seu pedido
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)] sm:p-10">
          <h2 className="text-2xl font-semibold text-[#24384d]">
            Dados para entrega
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Nome completo"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="WhatsApp"
            />
            <input
              className="sm:col-span-2 rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="E-mail"
            />
            <input
              className="sm:col-span-2 rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Endereço"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Número"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Complemento"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Bairro"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Cidade"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="Estado"
            />
            <input
              className="rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              placeholder="CEP"
            />
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-[#24384d]">
            Forma de pagamento
          </h2>

          <div className="mt-6 grid gap-4">
            <label className="flex items-center gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d1c1ad] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
              <input type="radio" name="payment" defaultChecked />
              <span className="text-sm font-semibold text-[#24384d]">Pix</span>
            </label>

            <label className="flex items-center gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d1c1ad] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
              <input type="radio" name="payment" />
              <span className="text-sm font-semibold text-[#24384d]">Cartão de crédito</span>
            </label>

            <label className="flex items-center gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d1c1ad] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
              <input type="radio" name="payment" />
              <span className="text-sm font-semibold text-[#24384d]">Cartão de débito</span>
            </label>
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6c7b5] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
              Atendimento da loja
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
              Se preferir, você também pode concluir o pedido diretamente pelo
              WhatsApp da loja: {storeConfig.whatsappDisplay}
            </p>
          </div>
        </section>

        <aside className="h-max rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Resumo do pedido
          </div>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-[1.25rem] border border-[#eadfce] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d7c8b5] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-[1rem] object-cover transition-all duration-300 hover:scale-[1.03]"
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-[#24384d]">
                    {item.name}
                  </div>
                  <div className="mt-1 text-xs text-[#6d7a88]">
                    Quantidade: {item.quantity}
                  </div>
                </div>
                <div className="text-sm font-semibold text-[#24384d]">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-[#eadfce] pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5d6d7d]">Subtotal</span>
              <span className="text-sm font-semibold text-[#24384d]">
                {formatPrice(cartTotal)}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm text-[#5d6d7d]">Envio</span>
              <span className="text-sm font-semibold text-[#24384d]">
                Calculado após contato
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-lg font-semibold text-[#24384d]">Total</span>
              <span className="text-2xl font-bold text-[#24384d]">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          <button
            onClick={handleFinishOrder}
            className="mt-8 w-full rounded-full bg-[#24384d] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,56,77,0.14)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Confirmar pedido
          </button>

          <Link
            to="/carrinho"
            className="mt-3 block w-full rounded-full border border-[#d8cbb9] bg-white px-6 py-4 text-center text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Voltar ao carrinho
          </Link>
        </aside>
      </div>
    </main>
  )
}