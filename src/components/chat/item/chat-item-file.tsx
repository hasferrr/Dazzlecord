import { File } from 'lucide-react'
import Image from 'next/image'

import { getFileURLFromGCS } from '@/helpers/helpers'
import { ACCEPTED_IMAGE_TYPES, sizeInMB } from '@/schemas/validator/files-validator'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

interface ChatItemFileProps {
  message: MessageWithUser | DirectMessageWithUser
}

const ChatItemFile = ({
  message,
}: ChatItemFileProps) => {
  const isImage = message.fileType
    ? ACCEPTED_IMAGE_TYPES.includes(message.fileType)
    : false
  const fileSize = message.fileSize ? sizeInMB(message.fileSize) : ''
  const fileName = message.fileName
    ? message.fileName.slice(message.fileName.search('_') + 1)
    : ''

  return message.fileName && (
    isImage
      ? (
        <a
          href={getFileURLFromGCS(message.fileName)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center max-h-48 w-fit mt-2 overflow-hidden rounded-md"
        >
          <Image
            src={getFileURLFromGCS(message.fileName)}
            alt=""
            height={512}
            width={512}
            className="object-cover h-48 w-fit"
          />
        </a>
      ) : (
        <a
          href={getFileURLFromGCS(message.fileName)}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center max-h-48 w-fit mt-2 overflow-hidden rounded-md"
        >
          <div className="h-20 w-[416px] flex border p-4 m-1 gap-4
          bg-server dark:bg-server-dark rounded-lg hover:shadow-md"
          >
            <div className="h-10 w-10">
              <File size={40} />
            </div>
            <div className="w-[300px]">
              <p className="truncate hover:underline">{fileName}</p>
              <p>
                {fileSize}
                {' '}
                MB
              </p>
            </div>
          </div>
        </a>
      )
  )
}

export default ChatItemFile
