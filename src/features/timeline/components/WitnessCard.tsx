import type { Witness } from '@timeline/types'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

interface WitnessListProps {
    witnesses: Witness[]
    textSizeClass?: string
}

interface WitnessItemProps {
    witness: Witness
    index: number
    textSizeClass: string
}

function WitnessItem({ witness, index, textSizeClass }: WitnessItemProps) {
    const itemValue = witness.name || `witness-${index}` // future-proofing for id

    return (
        <Accordion.Item
            key={itemValue}
            value={itemValue}
            className="bg-white dark:bg-gray-900"
        >
            <Accordion.Trigger asChild>
                <div
                    className="group w-full px-3 py-2 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <span className={`font-medium ${textSizeClass}`}>
                        {witness.name}
                        {witness.title && (
                            <span className="font-normal text-gray-500 dark:text-gray-400"> ({witness.title})</span>
                        )}
                    </span>
                    <ChevronDown
                        className="text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                        size={16}
                        aria-hidden="true"
                    />
                </div>
            </Accordion.Trigger>

            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className={`px-3 pb-3 space-y-1 bg-gray-50 dark:bg-gray-800/50 ${textSizeClass}`}>
                    {witness.connection && (
                        <p>
                            <strong>Connection:</strong> {witness.connection}
                        </p>
                    )}
                    {witness.testimony && (
                        <p>
                            <strong>Testimony:</strong> {witness.testimony}
                        </p>
                    )}
                    {witness.crossExamination && (
                        <p>
                            <strong>Cross Exam:</strong> {witness.crossExamination}
                        </p>
                    )}
                </div>
            </Accordion.Content>
        </Accordion.Item>
    )
}

// textSizeClass = from sizeClasses.ts, just easier to implement this way, might extend to other parts, too (we'll see):)!
export function WitnessList({ witnesses, textSizeClass = 'text-sm' }: WitnessListProps) {
    return (
        <div className="mt-4">
            <p className={`font-semibold text-gray-600 dark:text-gray-400 mb-2 ${textSizeClass}`}>
                Witnesses Called
            </p>

            <Accordion.Root
                type="multiple"
                className="divide-y dark:divide-gray-700 border dark:border-gray-700 rounded-lg overflow-hidden"
            >
                {witnesses.map((witness, index) => (
                    <WitnessItem
                        key={witness.name || `witness-${index}`}
                        witness={witness}
                        index={index}
                        textSizeClass={textSizeClass}
                    />
                ))}
            </Accordion.Root>
        </div>
    )
}

export default WitnessList