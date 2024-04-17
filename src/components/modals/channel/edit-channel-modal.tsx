'use client'

import { type Channel } from '@prisma/client'

import { editChannel } from '@/actions/channel/edit-channel'
import {
  useEditChannelClose,
  useEditChannelValue,
} from '@/context/edit-channel-context'

import AbstractChannelModal from '../abstract-modal/abstract-channel-modal'

const EditChannelModal = ({ channel }: { channel: Channel }) => {
  const onEditChannelClose = useEditChannelClose(channel.id)
  const isEditChannelOpen = useEditChannelValue()

  return (
    <AbstractChannelModal
      title="Edit Channel"
      onModalClose={onEditChannelClose}
      isModalOpen={isEditChannelOpen[channel.id]}
      onSubmitAction={(name, type) => editChannel(name, type, channel)}
      currentChannel={channel}
    />
  )
}

export default EditChannelModal
