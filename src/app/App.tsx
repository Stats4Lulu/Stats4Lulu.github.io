import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"
import { Helmet } from "react-helmet-async"

import { cleanItems } from "../data/items"
import Sidebar from "@sidebar/components/Sidebar"
import CookieBanner from "@/shared/components/Cookies"
import FilterStatusBar from "@shared/components/FilterStatusBar"
import TimelineContainer from "@timeline/components/TimelineContainer"
import EmptyState from "@shared/components/EmptyState"
import Credits from "@shared/components/Credits"
import ScrollToTopButton from "@/shared/components/ScrollButton"
import { useTimelineFilters } from "@timeline/hooks/useTimelineFilters"
import rawItems from "../data/data.json"
import MonthJump from "@/shared/components/MonthJump"

const items = cleanItems(rawItems)

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false
    const saved = localStorage.getItem("theme")
    if (saved) return saved === "dark"
    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  const toggleTheme = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  const isMobileDevice = useMediaQuery({ query: "(pointer: coarse)" })

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
    <div className="bg-mainBackground text-mainText dark:bg-mainBackground-dark dark:text-mainText-dark min-h-screen transition-colors">

      <Helmet>
        <title>Luigi Mangione Event Timeline</title>
        <meta name="description" content="Explore key moments and updates in Luigi Mangione's case - By Stats4Lulu & JAE "/>
        <meta name="author" content="Stats4Lulu & JAE" />
        <meta name="keywords" content="Luigi Mangione, Stats4Lulu, Luigistics, timeline, advocacy, events" />

        <meta property="og:title" content="Luigi Mangione Event Timeline" />
        <meta property="og:description" content="Explore key moments and updates in Luigi Mangione's case - By Stats4Lulu & JAE"/>
        <meta property="og:url" content="https://stats4lulu.github.io" />
        <meta property="og:type" content="website" />

        <meta name="twitter:title" content="Luigi Mangione Event Timeline" />
        <meta name="twitter:description" content="Explore key moments and updates in Luigi Mangione's case - By Stats4Lulu & JAE"/>
        <meta name="twitter:url" content="https://stats4lulu.github.io" />
      </Helmet>

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
        <p className="mt-1 text-[10px] opacity-70">
          Last updated:{" "}
          {new Date(__BUILD_DATE__).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>

        <Credits />

        <h1 className="text-mainTitle dark:text-mainTitle-dark mb-6 text-2xl font-bold font-title">
          Luigi Mangione Event Timeline
        </h1>

        {isMobileDevice && (
          <p className="mt-2 text-xs opacity-80">
            Note: The mobile layout is still being refined. Some elements may not display perfectly yet.
          </p>
        )}

        <div className="mb-20"></div>

        <MonthJump items={filteredItems} mode={layout.mode} />

        <FilterStatusBar
          isFiltered={isFiltered || search.query !== ""}
          visibleCount={filteredItems.length}
          totalCount={items.length}
          clearAllFilters={clearFilters}
          mode={layout.mode}
        />

        {filteredItems.length > 0 ? (
          <>
            <TimelineContainer
              items={filteredItems}
              mode={layout.mode}
              sizeMode={layout.sizeMode}
              searchQuery={search.query}
              dateFormat={date.format}
            />
            <div className="mt-8 text-center text-sm text-mainText dark:text-mainText-dark opacity-70">
              You've reached the end!
            </div>
          </>
        ) : (
          <EmptyState isFiltered={isFiltered} searchQuery={search.query} />
        )}
      </main>

      <ScrollToTopButton />
      <CookieBanner 
        bgColor={"bg-mainLinks"}
      />
    </div>
  )
}
