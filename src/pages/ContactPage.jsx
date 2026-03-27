import { storeConfig } from '../data/storeData'

function ContactCard({ title, text, href }) {
  const content = (
    <div className="rounded-[1.5rem] border border-[#ddd0c1] bg-white p-5">
      <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9a835f]">
        {title}
      </div>
      <div className="mt-2 text-lg font-semibold text-[#24384d]">{text}</div>
    </div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {content}
      </a>
    )
  }

  return content
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white/70 p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
            Contato
          </div>

          <h1 className="mt-4 text-3xl font-semibold text-[#24384d] sm:text-4xl">
            Atendimento simples, humano e direto
          </h1>

          <p className="mt-4 text-sm leading-7 text-[#5a6b7b] sm:text-base">
            Esta página já está preparada para receber seus dados reais de
            atendimento, WhatsApp, Instagram, e-mail e formulário de contato.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <ContactCard
              title="WhatsApp"
              text={storeConfig.whatsappDisplay}
              href={`https://wa.me/${storeConfig.whatsappNumber}`}
            />
            <ContactCard
              title="Instagram"
              text={storeConfig.instagram}
              href={storeConfig.instagramUrl}
            />
            <ContactCard title="E-mail" text={storeConfig.email} />
            <ContactCard title="Horário" text="Segunda a sábado" />
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#ddd0c1] bg-white p-8 shadow-[0_14px_40px_rgba(36,56,77,0.05)] sm:p-10">
          <h2 className="text-2xl font-semibold text-[#24384d]">
            Envie uma mensagem
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#5a6b7b]">
            Esse formulário pode ser ligado depois ao seu e-mail, WhatsApp ou a
            um backend real.
          </p>

          <div className="mt-6 space-y-4">
            <input
              className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none transition focus:border-[#c9b8a3]"
              placeholder="Seu nome"
            />
            <input
              className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none transition focus:border-[#c9b8a3]"
              placeholder="Seu e-mail"
            />
            <input
              className="w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none transition focus:border-[#c9b8a3]"
              placeholder="Seu WhatsApp"
            />
            <textarea
              className="min-h-[160px] w-full rounded-2xl border border-[#ddd0c1] px-4 py-4 outline-none transition focus:border-[#c9b8a3]"
              placeholder="Sua mensagem"
            />
            <button className="w-full rounded-2xl bg-[#24384d] px-5 py-4 text-sm font-semibold text-white transition hover:opacity-90">
              Enviar mensagem
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}