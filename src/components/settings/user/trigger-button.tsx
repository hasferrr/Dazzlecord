'use client'

import { Bolt } from 'lucide-react'

import ActionTooltip from '@/components/action-tooltip'
import { useOpenUserSettingsPage } from '@/context/settings/user-settings-context'

const TriggerButton = () => {
  const openUserSettingsPage = useOpenUserSettingsPage()

  return (
    <ActionTooltip
      label="User Settings"
      side="top"
      align="center"
    >
      <button onClick={openUserSettingsPage} className="outline-none">
        <Bolt
          size={20}
          className="transition-transform duration-1000 hover:rotate-180"
        />
      </button>
    </ActionTooltip>
  )
}

export default TriggerButton
