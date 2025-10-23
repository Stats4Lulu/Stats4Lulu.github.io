export type Mode = 'VERTICAL' | 'VERTICAL_ALTERNATING'
export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY'
export type SizeMode = 'regularAlt' | 'largeAlt' | 'regularVert' | 'largeVert'
export type SortOrder = 'ASC' | 'DESC'

export interface SortProps {
  order: SortOrder
  onChange: (order: SortOrder) => void
}

export interface DateRange {
  from?: Date
  to?: Date
}

export type CategoryFilter = Record<string, boolean>
export type JurisdictionFilter = Record<string, boolean>

export interface SearchProps {
  query: string
  set: (query: string) => void
}

export interface LayoutProps {
  mode: Mode
  setMode: (mode: Mode) => void
  sizeMode: SizeMode
  setSizeMode: (size: SizeMode) => void
}

export interface DateProps {
  range: DateRange
  setRange: (range: DateRange) => void
  format: DateFormat
  setFormat: (format: DateFormat) => void
}

export interface FilterProps {
  categories: string[]
  jurisdictions: string[]
  selectedCategories: CategoryFilter
  selectedJurisdictions: JurisdictionFilter
  setSelectedCategories: (next: CategoryFilter) => void
  setSelectedJurisdictions: (next: JurisdictionFilter) => void
}

export interface SidebarProps {
  toggleTheme: () => void
  search: SearchProps
  layout: LayoutProps
  date: DateProps
  sort: SortProps
  filters: FilterProps
  items: Array<{ date: string }>
}
