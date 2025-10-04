import { X, Search } from 'lucide-react'

export default function SearchBar({
  searchQuery,
  onSearch,
}: {
  searchQuery: string
  onSearch: (q: string) => void
}) {
  return (
    <div className="relative" role="search">
      <Search
        size={16}
        aria-hidden="true"
        className="text-muted dark:text-muted-dark absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search timeline..."
        aria-label="Search timeline"
        className="focus:ring-accent bg-background border-surface text-text placeholder-muted dark:bg-background-dark dark:border-surface-dark dark:text-text-dark dark:placeholder-muted-dark w-full rounded-lg border py-3 pr-10 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
      />

      {searchQuery && (
        <button
          onClick={() => onSearch('')}
          aria-label="Clear search"
          className="text-muted hover:text-text dark:text-muted-dark dark:hover:text-text-dark absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 transition-transform hover:scale-110 active:scale-95"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
