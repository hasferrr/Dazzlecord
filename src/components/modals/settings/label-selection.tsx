'use client'

import { cn } from '@/lib/utils'

interface LabelSelectionProps {
  title: string
  className?: string
}

export const LabelSelection = ({
  title,
  className,
}: LabelSelectionProps) => {
  return (
    <div className={cn('flex items-center justify-between py-2 w-[192px]', className)}>
      <p className="text-xs font-bold text-channel-section">
        {title}
      </p>
    </div>
  )
}

export default LabelSelection
