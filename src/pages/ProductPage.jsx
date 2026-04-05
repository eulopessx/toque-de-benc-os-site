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
import ProductReviewsSection from '../components/ProductReviewsSection'

function SelectableSizePill({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 ${
        active
          ? 'border-[#24384d] bg-[#24384d] text-white'
          : 'border-[#ddd0c1] bg-white text-[#526374] hover:border-[#cdbda8] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]'
      }`}
    >
      {children}
    </button>
  )
}

function parseMeasurementsTable(measurementsText = '') {
  return String(measurementsText)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [sizePart, restPart = ''] = line.split('—')
      const size = sizePart?.trim() || ''
      const pieces = restPart
        .split('|')
        .map((item) => item.trim())
        .filter(Boolean)

      const data = {
        size,
        width: '',
        length: '',
        sleeve: '',
        other: [],
      }

      pieces.forEach((piece) => {
        const [labelRaw, valueRaw = ''] = piece.split(':')
        const label = labelRaw?.trim().toLowerCase()
        const value = valueRaw?.trim()

        if (!label || !value) {
          data.other.push(piece)
          return
        }

        if (label.includes('largura')) {
          data.width = value
          return
        }

        if (label.includes('comprimento')) {
          data.length = value
          return
        }

        if (label.includes('manga') || label.includes('mangas')) {
          data.sleeve = value
          return
        }

        data.other.push(piece)
      })

      return data
    })
}

function MeasurementInfoCard({ selectedMeasurement }) {
  if (!selectedMeasurement) return null

  return (
    <div className="mt-6 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-5 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
        Medidas do tamanho {selectedMeasurement.size}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e4d8c9] bg-white px-4 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a835f]">
            Largura
          </div>
          <div className="mt-2 text-sm font-semibold text-[#24384d]">
            {selectedMeasurement.width || '—'}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4d8c9] bg-white px-4 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a835f]">
            Comprimento
          </div>
          <div className="mt-2 text-sm font-semibold text-[#24384d]">
            {selectedMeasurement.length || '—'}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4d8c9] bg-white px-4 py-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9a835f]">
            Manga
          </div>
          <div className="mt-2 text-sm font-semibold text-[#24384d]">
            {selectedMeasurement.sleeve || '—'}
          </div>
        </div>
      </div>

      {selectedMeasurement.other?.length ? (
        <div className="mt-4 rounded-2xl border border-[#e4d8c9] bg-white px-4 py-4 text-sm leading-6 text-[#526374]">
          {selectedMeasurement.other.join(' | ')}
        </div>
      ) : null}
    </div>
  )
}

function ImageZoomModal({ image, productName, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-[#24384d] shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition hover:scale-105"
        aria-label="Fechar imagem"
      >
        ×
      </button>

      <img
        src={image}
        alt={productName}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[90vh] max-w-[95vw] rounded-[1.5rem] object-contain shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
      />
    </div>
  )
}

export default function ProductPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [message, setMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [zoomOpen, setZoomOpen] = useState(false)

  useEffect(() => {
    loadProduct()
  }, [id])

  useEffect(() => {
    setSelectedSize('')
    setMessage('')
    setSelectedImage('')
    setZoomOpen(false)
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
    return (
      selectedImage ||
      product?.image_url ||
      product?.image ||
      '/placeholder-product.jpg'
    )
  }, [product, selectedImage])

  const galleryImages = useMemo(() => {
    const baseImage =
      product?.image_url || product?.image || '/placeholder-product.jpg'

    return [baseImage]
  }, [product])

  const measurementsTable = useMemo(() => {
    return parseMeasurementsTable(product?.measurements || '')
  }, [product?.measurements])

  const selectedMeasurement = useMemo(() => {
    if (!selectedSize) return null
    return measurementsTable.find((item) => item.size === selectedSize) || null
  }, [measurementsTable, selectedSize])

  const hasSleeveColumn = useMemo(() => {
    return measurementsTable.some((item) => item.sleeve)
  }, [measurementsTable])

  const hasOtherInfo = useMemo(() => {
    return measurementsTable.some((item) => item.other.length > 0)
  }, [measurementsTable])

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-12 lg:px-8 lg:py-16">
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
      <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-12 lg:px-8 lg:py-16">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-8 shadow-[0_20px_60px_rgba(36,56,77,0.05)] sm:p-10">
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
            className="mt-8 inline-block rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042]"
          >
            Voltar ao catálogo
          </Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <main className="mx-auto max-w-7xl overflow-x-hidden px-4 py-8 lg:px-8 lg:py-14">
        <div className="mb-6">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3b648c] transition-all duration-200 ease-out hover:translate-x-1 hover:text-[#24384d]"
          >
            <span>←</span>
            <span>Voltar ao catálogo</span>
          </Link>
        </div>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
          <div className="min-w-0">
            <div className="overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="relative block w-full cursor-zoom-in"
                aria-label="Ampliar imagem do produto"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-white sm:aspect-[3/4]">
                  <img
                    src={imageSrc}
                    alt={product.name}
                    className="h-full w-full object-contain bg-white"
                  />

                  {product.badge ? (
                    <div className="absolute left-4 top-4 rounded-full bg-[#24384d] px-4 py-2 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(36,56,77,0.18)]">
                      {product.badge}
                    </div>
                  ) : null}

                  <div className="absolute bottom-4 right-4 rounded-full bg-white/92 px-4 py-2 text-xs font-semibold text-[#24384d] shadow-[0_10px_20px_rgba(36,56,77,0.12)]">
                    Toque para ampliar
                  </div>
                </div>
              </button>
            </div>

            {galleryImages.length > 0 ? (
              <div className="mt-4 overflow-x-auto pb-1">
                <div className="flex min-w-max gap-3">
                  {galleryImages.map((img, index) => {
                    const active = img === imageSrc

                    return (
                      <button
                        key={`${img}-${index}`}
                        type="button"
                        onClick={() => setSelectedImage(img)}
                        className={`overflow-hidden rounded-[1rem] border transition-all duration-200 ${
                          active
                            ? 'border-[#24384d] shadow-[0_10px_20px_rgba(36,56,77,0.12)]'
                            : 'border-[#ddd0c1] hover:border-[#cdbda8]'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Miniatura ${index + 1}`}
                          className="h-20 w-20 object-cover sm:h-24 sm:w-24"
                        />
                      </button>
                    )
                  })}
                </div>
              </div>
            ) : null}
          </div>

          <div className="min-w-0 rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-6 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-8 lg:p-10">
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
              Moda católica com identidade
            </div>

            <h1 className="mt-4 break-words text-3xl font-semibold text-[#24384d] sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-5 break-words text-sm leading-7 text-[#5d6d7d] sm:text-base">
              {product.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
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
              <div className="mt-8 min-w-0">
                <div className="text-sm font-semibold text-[#24384d]">
                  Escolha o tamanho
                </div>

                <div className="mt-4 overflow-x-auto pb-1">
                  <div className="flex min-w-max gap-3">
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

            <MeasurementInfoCard selectedMeasurement={selectedMeasurement} />

            {measurementsTable.length > 0 ? (
              <div className="mt-8 min-w-0 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] sm:p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                  Guia de medidas
                </div>
                <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
                  Consulte as medidas da peça para escolher o tamanho com mais segurança e conforto.
                </p>

                <div className="mt-5 overflow-hidden rounded-[1.25rem] border border-[#e4d8c9]">
                  <div className="w-full overflow-x-auto">
                    <table className="min-w-[560px] border-collapse">
                      <thead>
                        <tr className="bg-[#fbf8f4] text-left">
                          <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a835f]">
                            Tamanho
                          </th>
                          <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a835f]">
                            Largura
                          </th>
                          <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a835f]">
                            Comprimento
                          </th>
                          {hasSleeveColumn ? (
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a835f]">
                              Manga
                            </th>
                          ) : null}
                          {hasOtherInfo ? (
                            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a835f]">
                              Observações
                            </th>
                          ) : null}
                        </tr>
                      </thead>

                      <tbody>
                        {measurementsTable.map((item, index) => (
                          <tr
                            key={`${item.size}-${index}`}
                            className={`border-t border-[#efe5d8] ${
                              selectedSize === item.size ? 'bg-[#f7f3ee]' : 'bg-white'
                            }`}
                          >
                            <td className="px-4 py-4 text-sm font-semibold text-[#24384d]">
                              {item.size || '—'}
                            </td>
                            <td className="px-4 py-4 text-sm text-[#526374]">
                              {item.width || '—'}
                            </td>
                            <td className="px-4 py-4 text-sm text-[#526374]">
                              {item.length || '—'}
                            </td>
                            {hasSleeveColumn ? (
                              <td className="px-4 py-4 text-sm text-[#526374]">
                                {item.sleeve || '—'}
                              </td>
                            ) : null}
                            {hasOtherInfo ? (
                              <td className="px-4 py-4 text-sm text-[#526374]">
                                {item.other.length > 0 ? item.other.join(' | ') : '—'}
                              </td>
                            ) : null}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                  Categoria
                </div>
                <div className="mt-2 text-sm font-semibold text-[#24384d]">
                  {getCategoryName(product.category)}
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
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
                className="rounded-full bg-[#24384d] px-7 py-4 text-center text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042]"
              >
                Adicionar ao carrinho
              </button>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[#b8a894] bg-white/70 px-7 py-4 text-center text-sm font-semibold text-[#24384d] shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#aa977f] hover:bg-[#efe3d4]"
              >
                Falar com a loja
              </a>
            </div>

            <div className="mt-8 rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                Sobre esta peça
              </div>
              <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
                Cada peça da Toque de Bençãos busca unir modéstia, bom gosto e presença, valorizando uma estética feminina, familiar e cristã com acabamento acolhedor e elegante.
              </p>
            </div>
          </div>
        </section>

        <ProductReviewsSection
          productId={product.id}
          productName={product.name}
          availableSizes={product.sizes || []}
        />
      </main>

      {zoomOpen ? (
        <ImageZoomModal
          image={imageSrc}
          productName={product.name}
          onClose={() => setZoomOpen(false)}
        />
      ) : null}
    </>
  )
}