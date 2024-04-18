'use client'

import { cn } from '@/lib/utils'

interface ButtonSelectionProps {
  title: string
  width?: 192
  onClick?: () => void
  activeCondition: boolean
  className?: string
  classNameForTitle?: string
  children?: React.ReactNode
}

const ButtonSelection = ({
  title,
  width = 192,
  onClick,
  activeCondition,
  className,
  classNameForTitle,
  children,
}: ButtonSelectionProps) => {
  const wpx = new Map([
    [192, 'w-[192px]'],
  ])

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2',
        'p-2',
        wpx.get(width),
        'group rounded-md transition',
        'hover:bg-zinc-700/10',
        'dark:hover:bg-zinc-700/50',
        activeCondition && 'bg-zinc-700/20 dark:bg-zinc-700',
        className,
      )}
    >
      <p className={cn(
        'truncate font-medium text-sm transition',
        'text-channel-btn-group',
        'text-left',
        activeCondition && 'text-on-channel',
        classNameForTitle,
      )}>
        {title}
      </p>
      {children}
    </button>
  )
}

export default ButtonSelection
