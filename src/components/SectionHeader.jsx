export default function SectionHeader({
  eyebrow,
  title,
  text,
  centered = false,
}) {
  return (
    <div className={centered ? 'text-center' : ''}>
      {eyebrow ? (
        <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#9a835f]">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#24384d] sm:text-4xl">
        {title}
      </h2>

      {text ? (
        <p
          className={`mt-4 text-sm leading-7 text-[#5d6d7d] sm:text-base ${
            centered ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  )
}