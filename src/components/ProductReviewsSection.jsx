import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'

function Stars({ value, small = false }) {
  return (
    <div className={`flex items-center gap-1 ${small ? 'text-sm' : 'text-base'}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className={index < value ? 'text-[#c99d4d]' : 'text-[#d7dbe0]'}>
          ★
        </span>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <article className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5 shadow-[0_10px_26px_rgba(36,56,77,0.04)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-[#24384d]">{review.user_name}</div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <Stars value={review.rating} small />
            {review.size ? (
              <span className="rounded-full border border-[#e4d8c9] bg-[#fbf8f4] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b6b57]">
                Tamanho {review.size}
              </span>
            ) : null}
            {review.verified_purchase ? (
              <span className="rounded-full border border-[#d7e7da] bg-[#edf6ef] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2d6a3f]">
                Compra verificada
              </span>
            ) : null}
          </div>
        </div>

        <div className="text-xs font-medium text-[#8a93a0]">
          {new Date(review.created_at).toLocaleDateString('pt-BR')}
        </div>
      </div>

      <p className="mt-4 text-sm leading-7 text-[#526374]">{review.comment}</p>
    </article>
  )
}

export default function ProductReviewsSection({ productId, productName, availableSizes = [] }) {
  const { user } = useAuth()

  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)

  const [form, setForm] = useState({
    rating: 5,
    comment: '',
    size: '',
  })

  useEffect(() => {
    loadReviews()
  }, [productId])

  async function loadReviews() {
    setLoading(true)

    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', productId)
      .eq('approved', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar avaliações:', error.message)
      setReviews([])
      setLoading(false)
      return
    }

    setReviews(data || [])
    setLoading(false)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!user) {
      setMessage('Faça login para enviar sua avaliação.')
      return
    }

    if (!form.comment.trim()) {
      setMessage('Escreva sua avaliação antes de enviar.')
      return
    }

    setSubmitting(true)
    setMessage('')

    const payload = {
      product_id: productId,
      user_id: user.id,
      user_name:
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split('@')[0] ||
        'Cliente',
      user_email: user.email || null,
      rating: Number(form.rating),
      comment: form.comment.trim(),
      size: form.size || null,
      verified_purchase: false,
      approved: false,
    }

    const { error } = await supabase.from('product_reviews').insert(payload)

    if (error) {
      setMessage(error.message || 'Não foi possível enviar sua avaliação.')
      setSubmitting(false)
      return
    }

    setForm({
      rating: 5,
      comment: '',
      size: '',
    })
    setSubmitting(false)
    setShowForm(false)
    setMessage('Sua avaliação foi enviada e ficará visível após aprovação da loja.')
  }

  const averageRating = useMemo(() => {
    if (!reviews.length) return 0
    const total = reviews.reduce((sum, item) => sum + Number(item.rating || 0), 0)
    return total / reviews.length
  }, [reviews])

  const featuredReviews = useMemo(() => reviews.slice(0, 4), [reviews])

  return (
    <section className="mt-10 rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-6 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Avaliações de clientes
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-[#24384d] sm:text-3xl">
            O que dizem sobre esta peça
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
            Comentários reais ajudam outros clientes a escolher com mais segurança, leveza e confiança.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-[#e4d8c9] bg-[#fbf8f4] p-5 lg:min-w-[220px]">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a835f]">
            Nota média
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="text-3xl font-bold text-[#24384d]">
              {averageRating > 0 ? averageRating.toFixed(1) : '—'}
            </div>
            <Stars value={Math.round(averageRating)} />
          </div>
          <div className="mt-2 text-sm text-[#6d7a88]">
            {reviews.length === 0
              ? 'Ainda não há avaliações aprovadas.'
              : `${reviews.length} ${reviews.length === 1 ? 'avaliação aprovada' : 'avaliações aprovadas'}`}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,56,77,0.14)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042]"
        >
          {showForm ? 'Fechar avaliação' : 'Escrever avaliação'}
        </button>

        {!user ? (
          <div className="rounded-full border border-[#ddd0c1] bg-white px-5 py-3 text-sm font-medium text-[#526374]">
            Faça login para avaliar
          </div>
        ) : null}
      </div>

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-5"
        >
          <div className="grid gap-4 md:grid-cols-[180px_1fr]">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#24384d]">
                Sua nota
              </label>
              <select
                name="rating"
                value={form.rating}
                onChange={handleChange}
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-3 text-sm text-[#24384d] outline-none transition-all duration-200 hover:border-[#ccbda9] focus:border-[#24384d]"
              >
                <option value="5">5 estrelas</option>
                <option value="4">4 estrelas</option>
                <option value="3">3 estrelas</option>
                <option value="2">2 estrelas</option>
                <option value="1">1 estrela</option>
              </select>
            </div>

            {availableSizes.length > 0 ? (
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#24384d]">
                  Tamanho comprado
                </label>
                <select
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-3 text-sm text-[#24384d] outline-none transition-all duration-200 hover:border-[#ccbda9] focus:border-[#24384d]"
                >
                  <option value="">Selecione um tamanho</option>
                  {availableSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-[#24384d]">
              Sua experiência com {productName}
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              placeholder="Conte como foi sua experiência com a peça, o caimento, conforto, acabamento e impressão geral."
              className="min-h-[140px] w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d]"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,56,77,0.14)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Enviando...' : 'Enviar avaliação'}
            </button>

            <div className="text-sm text-[#6d7a88]">
              Sua avaliação será publicada após aprovação da loja.
            </div>
          </div>
        </form>
      ) : null}

      {message ? (
        <div className="mt-5 rounded-2xl border border-[#e4d8c9] bg-[#fcfaf7] px-4 py-3 text-sm text-[#5d6d7d]">
          {message}
        </div>
      ) : null}

      <div className="mt-8">
        {loading ? (
          <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-6 text-sm text-[#5d6d7d]">
            Carregando avaliações...
          </div>
        ) : featuredReviews.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-6 text-sm leading-7 text-[#5d6d7d]">
            Ainda não há avaliações aprovadas para este produto. Seja a primeira pessoa a compartilhar sua experiência.
          </div>
        )}
      </div>
    </section>
  )
}