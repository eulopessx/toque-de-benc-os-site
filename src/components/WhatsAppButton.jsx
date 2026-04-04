import { storeConfig } from '../data/storeData'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a loja pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[0_16px_36px_rgba(37,211,102,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]"
    >
      <span className="text-base">✆</span>
      <span>WhatsApp</span>
    </a>
  )
}