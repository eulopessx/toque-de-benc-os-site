import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import {
  formatPrice,
  getCategoryName,
  normalizeProductFromDatabase,
  storeConfig,
} from '../data/storeData'
import { useCart } from '../context/CartContext'

function SelectableSizePill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 ${
        active
          ? 'border-[#24384d] bg-[#24384d] text-white'
          : 'border-[#ddd0c1] bg-white text-[#526374] hover:border-[#cdbda8] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]'
      }`}
    >
      {children}
    </button>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProduct()
  }, [id])

  useEffect(() => {
    setSelectedSize('')
    setMessage('')
  }, [product?.id])

  async function loadProduct() {
    setLoading(true)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .eq('active', true)
      .maybeSingle()

    if (error) {
      console.error('Erro ao carregar produto:', error.message)
      setProduct(null)
      setLoading(false)
      return
    }

    setProduct(data ? normalizeProductFromDatabase(data) : null)
    setLoading(false)
  }

  function handleAddToCart() {
    if (product.sizes?.length && !selectedSize) {
      setMessage('Selecione o tamanho desejado antes de adicionar ao carrinho.')
      return
    }

    addToCart(product, selectedSize)
    setMessage('Produto adicionado ao carrinho com sucesso.')
  }

  const imageSrc = useMemo(() => {
    return product?.image_url || product?.image || '/placeholder-product.jpg'
  }, [product])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_20px_60px_rgba(36,56,77,0.05)] sm:p-10">
          <h1 className="text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Carregando produto...
          </h1>
        </div>
      </main>
    )
  }

  if (!product) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_20px_60px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_28px_70px_rgba(36,56,77,0.08)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Produto não encontrado
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Não encontramos esta peça no catálogo.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            É possível que ela ainda não esteja disponível, tenha sido removida ou que o link acessado não esteja correto.
          </p>
          <Link
            to="/catalogo"
            className="mt-8 inline-block rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
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
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#3b648c] transition-all duration-200 ease-out hover:translate-x-1 hover:text-[#24384d]"
        >
          <span>←</span>
          <span>Voltar ao catálogo</span>
        </Link>
      </div>

      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="group overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(36,56,77,0.10)]">
          <div className="relative overflow-hidden">
            <img
              src={imageSrc}
              alt={product.name}
              className="h-full min-h-[420px] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />

            {product.badge ? (
              <div className="absolute left-5 top-5 rounded-full bg-[#24384d] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(36,56,77,0.18)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#1f3347]">
                {product.badge}
              </div>
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-[#24384d]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Moda católica com identidade
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

            {product.oldPrice > 0 ? (
              <span className="text-base text-[#8f96a0] line-through sm:text-lg">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
          </div>

          <div className="mt-2 text-sm text-[#6d7a88]">
            Elegância, fé e conforto em uma peça pensada para o seu dia a dia.
          </div>

          {product.sizes?.length ? (
            <div className="mt-8">
              <div className="text-sm font-semibold text-[#24384d]">
                Escolha o tamanho
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <SelectableSizePill
                    key={size}
                    active={selectedSize === size}
                    onClick={() => {
                      setSelectedSize(size)
                      setMessage('')
                    }}
                  >
                    {size}
                  </SelectableSizePill>
                ))}
              </div>

              {selectedSize ? (
                <p className="mt-4 text-sm font-medium text-[#3b648c]">
                  Tamanho selecionado: {selectedSize}
                </p>
              ) : (
                <p className="mt-4 text-sm text-[#6d7a88]">
                  Selecione o tamanho desejado para continuar.
                </p>
              )}
            </div>
          ) : null}

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d2c3b1] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Categoria
              </div>
              <div className="mt-2 text-sm font-semibold text-[#24384d]">
                {getCategoryName(product.category)}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d2c3b1] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Finalização do pedido
              </div>
              <div className="mt-2 text-sm font-semibold text-[#24384d]">
                Entrega local via WhatsApp ou envio com pagamento combinado
              </div>
            </div>
          </div>

          {message ? (
            <div className="mt-6 rounded-2xl border border-[#d8e2eb] bg-[#f4f9fc] px-4 py-3 text-sm text-[#31506d]">
              {message}
            </div>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className="rounded-full bg-[#24384d] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Adicionar ao carrinho
            </button>

            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[#b8a894] bg-white/70 px-7 py-4 text-center text-sm font-semibold text-[#24384d] shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#aa977f] hover:bg-[#efe3d4] hover:shadow-[0_14px_28px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Falar com a loja
            </a>
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d6c7b5] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
              Sobre esta peça
            </div>
            <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
              Cada peça da Toque de Bençãos busca unir modéstia, bom gosto e presença, valorizando uma estética feminina, familiar e cristã com acabamento acolhedor e elegante.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}