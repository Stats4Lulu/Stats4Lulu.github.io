import type { CardSectionProps } from '@timeline/types'

export default function CardSection({
    section,
    i,
    buttonColor
  }: CardSectionProps) {
    return (
      <div key={i} className={`${i > 0 ? "mt-4" : ""}`}>
        <h2
          className="text-lg md:text-xl font-bold mb-2 text-thirdCard font-title"
        >
          {section.name}
        </h2>
        <div className="flex flex-col gap-2">
          {section.links.map(({text, link}, j) => (
            <button
              key={j}
              onClick={() =>
                window.open(link, "_blank", "noopener,noreferrer")
              }
              className={`px-1.5 py-1.5 text-white rounded-md hover:opacity-90 text-center transition w-full cursor-pointer break-words`}
              style={{ backgroundColor: buttonColor }}
            >
              {text}
            </button>
          ))}
        </div>
      </div>
    )
}