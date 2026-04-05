import { storeConfig } from '../data/storeData'

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${storeConfig.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.35)] transition-all duration-200 ease-out hover:scale-105 hover:shadow-[0_16px_34px_rgba(37,211,102,0.42)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/35 focus-visible:ring-offset-2 active:scale-[0.96] sm:bottom-6 sm:right-6"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className="h-7 w-7 fill-current"
        aria-hidden="true"
      >
        <path d="M19.11 17.23c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.62.14-.18.27-.71.88-.87 1.06-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.38-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.5-.85-2.05-.22-.53-.45-.45-.62-.46h-.53c-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.27s.98 2.64 1.12 2.82c.14.18 1.93 2.95 4.67 4.13.65.28 1.16.45 1.56.58.66.21 1.27.18 1.75.11.53-.08 1.6-.65 1.83-1.28.23-.62.23-1.16.16-1.27-.07-.11-.25-.18-.52-.32Z" />
        <path d="M16.01 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.26.59 4.47 1.72 6.42L3 29l6.74-1.77a12.74 12.74 0 0 0 6.27 1.68h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.42-1.33-6.63-3.75-9.05A12.7 12.7 0 0 0 16.01 3.2Zm0 23.55h-.01a10.7 10.7 0 0 1-5.44-1.49l-.39-.23-4 .99 1.07-3.9-.25-.4a10.66 10.66 0 0 1-1.64-5.7c0-5.88 4.78-10.66 10.67-10.66 2.84 0 5.5 1.11 7.51 3.12a10.56 10.56 0 0 1 3.12 7.53c0 5.88-4.78 10.66-10.64 10.66Z" />
      </svg>
    </a>
  )
}