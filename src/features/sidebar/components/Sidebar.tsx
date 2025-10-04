import { Tag, MapPin } from 'lucide-react'

import SidebarWrapper from './SidebarWrapper'
import ThemeToggle from './ThemeToggle'
import SearchBar from './SearchBar'
import FilterSection from './FilterSection'
import DateFilter from './DateFilter'
import LayoutControls from './LayoutControls'
import ClearFiltersButton from './ClearFilterButton'
import SortControls from './SortControls'

import type { SidebarProps } from '@sidebar/types'

export default function Sidebar({
  toggleTheme,
  search,
  layout,
  date,
  filters,
  items,
  sort,
}: SidebarProps) {
  const { query, set: setSearchQuery } = search
  const { mode, setMode, sizeMode, setSizeMode } = layout
  const { range, setRange, format, setFormat } = date
  const {
    categories,
    jurisdictions,
    selectedCategories,
    setSelectedCategories,
    selectedJurisdictions,
    setSelectedJurisdictions,
  } = filters

  const clearAllFilters = () => {
    setSearchQuery('')
    setRange({})
    setSelectedCategories(Object.fromEntries(categories.map((c) => [c, true])))
    setSelectedJurisdictions(
      Object.fromEntries(jurisdictions.map((j) => [j, true])),
    )
  }

  return (
    <SidebarWrapper>
      <ThemeToggle toggleTheme={toggleTheme} />

      <div className="mt-3 mb-4">
        <SearchBar searchQuery={query} onSearch={setSearchQuery} />
      </div>

      <SortControls order={sort.order} onChange={sort.onChange} />

      <FilterSection
        title="Categories"
        icon={<Tag size={16} />}
        items={categories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />

      <FilterSection
        title="Jurisdictions"
        icon={<MapPin size={16} />}
        items={jurisdictions}
        selected={selectedJurisdictions}
        onChange={setSelectedJurisdictions}
      />

      <DateFilter
        dateRange={range}
        onDateRangeChange={setRange}
        dateFormat={format}
        onDateFormatChange={setFormat}
        items={items}
      />

      <LayoutControls
        currentMode={mode}
        onModeChange={setMode}
        sizeMode={sizeMode}
        onSizeModeChange={setSizeMode}
      />

      <div className="mt-4">
        <ClearFiltersButton onClear={clearAllFilters} />
      </div>
    </SidebarWrapper>
  )
}
