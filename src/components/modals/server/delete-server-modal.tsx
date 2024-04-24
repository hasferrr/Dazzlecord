'use client'

import type { Server } from '@prisma/client'

import { deleteServer } from '@/actions/server/delete-server'
import AbstractDeleteModal from '@/components/modals/abstract-delete-modal'
import {
  useDeleteServerClose,
  useDeleteServerValue,
} from '@/context/modal-context'

const DeleteServerModal = ({ server }: {
  server: Server,
}) => {
  const onDeleteModalClose = useDeleteServerClose()
  const isDeleteModalOpen = useDeleteServerValue()

  return (
    <AbstractDeleteModal
      title={`Delete '${server.name}'`}
      deleteDescription={(
        <>
          Are you sure you want to delete
          <strong>{server.name}</strong>
          ? This action cannot be undone.
        </>
      )}
      isDeleteModalOpen={isDeleteModalOpen}
      onDeleteModalClose={onDeleteModalClose}
      onSubmitAction={() => deleteServer(server)}
      redirectPath="/app"
      titleSubmitButton="Delete Server"
    />
  )
}

export default DeleteServerModal
