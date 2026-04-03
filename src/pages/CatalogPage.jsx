import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import { supabase } from '../lib/supabaseClient'
import {
  categories,
  normalizeProductFromDatabase,
} from '../data/storeData'

function FilterButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition-all duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97] ${
        active
          ? 'bg-[#24384d] text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_16px_32px_rgba(36,56,77,0.28)]'
          : 'border border-[#d8cbb9] bg-white text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] hover:-translate-y-0.5 hover:border-[#cbb9a3] hover:bg-[#efe3d4] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)]'
      }`}
    >
      {children}
    </button>
  )
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    setLoading(true)

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar produtos:', error.message)
      setProducts([])
      setLoading(false)
      return
    }

    setProducts((data || []).map(normalizeProductFromDatabase))
    setLoading(false)
  }

  const filteredProducts = useMemo(() => {
    let result = products

    if (activeCategory !== 'todos') {
      result = result.filter((product) => product.category === activeCategory)
    }

    if (search.trim()) {
      const term = search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term)
      )
    }

    return result
  }, [activeCategory, search, products])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <section className="rounded-[2rem] border border-[#ddd0c1] bg-white/70 p-6 shadow-[0_20px_60px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(36,56,77,0.09)] sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Catálogo da loja"
          title="Produtos organizados por categoria para facilitar a compra"
          text="Agora esta página pode exibir os produtos reais cadastrados no painel admin."
        />

        <div className="mt-8">
          <input
            type="text"
            placeholder="Buscar produto pelo nome ou descrição"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-5 py-4 text-sm text-[#24384d] outline-none transition-all duration-200 placeholder:text-[#8f97a1] hover:border-[#ccbda9] focus:border-[#24384d] focus:bg-[#fffdfa] focus:shadow-[0_0_0_4px_rgba(36,56,77,0.08)]"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <FilterButton
            active={activeCategory === 'todos'}
            onClick={() => setActiveCategory('todos')}
          >
            Todos
          </FilterButton>

          {categories.map((category) => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
              Resultados
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[#24384d] sm:text-3xl">
              {activeCategory === 'todos'
                ? 'Todos os produtos'
                : categories.find((category) => category.id === activeCategory)?.name}
            </h2>
          </div>

          <div className="rounded-full border border-[#e5d9cc] bg-white px-4 py-2 text-sm text-[#5d6d7d] shadow-[0_6px_14px_rgba(36,56,77,0.03)]">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </div>
        </div>

        {loading ? (
          <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-10 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
            <h3 className="text-2xl font-semibold text-[#24384d]">
              Carregando produtos...
            </h3>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-10 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_22px_50px_rgba(36,56,77,0.08)]">
            <h3 className="text-2xl font-semibold text-[#24384d]">
              Nenhum produto encontrado
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5d6d7d] sm:text-base">
              Tente buscar por outro termo ou volte para visualizar todas as opções disponíveis.
            </p>

            <button
              type="button"
              onClick={() => {
                setActiveCategory('todos')
                setSearch('')
              }}
              className="mt-6 rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(36,56,77,0.20)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1d3042] hover:shadow-[0_18px_34px_rgba(36,56,77,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  )
}