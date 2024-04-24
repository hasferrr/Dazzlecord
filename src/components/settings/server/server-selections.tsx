'use client'

import { type Member, MemberRole } from '@prisma/client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useDeleteServerOpen } from '@/context/modal-context'
import {
  useOpenManageMember,
  useOpenServerSettingsPage,
  useServerSettingsValue,
} from '@/context/settings/server-settings'

import ButtonSelection from '../button-selection'
import LabelSelection from '../label-selection'

interface ServerSelectionsProps {
  serverName: string
  currentMember: Member
}

const ServerSelections = ({
  serverName,
  currentMember,
}: ServerSelectionsProps) => {
  const serverSettingsValue = useServerSettingsValue()
  const openServerSettings = useOpenServerSettingsPage()
  const openManageMember = useOpenManageMember()
  const deleteServerOpen = useDeleteServerOpen()

  return (
    <div className="bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
      <ScrollArea className="pl-4">
        <div className="py-[60px] w-[13rem] flex flex-col gap-y-1">
          <LabelSelection
            title={serverName}
            className="pl-2"
          />
          {currentMember.role !== MemberRole.MODERATOR
            && (
            <ButtonSelection
              title="Overview"
              onClick={() => openServerSettings()}
              activeCondition={serverSettingsValue.overview}
            />
            )}
          <ButtonSelection
            title="Members"
            onClick={() => openManageMember()}
            activeCondition={serverSettingsValue.members}
          />
          {currentMember.role === MemberRole.OWNER
            && (
            <ButtonSelection
              title="Delete Server"
              onClick={deleteServerOpen}
              activeCondition={false}
            />
            )}
        </div>
      </ScrollArea>
    </div>
  )
}

export default ServerSelections
