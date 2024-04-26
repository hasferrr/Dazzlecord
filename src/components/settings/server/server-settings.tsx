/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { type Member, MemberRole, type Server } from '@prisma/client'

import { useDeleteServerOpen } from '@/context/modal-context'
import {
  useCloseServerSettingsPage,
  useOpenManageMember,
  useOpenServerSettingsPage,
  useServerSettingsPageValue,
  useServerSettingsValue,
} from '@/context/settings/server-settings-context'
import type { MemberWithUser } from '@/types'

import Members from './members'
import Overview from './overview'
import ButtonSelection from '../button-selection'
import SettingsLayout from '../settings-layout'

interface ServerSettingsProps {
  server: Server
  currentMember: Member
  serverMembers: MemberWithUser[]
}

const ServerSettings = ({
  server,
  currentMember,
  serverMembers,
}: ServerSettingsProps) => {
  const serverSettingsValue = useServerSettingsValue()
  const serverSettingsPageValue = useServerSettingsPageValue()
  const closeServerSettingsPage = useCloseServerSettingsPage()
  const openServerSettings = useOpenServerSettingsPage()

  const openManageMember = useOpenManageMember()
  const deleteServerOpen = useDeleteServerOpen()

  return (
    <SettingsLayout
      label={server.name}
      isSettingsPageOpen={serverSettingsPageValue}
      closeSettingsPage={closeServerSettingsPage}
      selectionComponents={(
        <>
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
        </>
      )}
    >
      {serverSettingsValue.overview && currentMember.role !== MemberRole.MODERATOR
        && <Overview server={server} />}
      {serverSettingsValue.members
        && <Members members={serverMembers} currentMember={currentMember} />}
    </SettingsLayout>
  )
}

export default ServerSettings
