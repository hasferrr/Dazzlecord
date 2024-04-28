'use client'

import { RefreshCw } from 'lucide-react'
import { useTheme } from 'next-themes'

import ActionTooltip from '@/components/action-tooltip'
import { cn } from '@/lib/utils'

const Appearance = () => {
  const { setTheme, theme } = useTheme()

  return (
    <div>
      <h1 className="text-lg font-bold pb-5">Theme</h1>
      <div className="flex gap-5">
        <ActionTooltip label="Light" side="top">
          <button
            className={cn(
              'border-1 rounded-full h-[60px] w-[60px] bg-server border-server-dark border-2',
              theme === 'light' && 'border-indigo-500',
            )}
            onClick={() => setTheme('light')}
          />
        </ActionTooltip>
        <ActionTooltip label="Dark" side="top">
          <button
            className={cn(
              'border-1 rounded-full h-[60px] w-[60px] bg-server-dark border-server border-2',
              theme === 'dark' && 'border-indigo-500',
            )}
            onClick={() => setTheme('dark')}
          />
        </ActionTooltip>
        <ActionTooltip label="Sync with computer" side="top">
          <button
            className={cn(
              'border-1 rounded-full h-[60px] w-[60px] bg-server-dark border-server border-2',
              theme === 'system' && 'border-indigo-500',
              'flex items-center justify-center',
            )}
            onClick={() => setTheme('system')}
          >
            <RefreshCw className="text-server" size={30} />
          </button>
        </ActionTooltip>
      </div>
    </div>
  )
}

export default Appearance
