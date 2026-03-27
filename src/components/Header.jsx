import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logoSrc } from '../data/storeData'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()

  const navItems = [
    { to: '/', label: 'Início' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4d7c9] bg-[#f7f3ee]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link to="/" className="flex items-center gap-3 sm:gap-4">
          <img
            src={logoSrc}
            alt="Logo Toque de Bençãos"
            className="h-16 w-16 rounded-full border-2 border-[#d8cbb9] bg-[#efe3d4] object-cover shadow-[0_8px_20px_rgba(36,56,77,0.10)] sm:h-20 sm:w-20"
          />
          <div>
            <div className="font-serif text-3xl italic leading-none text-[#3b648c] sm:text-4xl">
              Toque
            </div>
            <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.32em] text-[#3b648c] sm:text-sm">
              de Bençãos
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-sm font-semibold transition ${
                  isActive
                    ? 'text-[#3b648c]'
                    : 'text-[#24384d] hover:text-[#3b648c]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/catalogo"
            className="rounded-full border border-[#d8cbb9] bg-white/70 px-4 py-2 text-sm font-medium text-[#24384d] transition hover:bg-white"
          >
            Explorar
          </Link>

          <Link
            to="/carrinho"
            className="relative rounded-full bg-[#24384d] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(36,56,77,0.15)] transition hover:opacity-90"
          >
            Carrinho
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#c99d4d] px-1 text-xs font-bold text-white shadow-sm">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-full border border-[#d8cbb9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#24384d] lg:hidden"
        >
          Menu
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#ddd0c1] bg-[#fbf8f4] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="rounded-2xl border border-[#e6dacd] bg-white px-4 py-3 text-sm font-semibold text-[#24384d]"
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/carrinho"
              onClick={() => setMobileOpen(false)}
              className="rounded-2xl bg-[#24384d] px-4 py-3 text-center text-sm font-semibold text-white"
            >
              Carrinho {cartCount > 0 ? `(${cartCount})` : ''}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}