import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { formatPrice, storeConfig } from '../data/storeData'
import { useCart } from '../context/CartContext'

const initialForm = {
  orderType: 'local',
  fullName: '',
  whatsapp: '',
  email: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  payment: 'Pix',
  notes: '',
}

function Field({ value, onChange, placeholder, className = '', ...props }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)] ${className}`}
      {...props}
    />
  )
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItems, cartTotal, clearCart } = useCart()

  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const whatsappLink = useMemo(() => {
    const itemsText = cartItems
      .map((item) => {
        const totalItem = item.price * item.quantity
        return `- ${item.name}${item.selectedSize ? ` | Tam: ${item.selectedSize}` : ''} | Qtd: ${item.quantity} | Total: ${formatPrice(totalItem)}`
      })
      .join('\n')

    const addressText = [
      form.address && `Endereço: ${form.address}`,
      form.number && `Número: ${form.number}`,
      form.complement && `Complemento: ${form.complement}`,
      form.neighborhood && `Bairro: ${form.neighborhood}`,
      form.city && `Cidade: ${form.city}`,
      form.state && `Estado: ${form.state}`,
      form.zipCode && `CEP: ${form.zipCode}`,
    ]
      .filter(Boolean)
      .join('\n')

    const orderTypeLabel =
      form.orderType === 'local'
        ? 'Entrega local / retirada com atendimento via WhatsApp'
        : 'Envio para outra região com solicitação de pagamento'

    const paymentText =
      form.orderType === 'local'
        ? 'Pagamento combinado no atendimento'
        : form.payment

    const message = `Olá, quero finalizar meu pedido na Toque de Bençãos.

*TIPO DE ATENDIMENTO*
${orderTypeLabel}

*DADOS DO CLIENTE*
Nome: ${form.fullName}
WhatsApp: ${form.whatsapp}
E-mail: ${form.email}

*ENTREGA*
${form.orderType === 'local' ? 'Pedido para atendimento local.' : addressText || 'Endereço não informado'}

*FORMA DE PAGAMENTO*
${paymentText}

*ITENS DO PEDIDO*
${itemsText}

*TOTAL DOS PRODUTOS*
${formatPrice(cartTotal)}

