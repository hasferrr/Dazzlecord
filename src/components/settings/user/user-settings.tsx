'use client'

import type { User } from '@prisma/client'

import ButtonSelection from '@/components/settings/button-selection'
import SettingsLayout from '@/components/settings/settings-layout'
import { useLogOutOpen } from '@/context/modal-context'
import { PreviewProfilesContextProvider } from '@/context/settings/user/preview-profiles-context'
import {
  useCloseUserSettingsPage,
  useOpenAppearanceSettingsPage,
  useOpenUserSettingsPage,
  useUserSettingsPageValue,
  useUserSettingsValue,
} from '@/context/settings/user-settings-context'

import Appearance from './appearance'
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
  const openAppearanceSettingsPage = useOpenAppearanceSettingsPage()
  const logOutOpen = useLogOutOpen()

  return (
    <SettingsLayout
      label="USER SETTINGS"
      isSettingsPageOpen={userSettingsPageValue}
      closeSettingsPage={closeUserSettingsPage}
      selectionComponents={(
        <>
          <ButtonSelection
            title="Profiles"
            onClick={openUserSettingsPage}
            activeCondition={userSettingsValue.profiles}
          />
          <ButtonSelection
            title="Appearance"
            onClick={openAppearanceSettingsPage}
            activeCondition={userSettingsValue.appearance}
          />
          <ButtonSelection
            title="Log Out"
            onClick={logOutOpen}
            activeCondition={false}
          />
        </>
      )}
    >
      {userSettingsValue.profiles
        && (
          <PreviewProfilesContextProvider
            name={user.name}
            about={user.about}
            image={user.image}
          >
            <Profiles user={user} />
          </PreviewProfilesContextProvider>
        )}
      {userSettingsValue.appearance
        && <Appearance />}
    </SettingsLayout>
  )
}

export default UserSettings
