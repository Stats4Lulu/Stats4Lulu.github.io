import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react'
import CollapsibleSection from './CollapsibleSection'
import type { SortOrder } from '@sidebar/types'

interface Props {
  order: SortOrder
  onChange: (o: SortOrder) => void
}

export default function SortControls({ order, onChange }: Props) {
  return (
    <CollapsibleSection title="Sort order" icon={<ArrowDownAZ size={16} />}>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange('ASC')}
          className={`flex items-center gap-2 rounded-lg p-3 transition-colors ${
            order === 'ASC'
              ? 'bg-sbActive dark:bg-sbActive text-sbActiveText dark:text-sbActiveText-dark'
              : 'bg-sbPassive text-sbPassiveText hover:bg-sbPassive/80 dark:bg-sbPassive-dark dark:text-sbPassiveText-dark dark:hover:bg-sbPassive-dark/80'
          }`}
        >
          <ArrowDownAZ size={16} />
          <span className="text-sm">Old to New</span>
        </button>
        <button
          onClick={() => onChange('DESC')}
          className={`flex items-center gap-2 rounded-lg p-3 transition-colors ${
            order === 'DESC'
              ? 'bg-sbActive dark:bg-sbActive text-sbActiveText dark:text-sbActiveText-dark'
              : 'bg-sbPassive text-sbPassiveText hover:bg-sbPassive/80 dark:bg-sbPassive-dark dark:text-sbPassiveText-dark dark:hover:bg-sbPassive-dark/80'
          }`}
        >
          <ArrowUpAZ size={16} />
          <span className="text-sm">New to Old</span>
        </button>
      </div>
    </CollapsibleSection>
  )
}