import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import { categories, products, testimonials } from '../data/storeData'

function Metric({ label, text }) {
  return (
    <div>
      <div className="text-xl font-semibold text-[#24384d] sm:text-2xl">
        {label}
      </div>
      <div className="mt-1 text-sm text-[#6d7a88]">{text}</div>
    </div>
  )
}

function BrandChip({ text }) {
  return (
    <div className="rounded-[1.5rem] border border-white/15 bg-white/10 px-5 py-4 text-sm font-semibold backdrop-blur-sm">
      {text}
    </div>
  )
}

function FeaturePill({ text }) {
  return (
    <div className="rounded-full border border-[#ddd0c1] bg-white px-5 py-3 text-sm font-semibold text-[#24384d]">
      {text}
    </div>
  )
}

const benefits = [
  {
    title: 'Envio para todo Brasil',
    text: 'Entrega com atualização clara do pedido e uma experiência pensada para transmitir segurança do começo ao fim.',
  },
  {
    title: 'Pagamento seguro',
    text: 'Pix, cartão e outras formas de pagamento com checkout simples, claro e confortável em qualquer tela.',
  },
  {
    title: 'Atendimento humanizado',
    text: 'Suporte próximo via WhatsApp para dúvidas, tamanhos, pedidos e acompanhamento personalizado.',
  },
]

const faqs = [
  {
    question: 'Quais produtos a loja vende?',
    answer:
      'A Toque de Bençãos trabalha com Baby Look Feminina, Camiseta Masculina, Baby Look Infantil, Camiseta Infantil e Body para Bebês.',
  },
  {
    question: 'O site funciona bem no celular?',
    answer:
      'Sim. O layout foi pensado para ser responsivo, elegante e fácil de usar tanto no celular quanto no computador.',
  },
  {
    question: 'Quais formas de pagamento estarão disponíveis?',
    answer:
      'A estrutura já está preparada para exibir Pix, cartão e outros meios de pagamento de forma clara e segura.',
  },
  {
    question: 'Posso falar com a loja pelo WhatsApp?',
    answer:
      'Sim. O projeto inclui destaque para atendimento rápido e humanizado via WhatsApp.',
  },
]

