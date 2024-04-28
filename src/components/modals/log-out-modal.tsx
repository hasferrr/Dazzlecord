'use client'

import { signOutUser } from '@/actions/sign-out-user'
import AbstractDialogModal from '@/components/modals/abstract-dialog-modal'
import { useLogOutClose, useLogOutValue } from '@/context/modal-context'
import { useCloseUserSettingsPage } from '@/context/settings/user-settings-context'

const LogOutModal = () => {
  const logOutValue = useLogOutValue()
  const logOutClose = useLogOutClose()
  const closeUserSettingsPage = useCloseUserSettingsPage()

  return (
    <AbstractDialogModal
      title="Log Out"
      deleteDescription={<div>Are you sure want to logout?</div>}
      isDeleteModalOpen={logOutValue}
      onDeleteModalClose={() => {
        logOutClose()
        closeUserSettingsPage()
      }}
      onSubmitAction={signOutUser}
      variant="destructive"
      alwaysCloseModal
    />
  )
}

export default LogOutModal
