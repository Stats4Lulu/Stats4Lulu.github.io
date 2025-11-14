import { Heart } from "lucide-react"

export default function TimelineCredits() {
  return (
    <div className="border-mainText/20 dark:border-mainText-dark/20 text-mainText dark:text-mainText-dark mb-6 border-b py-3 text-center text-xs transition-colors">
      <p className="flex items-center justify-center gap-1.5">
        <span>Timeline created with</span>
        <Heart
          size={13}
          className="text-mainHeart animate-heartbeat drop-shadow-sm translate-y-[0.5px]"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        />
        <span>by</span>
        <a
          href="https://stats4lulu.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-mainLinks hover:text-mainLinks/80 hover:underline transition-all"
        >
          Stats4Lulu
        </a>
        <span>&</span>
        <a
          href="https://www.luigistics.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-mainLinks hover:text-mainLinks/80 hover:underline transition-all"
        >
          JAE
        </a>
      </p>
      <p className="mt-1.5 flex flex-wrap items-center justify-center gap-2">
        <a
          href="https://discord.gg/hDuuFCtWbk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mainLinks font-medium hover:text-mainLinks/80 hover:underline transition-all"
        >
          Join our Discord
        </a>
        <span>·</span>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeLFppQsFajVnM_QrxfphwQ-1EKnUKWgMMfBfga9yX3JkZ_9Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mainLinks font-medium hover:text-mainLinks/80 hover:underline transition-all"
        >
          Bug reports & suggestions
        </a>
        <span>·</span>
        <a
          href="https://www.givesendgo.com/luigi-defense-fund"
          target="_blank"
          rel="noopener noreferrer"
          className="text-mainLinks font-medium hover:text-mainLinks/80 hover:underline transition-all"
        >
          Generosity looks good on you today!
        </a>
      </p>
    </div>
  )
}
