'use client'

import type { Channel } from '@prisma/client'

import { deleteChannel } from '@/actions/channel/delete-channel'
import AbstractDeleteModal from '@/components/modals/abstract-modal/abstract-delete-modal'
import {
  useDeleteChannelClose,
  useDeleteChannelValue,
} from '@/context/delete-channel-context'

const DeleteChannelModal = ({ channel }: {
  channel: Channel,
}) => {
  const onDeleteModalClose = useDeleteChannelClose(channel.id)
  const isDeleteModalOpen = useDeleteChannelValue()

  return (
    <AbstractDeleteModal
      title="Delete Channel"
      deleteDescription={
        <>Are you sure you want to delete <strong>#{channel.name}</strong>? This action cannot be undone.</>
      }
      isDeleteModalOpen={isDeleteModalOpen[channel.id]}
      onDeleteModalClose={onDeleteModalClose}
      onSubmitAction={() => deleteChannel(channel)}
      redirectPath={`/channels/${channel.serverId}`}
    />
  )
}

export default DeleteChannelModal