export default function HomePage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white/80 p-6 shadow-[0_20px_60px_rgba(36,56,77,0.08)] sm:p-10 lg:p-12">
            <div className="mb-8 flex items-center gap-4 rounded-[1.5rem] border border-[#e7dccf] bg-[#fbf8f4] p-4 shadow-sm sm:max-w-max sm:gap-5 sm:p-5">
              <img
                src="/logo-toque-de-bencaos.png"
                alt="Logo Toque de Bençãos"
                className="h-24 w-24 rounded-full border-2 border-[#d8cbb9] bg-[#efe3d4] object-cover shadow-sm sm:h-28 sm:w-28"
              />
              <div>
                <div className="font-serif text-4xl italic leading-none text-[#3b648c] sm:text-5xl">
                  Toque
                </div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-[0.28em] text-[#3b648c] sm:text-base">
                  de Bençãos
                </div>
              </div>
            </div>

            <div className="inline-flex rounded-full bg-[#d9cdbd] px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#24384d] sm:text-xs">
              Moda cristã casual para toda a família
            </div>

            <h1 className="mt-6 max-w-3xl font-serif text-4xl leading-[0.95] text-[#24384d] sm:text-5xl lg:text-7xl">
  Moda com delicadeza, identidade e uma apresentação à altura da sua marca.
</h1>

<p className="mt-6 max-w-2xl text-sm leading-7 text-[#526374] sm:text-base lg:text-lg">
  A Toque de Bençãos foi pensada para oferecer uma experiência visual
  mais sofisticada, acolhedora e profissional, destacando baby looks,
  camisetas e peças infantis com muito mais beleza, clareza e presença.
</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/catalogo"
                className="rounded-full bg-[#24384d] px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#24384d]/15 transition hover:-translate-y-0.5"
              >
                Ver catálogo
              </Link>

              <Link
                to="/contato"
                className="rounded-full border border-[#b8a894] px-7 py-3 text-center text-sm font-semibold text-[#24384d] transition hover:bg-[#efe3d4]"
              >
                Falar com a loja
              </Link>
            </div>

            <div className="mt-10 grid gap-4 border-t border-[#eadfce] pt-8 sm:grid-cols-3">
              <Metric
                label="5 categorias"
                text="organizadas conforme o seu mix real de produtos"
              />
              <Metric
                label="100% responsivo"
                text="visual elegante no celular e no computador"
              />
              <Metric
                label="Compra simples"
                text="navegação clara para facilitar conversão"
              />
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-gradient-to-b from-[#efe3d4] to-[#e7dfd6] shadow-[0_20px_60px_rgba(36,56,77,0.08)] lg:min-h-[100%]">
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=80"
              alt="Coleção moderna e elegante"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#24384d]/60 via-[#24384d]/10 to-transparent" />

            <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white sm:p-8 lg:p-10">
              <div className="mb-4 inline-flex w-max rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] backdrop-blur-sm">
                Destaque visual
              </div>

              <h2 className="max-w-md text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl">
                Identidade delicada, visual premium e apresentação profissional
                para surpreender seus clientes.
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <SectionHeader
          eyebrow="Categorias principais"
          title="A loja foi organizada exatamente para os produtos que você vende"
          text="Tudo foi planejado para destacar baby look feminina, camiseta masculina, linha infantil e bodies de forma clara, elegante e simples."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <article
              key={category.id}
              className="group overflow-hidden rounded-[1.8rem] border border-[#ddd0c1] bg-white shadow-[0_12px_40px_rgba(36,56,77,0.05)] transition hover:-translate-y-1"
            >
              <div className="h-72 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
                  {category.short}
                </div>
                <h3 className="mt-3 text-2xl font-semibold text-[#24384d]">
                  {category.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6d7a88]">
                  {category.description}
                </p>
                <Link
                  to="/catalogo"
                  className="mt-5 inline-block text-sm font-semibold text-[#3b648c] transition hover:text-[#24384d]"
                >
                  Ver produtos →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white/70 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            centered
            eyebrow="Produtos em destaque"
            title="Mais vendidos da Toque de Bençãos"
            text="Uma vitrine pensada para valorizar o produto, facilitar a leitura do preço e tornar a compra mais convidativa em qualquer tela."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-6 rounded-[2rem] border border-[#ddd0c1] bg-gradient-to-r from-[#24384d] to-[#31506d] p-8 text-white shadow-[0_20px_60px_rgba(36,56,77,0.16)] lg:grid-cols-[1fr_1fr] lg:p-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9cdbd]">
              Novo posicionamento da marca
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Menos genérico. Mais identidade, mais confiança e mais clareza
              para vender.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BrandChip text="Logo visível e valorizada" />
            <BrandChip text="Layout premium e leve" />
            <BrandChip text="Estrutura pensada para celular" />
            <BrandChip text="Foco no catálogo real da loja" />
          </div>
        </div>
      </section>

      <section className="bg-[#efe3d4]/65 py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            centered
            eyebrow="Experiência de compra"
            title="Uma loja bonita, simples de usar e pronta para transmitir profissionalismo"
            text="A proposta aqui não foi criar só um visual bonito. Foi criar um site que ajude o cliente a confiar, navegar rápido e comprar com mais facilidade."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-[1.75rem] border border-[#dbcbb8] bg-white p-8 text-center shadow-[0_12px_30px_rgba(36,56,77,0.04)]"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f4ece2] text-2xl text-[#c99d4d]">
                  ✦
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#24384d]">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[#6d7a88]">
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-white shadow-[0_14px_40px_rgba(36,56,77,0.05)]">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80"
            alt="Moda feminina e familiar"
            className="h-full min-h-[340px] w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Sobre a experiência
          </div>
          <h2 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            O site foi refinado para parecer uma marca de verdade, pronta para
            crescer e vender com presença.
          </h2>
          <p className="mt-5 text-sm leading-7 text-[#526374] sm:text-base">
            Em vez de um layout genérico, a proposta foi construir uma vitrine
            com mais alma e mais coerência com a sua logo. A paleta foi
            suavizada, a tipografia ficou mais elegante e os blocos foram
            reorganizados para destacar cada categoria sem poluição visual.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <FeaturePill text="Seções com leitura fácil" />
            <FeaturePill text="CTA visível para conversão" />
            <FeaturePill text="Rodapé completo e profissional" />
            <FeaturePill text="Menu adaptado para celular" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <SectionHeader
          centered
          eyebrow="Depoimentos"
          title="O que o visual da loja transmite para quem compra"
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-[1.75rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_12px_35px_rgba(36,56,77,0.05)]"
            >
              <div className="text-[#c99d4d]">★★★★★</div>
              <p className="mt-5 leading-7 text-[#516273]">
                “{testimonial.text}”
              </p>
              <div className="mt-6 font-semibold text-[#24384d]">
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-14 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader
            centered
            eyebrow="Perguntas frequentes"
            title="Detalhes pensados para facilitar a operação da loja"
          />

          <div className="mt-10 space-y-4">
            {faqs.map((item) => (
              <div
                key={item.question}
                className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-6 shadow-[0_10px_30px_rgba(36,56,77,0.04)]"
              >
                <h3 className="text-lg font-semibold text-[#24384d]">
                  {item.question}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#5d6d7d]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-8 overflow-hidden rounded-[2rem] border border-[#ddd0c1] bg-gradient-to-r from-[#24384d] to-[#31506d] p-8 text-white shadow-[0_20px_60px_rgba(36,56,77,0.15)] lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d9cdbd]">
              Relacionamento com clientes
            </div>
            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Receba novidades, coleções e ofertas especiais da Toque de
              Bençãos
            </h2>
            <p className="mt-4 max-w-2xl text-white/80">
              Cadastre seu e-mail e mantenha sua base de clientes aquecida com
              lançamentos e campanhas sazonais.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-[1.5rem] bg-white/10 p-6 backdrop-blur-sm">
            <label className="mb-3 text-sm font-medium text-white/80">
              Seu melhor e-mail
            </label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              className="rounded-2xl border border-white/20 bg-white px-4 py-4 text-[#24384d] outline-none placeholder:text-[#94a3b8]"
            />
            <button className="mt-4 rounded-2xl bg-[#c99d4d] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90">
              Quero receber novidades
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}