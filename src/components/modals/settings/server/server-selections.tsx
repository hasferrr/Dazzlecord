'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useDeleteServerOpen } from '@/context/modal-context'
import {
  useServerSettingsValue,
  useSetServerSettings,
} from '@/context/settings/server-settings'

import ButtonSelection from '../button-selection'
import LabelSelection from '../label-selection'

const ServerSelections = ({ serverName }: { serverName: string }) => {
  const serverSettingsValue = useServerSettingsValue()
  const setServerSettings = useSetServerSettings()
  const deleteServerOpen = useDeleteServerOpen()

  return (
    <div className="bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
      <ScrollArea className="pl-4">
        <div className="py-[60px] w-[13rem] flex flex-col gap-y-1">
          <LabelSelection
            title={serverName}
            className="pl-2"
          />
          <ButtonSelection
            title="Overview"
            onClick={() => setServerSettings('overview', true)}
            activeCondition={serverSettingsValue.overview}
          />
          <ButtonSelection
            title="Members"
            onClick={() => setServerSettings('members', true)}
            activeCondition={serverSettingsValue.members}
          />
          <ButtonSelection
            title="Delete Server"
            onClick={deleteServerOpen}
            activeCondition={false}
          />
        </div>
      </ScrollArea>
    </div>
  )
}

export default ServerSelections
