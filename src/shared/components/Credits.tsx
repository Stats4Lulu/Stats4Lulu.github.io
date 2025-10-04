import { Heart } from 'lucide-react'

export default function TimelineCredits() {
  return (
    <div className="border-muted/20 dark:border-muted-dark/20 text-muted dark:text-muted-dark mb-6 border-b py-2 text-center text-xs transition-colors">
      <p className="flex items-center justify-center gap-1">
        <span>Timeline created with</span>
        <Heart
          size={14}
          className="text-accent animate-heartbeat drop-shadow-sm"
          fill="currentColor"
          stroke="none"
          aria-hidden="true"
        />
        <span>by</span>
        <a
          href="https://tinyurl.com/stats4lulu"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 hover:underline"
        >
          Stats4Lulu
        </a>
        <span>&</span>
        <a
          href="https://luigistics.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 hover:underline"
        >
          JAE
        </a>
      </p>

      <p className="mt-1 flex items-center justify-center gap-2">
        <a
          href="https://discord.gg/m8g6Ryv5PH"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 hover:underline"
        >
          Join our Discord
        </a>
        <span>-</span>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeLFppQsFajVnM_QrxfphwQ-1EKnUKWgMMfBfga9yX3JkZ_9Q/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-accent/80 hover:underline"
        >
          Bug reports & suggestions
        </a>
      </p>
    </div>
  )
}
