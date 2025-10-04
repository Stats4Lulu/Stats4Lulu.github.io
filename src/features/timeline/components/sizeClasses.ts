import type { SizeMode } from '@timeline/types'


export const sizeClasses: Record<
  SizeMode,
  {
    panel: string
    date: string
    title: string
    subtitle: string
    content: string
    badge: string
    time: string
    sources: string
    sourceLabel: string
    spacing: string
    gutter: number
    dotSize: number
    lineWidth: number
  }
> = {
  smaller: {
    panel: 'px-3 py-2 max-w-lg',
    date: 'text-sm font-semibold',
    title: 'text-sm font-medium mb-1',
    subtitle: 'text-xs mb-1',
    content: 'text-xs',
    badge: 'text-xs px-2 py-0.5',
    time: 'text-xs px-2 py-0.5',
    sources: 'text-xs',
    sourceLabel: 'text-xs',
    spacing: 'space-y-4',
    gutter: 28,
    dotSize: 12,
    lineWidth: 3,
  },
  regular: {
    panel: 'px-4 py-3 max-w-2xl',
    date: 'text-lg font-bold',
    title: 'text-base font-semibold mb-1',
    subtitle: 'text-sm mb-2',
    content: 'text-sm',
    badge: 'text-xs px-2 py-1',
    time: 'text-sm px-2 py-1',
    sources: 'text-xs',
    sourceLabel: 'text-xs',
    spacing: 'space-y-8',
    gutter: 36,
    dotSize: 16,
    lineWidth: 4,
  },
  large: {
    panel: 'px-6 py-5 max-w-4xl',
    date: 'text-xl font-bold',
    title: 'text-xl font-semibold mb-3',
    subtitle: 'text-base mb-3',
    content: 'text-base leading-relaxed',
    badge: 'text-sm px-3 py-1.5',
    time: 'text-sm px-3 py-1.5',
    sources: 'text-sm',
    sourceLabel: 'text-sm',
    spacing: 'space-y-12',
    gutter: 48,
    dotSize: 20,
    lineWidth: 5,
  },
}
