import { useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import { categories, products } from '../data/storeData'

function FilterButton({ children, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-5 py-3 text-sm font-semibold transition ${
        active
          ? 'bg-[#24384d] text-white'
          : 'border border-[#d8cbb9] bg-white text-[#24384d] hover:bg-[#efe3d4]'
      }`}
    >
      {children}
    </button>
  )
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('todos')
  const [search, setSearch] = useState('')

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
  }, [activeCategory, search])

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <section className="rounded-[2rem] border border-[#ddd0c1] bg-white/70 p-6 shadow-[0_20px_60px_rgba(36,56,77,0.05)] sm:p-8 lg:p-10">
        <SectionHeader
          eyebrow="Catálogo da loja"
          title="Produtos organizados por categoria para facilitar a compra"
          text="Esta página já está estruturada para servir como base do catálogo real do seu e-commerce. O cliente pode navegar pelas categorias certas, visualizar melhor os produtos e encontrar o que deseja com mais rapidez."
        />

        <div className="mt-8">
          <input
            type="text"
            placeholder="Buscar produto pelo nome ou descrição"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-[#ddd0c1] bg-white px-5 py-4 text-sm text-[#24384d] outline-none transition focus:border-[#c9b8a3]"
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

          <div className="text-sm text-[#5d6d7d]">
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-10 text-center shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
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
              className="mt-6 rounded-full bg-[#24384d] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </section>
    </main>
  )
}