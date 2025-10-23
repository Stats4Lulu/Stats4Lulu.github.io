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
  regularAlt: {
    panel: 'px-3 py-2 max-w-lg',
    date: 'text-sm font-title font-bold',
    title: 'text-base font-title font-bold mb-1',
    subtitle: 'text-sm font-title italic mb-1',
    content: 'text-sm',
    badge: 'text-xs px-2 py-0.5',
    time: 'text-xs px-2 py-0.5',
    sources: 'text-xs',
    sourceLabel: 'text-xs',
    spacing: 'space-y-4',
    gutter: 28,
    dotSize: 12,
    lineWidth: 3,
  },
  largeAlt: {
    panel: 'px-6 py-4 max-w-2xl',
    date: 'text-sm font-title font-bold',
    title: 'text-xl font-title font-bold mb-1',
    subtitle: 'text-base text-xs font-title italic mb-2',
    content: 'text-base',
    badge: 'inline-flex items-center h-6 px-2 rounded text-xs leading-none whitespace-nowrap',
    time: 'inline-flex items-center h-6 px-2 rounded text-sm leading-none whitespace-nowrap',
    sources: 'text-sm',
    sourceLabel: 'text-sm',
    spacing: 'space-y-8',
    gutter: 36,
    dotSize: 16,
    lineWidth: 4,
  },
  regularVert: {
    panel: 'px-4 py-3 max-w-2xl',
    date: 'text-lg font-title font-bold',
    title: 'text-xl font-title font-bold mb-1',
    subtitle: 'text-base font-title italic mb-2',
    content: 'text-base',
    badge: 'text-xs px-2 py-1',
    time: 'text-sm px-2 py-1',
    sources: 'text-sm',
    sourceLabel: 'text-sm',
    spacing: 'space-y-8',
    gutter: 20,
    dotSize: 16,
    lineWidth: 4,
  },
  largeVert: {
    panel: 'px-6 py-5 max-w-4xl',
    date: 'text-xl font-title font-bold',
    title: 'text-2xl font-title font-bold mb-3',
    subtitle: 'text-lg font-title italic mb-3',
    content: 'text-lg leading-relaxed',
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
