import { storeConfig } from '../data/storeData'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsappNumber}`}
      className="fixed bottom-5 right-5 z-50 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition hover:scale-105"
    >
      WhatsApp
    </a>
  )
}