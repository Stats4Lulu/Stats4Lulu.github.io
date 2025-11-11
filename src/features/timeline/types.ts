import type { MediaItem } from '@media/types'
import type { DateFormat } from '@sidebar/types'

export type TimelineItem = {
  id: number
  date: string
  category: string
  jurisdiction: string
  status: string
  links: Array<{
    title: string
    link: string
  }>

  events: {
    time: string | null //dont forget to remove
    title: string
    subtitle: string
    content: string
    media: MediaItem[]
  }
}

export type CardLinks = {
  buttonColor: string;

  sections: Array<{
    name: string;
    links: Array<{
      text: string;
      link: string;
    }>;
  }>
}

export interface Timelinerops {
  items: TimelineItem[]
  mode: Mode
  sizeMode?: SizeMode
  initialActiveIndex?: number
  onItemSelect?: (item: TimelineItem, index: number) => void
  highlightOnHover?: boolean
  enableReadMore?: boolean
  searchQuery?: string
  formatDate?: (date: string) => string
}

export type CardProps = {
  item: TimelineItem
  active?: boolean
  expanded?: boolean
  onSelect?: () => void
  onToggleExpand?: () => void
  size: SizeMode
  enableReadMore?: boolean
  formatDate?: (date: string) => string
  hoverHighlight?: boolean
}

export type DotProps = {
  isActive: boolean
  label: string
  dotSize: number
  onClick: () => void
}

export interface ContainerProps {
  items: TimelineItem[]
  mode: Mode
  sizeMode: SizeMode
  searchQuery: string
  dateFormat: DateFormat
}

export interface TimelineProps {
  items: TimelineItem[]
  activeIndex: number
  expanded: Set<number>
  onDotClick: (item: TimelineItem, index: number) => void
  onCardClick: (item: TimelineItem, index: number) => void
  toggleReadMore: (index: number) => void
  sizeMode: SizeMode
  useReadMore: boolean
  displayDate: (date: string) => string
  highlightCardsOnHover: boolean
}

export type HomePageCardProps = {
  card: CardLinks
  i: number
  showSecondary?: boolean
}

export type CardSectionProps = {
  section: SectionItem
  i: number
  buttonColor: string
}

export type SectionItem = {
  name: String
  links: LinkItem[];
}

export type LinkItem = {
  text: string
  link: string
}

export type Mode = 'VERTICAL' | 'VERTICAL_ALTERNATING'

export type SizeMode = 'regularAlt' | 'largeAlt' | 'regularVert' | 'largeVert'
