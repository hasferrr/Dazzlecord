'use client'

import { useState, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { type Channel } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { editChannel } from '@/actions/channel/edit-channel'
import {
  useEditChannelClose,
  useEditChannelValue,
} from '@/context/edit-channel-context'
import { channelModalSchema } from '@/schemas/channel-modal-schema'

import AbstractChannelModal from './abstract-channel-modal'

const EditChannelModal = ({ channel }: { channel: Channel }) => {
  const [isPending, startTransition] = useTransition()
  const [radio, setRadio] = useState<string | undefined>(channel.type)
  const [channelName, setChannelName] = useState<string | undefined>(channel.name)

  const router = useRouter()

  const onEditChannelClose = useEditChannelClose(channel.id)
  const isEditChannelOpen = useEditChannelValue()

  const form = useForm<z.infer<typeof channelModalSchema>>({
    resolver: zodResolver(channelModalSchema),
    defaultValues: {
      name: channel.name,
      type: channel.type,
    },
  })

  const formReset = (name?: string, type?: string) => {
    form.reset()
    setRadio(type ?? channel.type)
    setChannelName(name ?? channel.name)
  }

  const handleOpenDialog = () => {
    onEditChannelClose()
    formReset()
  }

  const onSubmit = async (values: z.infer<typeof channelModalSchema>) => {
    startTransition(async () => {
      const res = await editChannel(values.name, values.type, channel)
      if (res.error) {
        console.log(res)
        return
      }
      console.log(res.success, res.data)
      onEditChannelClose()
      formReset(values.name, values.type)
      router.refresh()
    })
  }

  return (
    <AbstractChannelModal
      title="Edit Channel"
      form={form}
      isModalOpen={isEditChannelOpen[channel.id]}
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

export default EditChannelModal
