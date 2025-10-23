interface Props {
  isFiltered: boolean
  searchQuery: string
}

export default function EmptyState({ isFiltered, searchQuery }: Props) {
  return (
    <div className="py-8 text-center">
      <p className="text-muted dark:text-muted-dark text-lg">
        No timeline items found
      </p>

      {(searchQuery || isFiltered) && (
        <p className="text-muted/80 dark:text-muted-dark/80 text-sm">
          Try clearing your search or adjusting filters
        </p>
      )}
    </div>
  )
}
