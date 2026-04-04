import { Link } from 'react-router-dom'
import { categories, logoSrc, storeConfig } from '../data/storeData'

export default function Footer() {
  return (
    <footer className="border-t border-[#dfd3c5] bg-[#f3ede6]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-[1.2fr_0.7fr_0.8fr_0.9fr] lg:px-8">
        <div>
          <Link to="/" className="flex items-center gap-4">
            <img
              src={logoSrc}
              alt="Logo Toque de Bençãos"
              className="h-20 w-20 rounded-full border-2 border-[#d8cbb9] bg-[#efe3d4] object-cover shadow-sm"
            />
            <div>
              <div className="font-serif text-3xl italic leading-none text-[#3b648c]">
                Toque
              </div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-[0.28em] text-[#3b648c]">
                de Bençãos
              </div>
            </div>
          </Link>

          <p className="mt-5 max-w-sm leading-7 text-[#5c6c7a]">
            Moda casual cristã com identidade acolhedora, visual elegante e foco
            em oferecer uma experiência de compra agradável no celular e no computador.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#24384d]">
            Institucional
          </h3>

          <ul className="mt-5 space-y-3 text-[#5c6c7a]">
            <li>
              <Link
                to="/sobre"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                Quem somos
              </Link>
            </li>
            <li>
              <Link
                to="/contato"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                Atendimento
              </Link>
            </li>
            <li>
              <Link
                to="/catalogo"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                Catálogo
              </Link>
            </li>
            <li>
              <Link
                to="/acesso"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                Minha conta
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#24384d]">
            Categorias
          </h3>

          <ul className="mt-5 space-y-3 text-[#5c6c7a]">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  to="/catalogo"
                  className="transition-colors duration-200 hover:text-[#24384d]"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[#24384d]">
            Contato
          </h3>

          <ul className="mt-5 space-y-3 text-[#5c6c7a]">
            <li>
              WhatsApp:{' '}
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                {storeConfig.whatsappDisplay}
              </a>
            </li>
            <li>
              E-mail:{' '}
              <a
                href={`mailto:${storeConfig.email}`}
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                {storeConfig.email}
              </a>
            </li>
            <li>
              Instagram:{' '}
              <a
                href={storeConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors duration-200 hover:text-[#24384d]"
              >
                {storeConfig.instagram}
              </a>
            </li>
            <li>Atendimento de segunda a sábado</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#dfd3c5] px-4 py-5 text-center text-sm text-[#6d7a88]">
        © 2026 Toque de Bençãos. Todos os direitos reservados.
      </div>
    </footer>
  )
}