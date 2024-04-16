'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createNewChannel } from '@/actions/channel/create-new-channel'
import {
  useCreateChannelClose,
  useCreateChannelValue,
} from '@/context/modal-context'
import { channelModalSchema } from '@/schemas/channel-modal-schema'

import AbstractChannelModal from './abstract-channel-modal'

const ChannelModal = ({ serverId }: { serverId: string }) => {
  const [isPending, startTransition] = useTransition()
  const [radio, setRadio] = useState<string | undefined>(undefined)
  const [channelName, setChannelName] = useState<string | undefined>(undefined)

  const router = useRouter()

  const onCreateChannelClose = useCreateChannelClose()
  const isCreateChannelOpen = useCreateChannelValue()

  const form = useForm<z.infer<typeof channelModalSchema>>({
    resolver: zodResolver(channelModalSchema),
    defaultValues: {
      name: undefined,
      type: undefined,
    },
  })

  const formReset = () => {
    form.reset()
    setRadio(undefined)
    setChannelName(undefined)
  }

  const handleOpenDialog = () => {
    onCreateChannelClose()
    formReset()
  }

  const onSubmit = async (values: z.infer<typeof channelModalSchema>) => {
    startTransition(async () => {
      const res = await createNewChannel(values.name, values.type, serverId)
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success, res.data)
      onCreateChannelClose()
      formReset()
      router.refresh()
    })
  }

  return (
    <AbstractChannelModal
      title="Create Channel"
      form={form}
      isModalOpen={isCreateChannelOpen}
      handleOpenDialog={handleOpenDialog}
      onSubmit={onSubmit}
      isPending={isPending}
      radio={radio}
      setRadio={setRadio}
      channelName={channelName}
      setChannelName={setChannelName}
    />
  )
}

export default ChannelModal
