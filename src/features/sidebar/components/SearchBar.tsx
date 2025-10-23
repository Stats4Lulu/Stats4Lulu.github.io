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
        className="text-sbIcon dark:text-sbIcon-dark absolute top-1/2 left-3 -translate-y-1/2"
      />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search timeline..."
        aria-label="Search timeline"
        className="focus:ring-sbActive bg-sbBackground border-sbSection text-sbText placeholder-sbSection dark:bg-sbBackground-dark dark:border-sbSection-dark dark:text-sbText-dark dark:placeholder-sbSetion-dark w-full rounded-lg border py-3 pr-10 pl-10 text-sm transition-colors focus:ring-2 focus:outline-none"
      />

      {searchQuery && (
        <button
          onClick={() => onSearch('')}
          aria-label="Clear search"
          className="text-sbBackground hover:text-sbText dark:text-sbIcon-dark dark:hover:text-sbText-dark absolute top-1/2 right-3 -translate-y-1/2 rounded p-1 transition-transform hover:scale-110 active:scale-95"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}