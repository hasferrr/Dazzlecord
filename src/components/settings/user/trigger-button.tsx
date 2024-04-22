'use client'

import { Settings } from 'lucide-react'

import { ActionTooltip } from '@/components/action-tooltip'
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
        <Settings size={20} />
      </button>
    </ActionTooltip>
  )
}

export default TriggerButton
