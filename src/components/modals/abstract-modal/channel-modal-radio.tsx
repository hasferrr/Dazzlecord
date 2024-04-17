import { ChannelType } from '@prisma/client'

import {
  FormControl,
  FormItem,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

const ChannelModalRadio = ({
  id,
  isPending,
  textTop,
  textBot,
  className,
  radio,
}: {
  id: ChannelType
  isPending: boolean
  textTop: string
  textBot: string
  className: string
  radio: string | undefined
}) => {
  return (
    <FormItem>
      <FormControl>
        <RadioGroupItem
          id={id}
          value={id}
          className="hidden"
          disabled={isPending}
        />
      </FormControl>
      <Label
        htmlFor={id}
        className={cn(`inline-flex items-center justify-between w-full
        p-[10px] px-4 rounded-sm border-0

        bg-[var(--light-server)]
        dark:bg-[var(--dark-server)]

        hover:bg-[var(--light-server-hover)]
        dark:hover:bg-[var(--dark-server-hover)]

        active:bg-[var(--light-server-active)]
        dark:active:bg-[var(--dark-server-active)]

        cursor-pointer`,

        radio === id && 'bg-[var(--light-server-hover)]',
        radio === id && 'dark:bg-[var(--dark-server-hover)]',

        className,
        )}>
        <div className="flex flex-col gap-1">
          <div className="w-full text-sm font-semibold">
            {textTop}
          </div>
          <div className="w-full text-xs">
            {textBot}
          </div>
        </div>
        {/* svg here */}
      </Label>
    </FormItem>
  )
}

export default ChannelModalRadio
