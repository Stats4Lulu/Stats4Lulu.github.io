import Timeline from './Timeline'
import OrientationWarning from '@shared/components/OrientationWarning'
import { formatDate } from '@shared/utils/dateUtils'
import type { ContainerProps } from '@timeline/types'

export default function TimelineContainer({
  items,
  mode,
  sizeMode,
  searchQuery,
  dateFormat,
}: ContainerProps) {
  return (
    <>
      <OrientationWarning mode={mode} />

      <Timeline
        items={items}
        mode={mode}
        sizeMode={sizeMode}
        searchQuery={searchQuery}
        formatDate={(d) => formatDate(d)}
        enableReadMore={true}
      />
    </>
  )
}
