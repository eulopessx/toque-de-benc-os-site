import { storeConfig } from '../data/storeData'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_14px_34px_rgba(37,211,102,0.38)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[0_18px_38px_rgba(37,211,102,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/35 focus-visible:ring-offset-2 active:scale-[0.96] sm:bottom-6 sm:right-6 sm:h-[68px] sm:w-[68px]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-8 w-8 fill-current"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.5 0 .15 5.34.15 11.91c0 2.1.55 4.15 1.6 5.97L0 24l6.28-1.64a11.9 11.9 0 0 0 5.78 1.47h.01c6.57 0 11.92-5.35 11.92-11.92 0-3.18-1.24-6.17-3.47-8.43ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.73.98 1-3.64-.23-.37a9.83 9.83 0 0 1-1.5-5.27C2.22 6.47 6.63 2.06 12.07 2.06c2.63 0 5.1 1.02 6.96 2.89a9.77 9.77 0 0 1 2.88 6.96c0 5.44-4.42 9.88-9.84 9.88Zm5.41-7.39c-.3-.15-1.77-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.22-.65.08-.3-.15-1.28-.47-2.44-1.5-.91-.81-1.52-1.82-1.7-2.12-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.65-.93-2.26-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.08-.79.38-.27.3-1.04 1.01-1.04 2.46 0 1.45 1.06 2.86 1.21 3.06.15.2 2.08 3.18 5.04 4.46.7.3 1.25.48 1.68.61.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  )
}