import { useState, useMemo, useEffect } from 'react'

import type {
  DateRange,
  SortOrder,
  DateFormat,
  SizeMode,
  Mode,
  CategoryFilter,
  JurisdictionFilter,
} from '@sidebar/types'
import type { TimelineItem } from '@timeline/types'
import { parseDate, isDateInRange } from '@shared/utils/dateUtils'

export function useTimelineFilters(items: TimelineItem[]) {
  const [searchQuery, setSearchQuery] = useState('')
  const [mode, setMode] = useState<Mode>('VERTICAL')
  const [dateRange, setDateRange] = useState<DateRange>({})
  const [dateFormat, setDateFormat] = useState<DateFormat>('DD/MM/YYYY')
  const [sizeMode, setSizeMode] = useState<SizeMode>('regularVert')
  const [sortOrder, setSortOrder] = useState<SortOrder>('ASC')

  const { categories, jurisdictions } = useMemo(() => {
    const cats = new Set<string>()
    const jur = new Set<string>()
    items.forEach((i) => {
      if (i.category) cats.add(i.category)
      if (i.jurisdiction) jur.add(i.jurisdiction)
    })
    return {
      categories: Array.from(cats).sort(),
      jurisdictions: Array.from(jur).sort(),
    }
  }, [items])

  const [selectedCategories, setSelectedCategories] = useState<CategoryFilter>(
    {},
  )
  const [selectedJurisdictions, setSelectedJurisdictions] =
    useState<JurisdictionFilter>({})

  useEffect(() => {
    setSelectedCategories((prev) => {
      const next = { ...prev }
      categories.forEach((c) => {
        if (!(c in next)) next[c] = true
      })
      return next
    })
  }, [categories])

  useEffect(() => {
    setSelectedJurisdictions((prev) => {
      const next = { ...prev }
      jurisdictions.forEach((j) => {
        if (!(j in next)) next[j] = true
      })
      return next
    })
  }, [jurisdictions])

  const changeMode = (m: Mode) => {
    setMode(m)
    if (m === 'VERTICAL') setSizeMode('regularVert')
    if (m === 'VERTICAL_ALTERNATING')
      setSizeMode('regularAlt')
  }

  const clearFilters = () => {
    setSearchQuery('')
    setDateRange({})
    setSelectedCategories(Object.fromEntries(categories.map((c) => [c, true])))
    setSelectedJurisdictions(
      Object.fromEntries(jurisdictions.map((j) => [j, true])),
    )
  }

  const filteredItems = useMemo(() => {
    let res = items.filter((item) => {
      if (!isDateInRange(item.date, dateRange)) return false
      if (!selectedCategories[item.category ?? '']) return false
      if (!selectedJurisdictions[item.jurisdiction ?? '']) return false
      return true
    })
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      res = res.filter((i) =>
        [
          i.events?.title,
          i.events?.subtitle,
          i.events?.content,
          i.category,
          i.jurisdiction,
        ].some((t) => t?.toLowerCase().includes(q)),
      )
    }
    res.sort(
      (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime(),
    )
    if (sortOrder === 'DESC') res.reverse()
    return res
  }, [
    items,
    dateRange,
    selectedCategories,
    selectedJurisdictions,
    searchQuery,
    sortOrder,
  ])

  const isFiltered = Boolean(
    dateRange.from ||
      dateRange.to ||
      Object.values(selectedCategories).some((v) => !v) ||
      Object.values(selectedJurisdictions).some((v) => !v) ||
      searchQuery,
  )

  return {
    search: { query: searchQuery, set: setSearchQuery },
    layout: { mode, setMode: changeMode, sizeMode, setSizeMode },
    date: {
      range: dateRange,
      setRange: setDateRange,
      format: dateFormat,
      setFormat: setDateFormat,
    },
    filters: {
      categories,
      jurisdictions,
      selectedCategories,
      setSelectedCategories,
      selectedJurisdictions,
      setSelectedJurisdictions,
    },
    sort: { order: sortOrder, onChange: setSortOrder },
    filteredItems,
    isFiltered,
    clearFilters,
  }
}
