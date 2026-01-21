import { useState } from 'react'

interface Props {
  children: React.ReactNode
  warning?: string
}

export default function ContentWarning({
  children,
  warning = 'This content may contain violence', //parameter for future proofing!:)
}: Props) {
  const [show, setShow] = useState(false)

  if (show) return <>{children}</>

  return (
    <div className="relative">
      {/*blur the content but keep it visible underneath*/}
      <div className="pointer-events-none select-none blur-xl">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black/50">
        <p className="mb-3 px-4 text-center text-sm text-white">
          {warning}
        </p>
        <button
          onClick={() => setShow(true)}
          className="rounded bg-white/20 px-4 py-2 text-sm text-white hover:bg-white/30"
        >
          Show content
        </button>
      </div>
    </div>
  )
}