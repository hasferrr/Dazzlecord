'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface ActionTooltipProps {
  children: React.ReactNode;
  label: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number
  className?: string
}

const ActionTooltip = ({
  children,
  label,
  side,
  align,
  delay,
  className,
}: ActionTooltipProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={delay ?? 25}>
      <TooltipTrigger asChild>
        {children}
      </TooltipTrigger>
      <TooltipContent side={side} align={align} className={className}>
        <p className="font-semibold text-sm">
          {label}
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
)

export default ActionTooltip
