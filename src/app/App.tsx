import { useState } from 'react'

import { cleanItems } from '../data/items'
import Sidebar from '@sidebar/components/Sidebar'
import FilterStatusBar from '@shared/components/FilterStatusBar'
import TimelineContainer from '@timeline/components/TimelineContainer'
import EmptyState from '@shared/components/EmptyState'
import Credits from '@shared/components/Credits'
import ScrollToTopButton from '@shared/components/ScrollToTopButton'
import { useTimelineFilters } from '@timeline/hooks/useTimelineFilters'
import ThemeCustomizer from './Theme'
import rawItems from '../data/data.json'

const items = cleanItems(rawItems)

export default function App() {
  const [isDark, setIsDark] = useState(
    typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark'),
  )

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const {
    search,
    layout,
    date,
    filters,
    filteredItems,
    clearFilters,
    isFiltered,
    sort,
  } = useTimelineFilters(items)

  return (
    <div className="bg-background text-text dark:bg-background-dark dark:text-text-dark min-h-screen transition-colors">
      <Sidebar
        toggleTheme={toggleTheme}
        search={search}
        layout={layout}
        date={date}
        filters={filters}
        items={items}
        sort={sort}
      />

      <main className="mx-auto max-w-3xl p-6">
        <Credits />
        <h1 className="text-accent dark:text-accent-dark mb-6 text-2xl font-bold">
          Luigi Mangione Event Timeline
        </h1>

        <ThemeCustomizer />

        <FilterStatusBar
          isFiltered={isFiltered || search.query !== ''}
          visibleCount={filteredItems.length}
          totalCount={items.length}
          clearAllFilters={clearFilters}
          mode={layout.mode}
        />

        {filteredItems.length > 0 ? (
          <TimelineContainer
            items={filteredItems}
            mode={layout.mode}
            sizeMode={layout.sizeMode}
            searchQuery={search.query}
            dateFormat={date.format}
          />
        ) : (
          <EmptyState isFiltered={isFiltered} searchQuery={search.query} />
        )}
      </main>
      <ScrollToTopButton />
    </div>
  )
}
