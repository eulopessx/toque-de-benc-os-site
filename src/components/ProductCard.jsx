import { Link } from 'react-router-dom'
import { formatPrice, getCategoryName } from '../data/storeData'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const imageSrc =
    product?.image ||
    product?.image_url ||
    '/placeholder-product.jpg'

  return (
    <article className="group overflow-hidden rounded-[1.8rem] border border-[#e4d8cb] bg-[#fdfbf8] shadow-[0_14px_45px_rgba(36,56,77,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#d8cab8] hover:shadow-[0_24px_60px_rgba(36,56,77,0.10)]">
      <Link to={`/produto/${product.id}`} className="block">
        <div className="relative h-80 overflow-hidden">
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#24384d]/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {product.badge ? (
            <div className="absolute left-4 top-4 rounded-full bg-[#24384d] px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(36,56,77,0.18)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#1f3347]">
              {product.badge}
            </div>
          ) : null}
        </div>
      </Link>

      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f] transition-colors duration-300 group-hover:text-[#876f49]">
          {getCategoryName(product.category)}
        </div>

        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="mt-3 text-xl font-semibold text-[#24384d] transition-all duration-200 hover:text-[#3b648c] group-hover:translate-x-0.5">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-center gap-3">
          <span className="text-lg font-bold text-[#24384d]">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice > 0 ? (
            <span className="text-sm text-[#8f96a0] line-through">
              {formatPrice(product.oldPrice)}
            </span>
          ) : null}
        </div>

        <div className="mt-2 text-sm text-[#6d7a88]">
          ou em até 6x sem complicação
        </div>

        {product.sizes?.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded-full border border-[#ddd0c1] bg-white px-3 py-1 text-xs font-semibold text-[#526374] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cdbda8] hover:bg-[#fcfaf7]"
              >
                {size}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-5 flex gap-3">
          <Link
            to={`/produto/${product.id}`}
            className="flex-1 rounded-full border border-[#d8cbb9] bg-white/90 px-5 py-3 text-center text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Ver produto
          </Link>

          <button
            onClick={() => addToCart(product)}
            className="flex-1 rounded-full bg-[#efe3d4] px-5 py-3 text-center text-sm font-semibold text-[#24384d] shadow-[0_8px_16px_rgba(36,56,77,0.04)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#e5d4c0] hover:shadow-[0_14px_26px_rgba(36,56,77,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Adicionar
          </button>
        </div>
      </div>
    </article>
  )
}