${form.notes ? `*OBSERVAÇÕES*\n${form.notes}` : ''}`

    return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`
  }, [cartItems, cartTotal, form])

  function validateForm() {
    if (!form.fullName.trim()) return 'Preencha seu nome completo.'
    if (!form.whatsapp.trim()) return 'Preencha seu WhatsApp.'
    if (!form.email.trim()) return 'Preencha seu e-mail.'

    if (form.orderType === 'shipping') {
      if (!form.address.trim()) return 'Preencha o endereço.'
      if (!form.number.trim()) return 'Preencha o número.'
      if (!form.neighborhood.trim()) return 'Preencha o bairro.'
      if (!form.city.trim()) return 'Preencha a cidade.'
      if (!form.state.trim()) return 'Preencha o estado.'
      if (!form.zipCode.trim()) return 'Preencha o CEP.'
    }

    return ''
  }

  function handleFinishOrder() {
    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    window.open(whatsappLink, '_blank')
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
            Adicione produtos antes de continuar para a finalização do pedido.
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
          Finalização do pedido
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Escolha a melhor forma de concluir sua compra
        </h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)] sm:p-10">
          <h2 className="text-2xl font-semibold text-[#24384d]">
            Tipo de atendimento
          </h2>

          <div className="mt-6 grid gap-4">
            <label className="flex items-start gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
              <input
                type="radio"
                name="orderType"
                value="local"
                checked={form.orderType === 'local'}
                onChange={handleChange}
              />
              <div>
                <div className="text-sm font-semibold text-[#24384d]">
                  Entrega local ou retirada
                </div>
                <div className="mt-1 text-sm text-[#5d6d7d]">
                  Ideal para quem está mais perto e deseja concluir o atendimento diretamente com a loja pelo WhatsApp.
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
              <input
                type="radio"
                name="orderType"
                value="shipping"
                checked={form.orderType === 'shipping'}
                onChange={handleChange}
              />
              <div>
                <div className="text-sm font-semibold text-[#24384d]">
                  Envio para outras regiões
                </div>
                <div className="mt-1 text-sm text-[#5d6d7d]">
                  Para pedidos de fora, os dados são enviados para a loja e o pagamento segue com atendimento organizado e seguro.
                </div>
              </div>
            </label>
          </div>

          <h2 className="mt-10 text-2xl font-semibold text-[#24384d]">
            Seus dados
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Nome completo"
            />
            <Field
              name="whatsapp"
              value={form.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
            />
            <Field
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="sm:col-span-2"
            />

            {form.orderType === 'shipping' ? (
              <>
                <Field
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Endereço"
                  className="sm:col-span-2"
                />
                <Field
                  name="number"
                  value={form.number}
                  onChange={handleChange}
                  placeholder="Número"
                />
                <Field
                  name="complement"
                  value={form.complement}
                  onChange={handleChange}
                  placeholder="Complemento"
                />
                <Field
                  name="neighborhood"
                  value={form.neighborhood}
                  onChange={handleChange}
                  placeholder="Bairro"
                />
                <Field
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Cidade"
                />
                <Field
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Estado"
                />
                <Field
                  name="zipCode"
                  value={form.zipCode}
                  onChange={handleChange}
                  placeholder="CEP"
                />
              </>
            ) : null}
          </div>

          {form.orderType === 'shipping' ? (
            <>
              <h2 className="mt-10 text-2xl font-semibold text-[#24384d]">
                Forma de pagamento desejada
              </h2>

              <div className="mt-6 grid gap-4">
                {['Pix', 'Cartão de crédito', 'Cartão de débito'].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-3 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d1c1ad] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option}
                      checked={form.payment === option}
                      onChange={handleChange}
                    />
                    <span className="text-sm font-semibold text-[#24384d]">{option}</span>
                  </label>
                ))}
              </div>
            </>
          ) : null}

          <div className="mt-8">
            <label className="mb-2 block text-sm font-semibold text-[#24384d]">
              Observações do pedido
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Ex.: referência do endereço, melhor horário para contato, observações da entrega..."
              className="min-h-[120px] w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
            />
          </div>

          <div className="mt-10 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6c7b5] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
              Atendimento da loja
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
              Se preferir, você também pode concluir o pedido diretamente pelo WhatsApp da loja: {storeConfig.whatsappDisplay}
            </p>
          </div>

          {error ? (
            <div className="mt-6 rounded-2xl border border-[#f0d0d0] bg-[#fff5f5] px-4 py-3 text-sm text-[#a33b3b]">
              {error}
            </div>
          ) : null}
        </section>

        <aside className="h-max rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Resumo do pedido
          </div>

          <div className="mt-6 space-y-4">
            {cartItems.map((item) => {
              const imageSrc =
                item.image || item.image_url || 'https://placehold.co/600x600?text=Produto'

              return (
                <div
                  key={item.cartKey}
                  className="flex items-center gap-4 rounded-[1.25rem] border border-[#eadfce] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d7c8b5] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]"
                >
                  <img
                    src={imageSrc}
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
                    {item.selectedSize ? (
                      <div className="mt-1 text-xs text-[#6d7a88]">
                        Tamanho: {item.selectedSize}
                      </div>
                    ) : null}
                  </div>
                  <div className="text-sm font-semibold text-[#24384d]">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              )
            })}
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
                {form.orderType === 'local' ? 'Combinado no atendimento' : 'Calculado após contato'}
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
            {form.orderType === 'local'
              ? 'Enviar pedido pelo WhatsApp'
              : 'Solicitar finalização do pedido'}
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