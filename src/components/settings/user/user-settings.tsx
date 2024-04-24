'use client'

import type { User } from '@prisma/client'

import ButtonSelection from '@/components/settings/button-selection'
import SettingsLayout from '@/components/settings/settings-layout'
import { PreviewProfilesContextProvider } from '@/context/settings/user/preview-profiles-context'
import {
  useCloseUserSettingsPage,
  useOpenUserSettingsPage,
  useUserSettingsPageValue,
  useUserSettingsValue,
} from '@/context/settings/user-settings-context'

import Profiles from './profiles'

interface UserSettingsProps {
  user: User
}

const UserSettings = ({
  user,
}: UserSettingsProps) => {
  const userSettingsValue = useUserSettingsValue()
  const userSettingsPageValue = useUserSettingsPageValue()
  const closeUserSettingsPage = useCloseUserSettingsPage()
  const openUserSettingsPage = useOpenUserSettingsPage()

  return (
    <SettingsLayout
      label="USER SETTINGS"
      isSettingsPageOpen={userSettingsPageValue}
      closeSettingsPage={closeUserSettingsPage}
      selectionComponents={(
        <ButtonSelection
          title="Profiles"
          onClick={openUserSettingsPage}
          activeCondition={userSettingsValue.profiles}
        />
      )}
    >
      <PreviewProfilesContextProvider
        name={user.name}
        about={user.about}
        image={user.image}
      >
        <Profiles user={user} />
      </PreviewProfilesContextProvider>
    </SettingsLayout>
  )
}

export default UserSettings
