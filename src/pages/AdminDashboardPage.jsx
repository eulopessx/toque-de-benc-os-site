import { useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { formatPrice } from '../data/storeData'

const ADMIN_PRODUCT_DRAFT_KEY = 'toque-admin-product-draft'
const STORAGE_BUCKET = 'product-images'

const emptyForm = {
  title: '',
  category: '',
  price: '',
  compare_price: '',
  badge: '',
  image_url: '',
  description: '',
  sizes: '',
  stock: '',
  featured: false,
  active: true,
}

function FieldLabel({ children }) {
  return (
    <label className="mb-2 block text-sm font-semibold text-[#24384d]">
      {children}
    </label>
  )
}

function StatusBadge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-white border border-[#ddd0c1] text-[#526374]',
    highlight: 'bg-[#24384d] text-white',
    muted: 'bg-[#efe3d4] text-[#24384d]',
    success: 'bg-[#edf6ef] text-[#2d6a3f] border border-[#cfe3d3]',
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[variant]}`}>
      {children}
    </span>
  )
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(() => {
    try {
      const savedDraft = localStorage.getItem(ADMIN_PRODUCT_DRAFT_KEY)
      return savedDraft ? JSON.parse(savedDraft) : emptyForm
    } catch {
      return emptyForm
    }
  })
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem(ADMIN_PRODUCT_DRAFT_KEY, JSON.stringify(form))
  }, [form])

  async function loadProducts() {
    setLoading(true)
    setMessage('')

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setMessage('Não foi possível carregar os produtos.')
      setLoading(false)
      return
    }

    setProducts(data || [])
    setLoading(false)
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0] || null
    setSelectedImageFile(file)
  }

  async function uploadImageAndGetUrl(file) {
    if (!file) return form.image_url.trim()

    setUploadingImage(true)

    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`
    const filePath = `products/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      })

    if (uploadError) {
      setUploadingImage(false)
      throw uploadError
    }

    const { data } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(filePath)

    setUploadingImage(false)
    return data.publicUrl
  }

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) return products

    return products.filter((product) => {
      return (
        (product.title || '').toLowerCase().includes(term) ||
        (product.category || '').toLowerCase().includes(term) ||
        (product.description || '').toLowerCase().includes(term)
      )
    })
  }, [products, search])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const cleanTitle = form.title.trim()
      const finalImageUrl = await uploadImageAndGetUrl(selectedImageFile)

      const payload = {
        title: cleanTitle,
        slug: cleanTitle
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-'),
        name: cleanTitle,
        category: form.category.trim(),
        price: Number(form.price) || 0,
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        old_price: form.compare_price ? Number(form.compare_price) : null,
        image_url: finalImageUrl,
        image: finalImageUrl,
        description: form.description.trim(),
        stock: Number(form.stock) || 0,
        featured: form.featured,
        active: form.active,
        badge: form.badge.trim() || null,
        sizes: form.sizes
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean),
      }

      if (!payload.title || !payload.category || !payload.image_url || !payload.description) {
        setMessage('Preencha nome, categoria, descrição e imagem do produto.')
        setSaving(false)
        return
      }

      if (editingId) {
        const { error } = await supabase
          .from('products')
          .update(payload)
          .eq('id', editingId)

        if (error) {
          setMessage(error.message)
          setSaving(false)
          return
        }

        setMessage('Produto atualizado com sucesso.')
      } else {
        const { error } = await supabase
          .from('products')
          .insert(payload)

        if (error) {
          setMessage(error.message)
          setSaving(false)
          return
        }

        setMessage('Produto criado com sucesso.')
      }

      setForm(emptyForm)
      setEditingId(null)
      setSelectedImageFile(null)
      localStorage.removeItem(ADMIN_PRODUCT_DRAFT_KEY)
      setSaving(false)
      loadProducts()
    } catch (error) {
      setMessage(error.message || 'Não foi possível salvar o produto.')
      setSaving(false)
      setUploadingImage(false)
    }
  }

  function startEdit(product) {
    setEditingId(product.id)
    setSelectedImageFile(null)
    setForm({
      title: product.title || product.name || '',
      category: product.category || '',
      price: product.price || '',
      compare_price: product.compare_price || product.old_price || '',
      badge: product.badge || '',
      image_url: product.image_url || product.image || '',
      description: product.description || '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      stock: product.stock || '',
      featured: !!product.featured,
      active: product.active ?? true,
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    setMessage('')

    const confirmed = window.confirm('Tem certeza que deseja remover este produto?')
    if (!confirmed) return

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Produto removido com sucesso.')
    loadProducts()
  }

  function handleCancelEdit() {
    setEditingId(null)
    setForm(emptyForm)
    setSelectedImageFile(null)
    setMessage('')
    localStorage.removeItem(ADMIN_PRODUCT_DRAFT_KEY)
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          Painel administrativo
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
          Gerencie os produtos da loja
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
          Cadastre, edite e organize os produtos reais da Toque de Bençãos.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-[#24384d]">
                {editingId ? 'Editar produto' : 'Novo produto'}
              </h2>
              <p className="mt-2 text-sm text-[#5d6d7d]">
                Agora você pode enviar imagem direto pelo painel.
              </p>
            </div>

            {editingId ? <StatusBadge variant="highlight">Editando</StatusBadge> : null}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <FieldLabel>Nome do produto</FieldLabel>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Ex.: Baby Look Fé e Graça"
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel>Categoria</FieldLabel>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  placeholder="Ex.: baby-look-feminina"
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
                />
              </div>

              <div>
                <FieldLabel>Selo / badge</FieldLabel>
                <input
                  name="badge"
                  value={form.badge}
                  onChange={handleChange}
                  placeholder="Ex.: Novo"
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <FieldLabel>Preço</FieldLabel>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="129.90"
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
                />
              </div>

              <div>
                <FieldLabel>Preço antigo</FieldLabel>
                <input
                  name="compare_price"
                  value={form.compare_price}
                  onChange={handleChange}
                  placeholder="159.90"
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
                />
              </div>

              <div>
                <FieldLabel>Estoque</FieldLabel>
                <input
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
                />
              </div>
            </div>

            <div>
              <FieldLabel>Enviar imagem do produto</FieldLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-sm text-[#24384d] outline-none"
              />
              {selectedImageFile ? (
                <p className="mt-2 text-sm text-[#5d6d7d]">
                  Arquivo selecionado: {selectedImageFile.name}
                </p>
              ) : null}
            </div>

            <div>
              <FieldLabel>Ou use uma URL manual</FieldLabel>
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              />
            </div>

            {form.image_url ? (
              <div className="overflow-hidden rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-3">
                <div className="mb-3 text-sm font-semibold text-[#24384d]">
                  Pré-visualização da imagem
                </div>
                <img
                  src={form.image_url}
                  alt="Pré-visualização"
                  className="h-64 w-full rounded-[1rem] object-cover"
                />
              </div>
            ) : null}

            <div>
              <FieldLabel>Descrição</FieldLabel>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descreva o produto"
                className="min-h-[120px] w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              />
            </div>

            <div>
              <FieldLabel>Tamanhos</FieldLabel>
              <input
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="P, M, G, GG"
                className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-4 text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-[#ddd0c1] bg-[#fbf8f4] px-4 py-4 text-sm font-semibold text-[#24384d] shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                />
                Produto em destaque
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-[#ddd0c1] bg-[#fbf8f4] px-4 py-4 text-sm font-semibold text-[#24384d] shadow-[0_8px_18px_rgba(36,56,77,0.03)]">
                <input
                  type="checkbox"
                  name="active"
                  checked={form.active}
                  onChange={handleChange}
                />
                Produto ativo
              </label>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="flex-1 rounded-2xl bg-[#24384d] px-5 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,56,77,0.14)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.24)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {uploadingImage
                  ? 'Enviando imagem...'
                  : saving
                  ? 'Salvando...'
                  : editingId
                  ? 'Salvar alterações'
                  : 'Cadastrar produto'}
              </button>

              {editingId ? (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 rounded-2xl border border-[#d8cbb9] bg-white px-5 py-4 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]"
                >
                  Cancelar edição
                </button>
              ) : null}
            </div>
          </form>

          {message ? (
            <p className="mt-4 rounded-2xl border border-[#e4d8c9] bg-[#fcfaf7] px-4 py-3 text-sm text-[#5d6d7d]">
              {message}
            </p>
          ) : null}
        </section>

        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#24384d]">
                Produtos cadastrados
              </h2>
              <p className="mt-2 text-sm text-[#5d6d7d]">
                Visualize e administre os produtos da loja.
              </p>
            </div>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar produto"
              className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-4 py-3 text-sm text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)] sm:max-w-[240px]"
            />
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-[#5d6d7d]">Carregando produtos...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="mt-6 text-sm text-[#5d6d7d]">
              Nenhum produto encontrado.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4 shadow-[0_8px_18px_rgba(36,56,77,0.03)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#d5c6b4] hover:shadow-[0_14px_28px_rgba(36,56,77,0.07)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <img
                        src={product.image_url || product.image || 'https://placehold.co/240x240?text=Produto'}
                        alt={product.title || product.name}
                        className="h-24 w-24 rounded-[1rem] object-cover"
                      />

                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-[#24384d]">
                          {product.title || product.name}
                        </h3>

                        <p className="mt-1 text-sm text-[#5d6d7d]">
                          {formatPrice(product.price)}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {product.category ? (
                            <StatusBadge>{product.category}</StatusBadge>
                          ) : null}

                          {product.featured ? (
                            <StatusBadge variant="highlight">Destaque</StatusBadge>
                          ) : null}

                          {product.active ? (
                            <StatusBadge variant="success">Ativo</StatusBadge>
                          ) : (
                            <StatusBadge variant="muted">Inativo</StatusBadge>
                          )}

                          <StatusBadge>Estoque: {product.stock ?? 0}</StatusBadge>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="rounded-full border border-[#d8cbb9] bg-white px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#fcfaf7] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]"
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-full bg-[#efe3d4] px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e5d4c0] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}