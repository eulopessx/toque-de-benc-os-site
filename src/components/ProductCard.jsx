import { Link } from 'react-router-dom'
import { formatPrice, getCategoryName } from '../data/storeData'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-[#e4d8cb] bg-[#fdfbf8] shadow-[0_14px_45px_rgba(36,56,77,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(36,56,77,0.08)]">
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative h-80 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full bg-[#24384d] px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
          {getCategoryName(product.category)}
        </div>

        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="mt-3 text-xl font-semibold text-[#24384d] transition hover:text-[#3b648c]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-[#24384d]">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-[#8f96a0] line-through">
            {formatPrice(product.oldPrice)}
          </span>
        </div>

        <div className="mt-2 text-sm text-[#6d7a88]">
          ou em até 6x sem complicação
        </div>

        {product.sizes ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-[#ddd0c1] bg-white px-3 py-1 text-xs font-semibold text-[#526374]"
              >
                {size}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Link
            to={`/produto/${product.id}`}
            className="flex-1 rounded-full border border-[#d8cbb9] px-5 py-3 text-center text-sm font-semibold text-[#24384d] transition hover:bg-white"
          >
            Ver produto
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="flex-1 rounded-full bg-[#efe3d4] px-5 py-3 text-center text-sm font-semibold text-[#24384d] transition hover:bg-[#e5d4c0]"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}