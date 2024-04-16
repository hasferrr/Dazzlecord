'use client'

import { createNewChannel } from '@/actions/channel/create-new-channel'
import {
  useCreateChannelClose,
  useCreateChannelValue,
} from '@/context/modal-context'

import AbstractChannelModal from './abstract-channel-modal'

const ChannelModal = ({ serverId }: { serverId: string }) => {
  const onCreateChannelClose = useCreateChannelClose()
  const isCreateChannelOpen = useCreateChannelValue()

  return (
    <AbstractChannelModal
      title="Create Channel"
      onModalClose={onCreateChannelClose}
      isModalOpen={isCreateChannelOpen}
      onSubmitAction={(name, type) => createNewChannel(name, type, serverId)}
      currentChannel={undefined}
    />
  )
}

export default ChannelModal
