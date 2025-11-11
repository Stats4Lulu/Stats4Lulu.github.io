import type { HomePageCardProps } from '@timeline/types'
import CardSection from './CardSection'

export default function HomePageCard({
    card,
    i,
    showSecondary = false
  }: HomePageCardProps) {
    return (
      <div
        key={i}
        className={`relative w-72 md:w-80 h-auto md:h-[84vh] rounded-2xl shadow-lg flex flex-col z-10 overflow-hidden mb-6 md:mb-0 transition-all duration-700 ease-out ${
          showSecondary
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <div className="absolute inset-0 bg-white/60 rounded-2xl"></div>
        <div className="relative pt-4 px-6 pb-6 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
          {card.sections.map((section, index) => (
            <CardSection
              section={section}
              i={index}
              buttonColor={card.buttonColor}
            />
          ))}
        </div>
      </div>
  )
}