import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const ChannelModalRadio = ({
  isPending,
  textTop,
  textBot,
  id,
  value,
  className,
}: {
  isPending: boolean
  textTop: string
  textBot: string
  id: 'text' | 'voice' | 'video'
  value: string
  className: string
}) => {
  return (
    <div>
      <Input
        type="radio"
        id={id}
        value={value}
        name="channel"
        className={cn(`hidden peer/${id}`)}
        disabled={isPending}
      />
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

        id === 'text' && 'peer-checked/text:bg-[var(--light-server-hover)]',
        id === 'voice' && 'peer-checked/voice:bg-[var(--light-server-hover)]',
        id === 'video' && 'peer-checked/video:bg-[var(--light-server-hover)]',

        id === 'text' && 'dark:peer-checked/text:bg-[var(--dark-server-hover)]',
        id === 'voice' && 'dark:peer-checked/voice:bg-[var(--dark-server-hover)]',
        id === 'video' && 'dark:peer-checked/video:bg-[var(--dark-server-hover)]',

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
    </div>
  )
}

export default ChannelModalRadio
