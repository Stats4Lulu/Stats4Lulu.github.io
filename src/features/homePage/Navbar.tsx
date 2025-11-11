export default function Navbar() {
  return (
    <nav
      className="flex justify-between items-start px-4 md:px-6 py-2 border-b border-white/30 min-w-0 font-title"
    >
      <div className="flex flex-col text-black">
        <h1
          className="text-xl sm:text-lg md:text-xl lg:text-3xl font-bold"
          style={{ lineHeight: 1.05 }}
        >
          Stats4Lulu Official Website
        </h1>
        <h2
          className="font-mono text-sm sm:text-sm md:text-base lg:text-base text-black/60"
          style={{ lineHeight: 1.05 }}
        >
          Luigi Mangione data and statistical insights
        </h2>

        <div
          className="flex flex-wrap items-center gap-[0.4rem] text-sm sm:text-sm md:text-base mt-1 font-semibold italic text-black/75"
          style={{ lineHeight: 1.05 }}
        >
          <a
            href="mailto:stats4lulu@gmail.com"
            className="hover:text-blue-200 transition whitespace-nowrap"
          >
            stats4lulu@gmail.com
          </a>
          <span className="text-black/40">•</span>
          <a
            href="https://discord.gg/hDuuFCtWbk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition whitespace-nowrap"
          >
            Join our Discord
          </a>
          <span className="text-black/40">•</span>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSeLFppQsFajVnM_QrxfphwQ-1EKnUKWgMMfBfga9yX3JkZ_9Q/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-200 transition whitespace-nowrap"
          >
            Bug Reports & Suggestions
          </a>
        </div>
      </div>
    </nav>
  )
}
  