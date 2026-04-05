import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { logoSrc } from '../data/storeData'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 4h1.3c.5 0 .94.33 1.08.81L6 7m0 0h11.76c.76 0 1.31.75 1.08 1.47l-1.34 4.5c-.16.54-.65.91-1.22.91H8.05c-.57 0-1.06-.37-1.22-.91L6 7Zm2 11.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm8 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { cartCount } = useCart()
  const { user, isAdmin, signOut, loading } = useAuth()

  const navItems = [
    { to: '/', label: 'Início' },
    { to: '/catalogo', label: 'Catálogo' },
    { to: '/sobre', label: 'Sobre' },
    { to: '/contato', label: 'Contato' },
  ]

  async function handleSignOut() {
    try {
      await signOut()
      setMobileOpen(false)
    } catch (error) {
      console.error('Erro ao sair:', error)
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#e4d7c9] bg-[#f7f3ee]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          to="/"
          className="group flex min-w-0 items-center gap-3 transition-all duration-300 hover:opacity-95 sm:gap-4"
        >
          <img
            src={logoSrc}
            alt="Logo Toque de Bençãos"
            className="h-16 w-16 rounded-full border-2 border-[#d8cbb9] bg-[#efe3d4] object-cover shadow-[0_8px_20px_rgba(36,56,77,0.10)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_28px_rgba(36,56,77,0.16)] group-active:scale-[0.97] sm:h-20 sm:w-20"
          />
          <div className="min-w-0 transition-transform duration-300 group-hover:translate-x-0.5">
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
                `group relative text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-[#3b648c]'
                    : 'text-[#24384d] hover:text-[#3b648c]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="transition-all duration-200 group-hover:-translate-y-[1px]">
                    {item.label}
                  </span>
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-[#3b648c] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {loading ? (
            <div className="rounded-full border border-[#ddd0c1] bg-white/70 px-4 py-2 text-sm font-medium text-[#7a8490]">
              Carregando...
            </div>
          ) : (
            <>
              {user && isAdmin ? (
                <Link
                  to="/admin"
                  className="rounded-full border border-[#c99d4d] bg-[#fff8ef] px-4 py-2 text-sm font-medium text-[#9a6b1f] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#fff2df] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c99d4d]/30 focus-visible:ring-offset-2 active:scale-[0.97]"
                >
                  Admin
                </Link>
              ) : null}

              {user ? (
                <>
                  <Link
                    to="/acesso"
                    className="rounded-full border border-[#d8cbb9] bg-white/70 px-4 py-2 text-sm font-medium text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
                  >
                    Minha conta
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-full border border-[#e4cfc7] bg-[#fff7f5] px-4 py-2 text-sm font-medium text-[#8c4b3b] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#fff0eb] hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8c4b3b]/20 focus-visible:ring-offset-2 active:scale-[0.97]"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/acesso"
                  className="rounded-full border border-[#d8cbb9] bg-white/70 px-4 py-2 text-sm font-medium text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
                >
                  Entrar
                </Link>
              )}
            </>
          )}

          <Link
            to="/catalogo"
            className="rounded-full border border-[#d8cbb9] bg-white/70 px-4 py-2 text-sm font-medium text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Explorar
          </Link>

          <Link
            to="/carrinho"
            className="relative rounded-full bg-[#24384d] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(36,56,77,0.15)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1e3143] hover:shadow-[0_16px_30px_rgba(36,56,77,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Carrinho
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#c99d4d] px-1 text-xs font-bold text-white shadow-[0_8px_18px_rgba(201,157,77,0.25)]">
                {cartCount}
              </span>
            ) : null}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/carrinho"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#d8cbb9] bg-white/85 text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
            aria-label="Abrir carrinho"
          >
            <CartIcon />
            {cartCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#c99d4d] px-1 text-[10px] font-bold text-white shadow-[0_8px_18px_rgba(201,157,77,0.25)]">
                {cartCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="rounded-full border border-[#d8cbb9] bg-white/80 px-4 py-2 text-sm font-semibold text-[#24384d] shadow-[0_6px_14px_rgba(36,56,77,0.03)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#cab8a0] hover:bg-white hover:shadow-[0_12px_24px_rgba(36,56,77,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24384d]/25 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            Menu
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-[#ddd0c1] bg-[#fbf8f4] px-4 transition-all duration-300 ease-out lg:hidden ${
          mobileOpen ? 'max-h-[700px] py-4 opacity-100' : 'max-h-0 py-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-3">
          {loading ? (
            <div className="rounded-2xl border border-[#e6dacd] bg-white px-4 py-3 text-sm font-semibold text-[#7a8490]">
              Carregando...
            </div>
          ) : (
            <>
              {user && isAdmin ? (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-[#ead4ad] bg-[#fff8ef] px-4 py-3 text-sm font-semibold text-[#9a6b1f] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(36,56,77,0.06)]"
                >
                  Painel admin
                </Link>
              ) : null}

              {user ? (
                <>
                  <Link
                    to="/acesso"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl border border-[#e6dacd] bg-white px-4 py-3 text-sm font-semibold text-[#24384d] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d4c2ab] hover:shadow-[0_10px_22px_rgba(36,56,77,0.06)]"
                  >
                    Minha conta
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="rounded-2xl border border-[#ead4cd] bg-[#fff7f5] px-4 py-3 text-sm font-semibold text-[#8c4b3b] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(36,56,77,0.06)]"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/acesso"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-2xl border border-[#e6dacd] bg-white px-4 py-3 text-sm font-semibold text-[#24384d] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-[#d4c2ab] hover:shadow-[0_10px_22px_rgba(36,56,77,0.06)]"
                >
                  Entrar
                </Link>
              )}
            </>
          )}

          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `rounded-2xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out ${
                  isActive
                    ? 'border-[#cbb9a3] bg-[#24384d] text-white shadow-[0_12px_24px_rgba(36,56,77,0.16)]'
                    : 'border-[#e6dacd] bg-white text-[#24384d] hover:-translate-y-0.5 hover:border-[#d4c2ab] hover:shadow-[0_10px_22px_rgba(36,56,77,0.06)]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/catalogo"
            onClick={() => setMobileOpen(false)}
            className="rounded-2xl bg-[#24384d] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_12px_24px_rgba(36,56,77,0.16)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#1e3143] hover:shadow-[0_18px_32px_rgba(36,56,77,0.22)]"
          >
            Explorar catálogo
          </Link>
        </div>
      </div>
    </header>
  )
}