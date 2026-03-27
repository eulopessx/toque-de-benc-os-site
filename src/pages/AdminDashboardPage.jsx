import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { formatPrice } from '../data/storeData'

const emptyForm = {
  name: '',
  category: '',
  price: '',
  old_price: '',
  badge: '',
  image: '',
  description: '',
  sizes: '',
}

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) setProducts(data || [])
  }

  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage('')

    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      old_price: Number(form.old_price),
      badge: form.badge,
      image: form.image,
      description: form.description,
      sizes: form.sizes.split(',').map((item) => item.trim()).filter(Boolean),
    }

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(payload)
        .eq('id', editingId)

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage('Produto atualizado com sucesso.')
    } else {
      const { error } = await supabase.from('products').insert(payload)

      if (error) {
        setMessage(error.message)
        return
      }

      setMessage('Produto criado com sucesso.')
    }

    setForm(emptyForm)
    setEditingId(null)
    loadProducts()
  }

  function startEdit(product) {
    setEditingId(product.id)
    setForm({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      old_price: product.old_price || '',
      badge: product.badge || '',
      image: product.image || '',
      description: product.description || '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
    })
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Produto removido com sucesso.')
    loadProducts()
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
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <h2 className="text-2xl font-semibold text-[#24384d]">
            {editingId ? 'Editar produto' : 'Novo produto'}
          </h2>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Nome" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Categoria" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="price" value={form.price} onChange={handleChange} placeholder="Preço" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="old_price" value={form.old_price} onChange={handleChange} placeholder="Preço antigo" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="badge" value={form.badge} onChange={handleChange} placeholder="Selo" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="URL da imagem" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descrição" className="min-h-[120px] w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />
            <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="Tamanhos separados por vírgula" className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none" />

            <button className="w-full rounded-2xl bg-[#24384d] px-5 py-4 text-sm font-semibold text-white">
              {editingId ? 'Salvar alterações' : 'Cadastrar produto'}
            </button>
          </form>

          {message ? <p className="mt-4 text-sm text-[#5d6d7d]">{message}</p> : null}
        </section>

        <section className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <h2 className="text-2xl font-semibold text-[#24384d]">Produtos cadastrados</h2>

          <div className="mt-6 space-y-4">
            {products.map((product) => (
              <div key={product.id} className="rounded-[1.5rem] border border-[#ddd0c1] bg-[#fbf8f4] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#24384d]">{product.name}</h3>
                    <p className="mt-1 text-sm text-[#5d6d7d]">
                      {formatPrice(product.price)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(product)}
                      className="rounded-full border border-[#d8cbb9] px-4 py-2 text-sm font-semibold text-[#24384d]"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="rounded-full bg-[#efe3d4] px-4 py-2 text-sm font-semibold text-[#24384d]"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}