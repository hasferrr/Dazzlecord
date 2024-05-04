'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'

import type { User } from '@prisma/client'

import { usePreviewProfilesValue } from '@/context/settings/user/preview-profiles-context'
import { getMostDominantColorHexFromImgElement } from '@/helpers/color-helpers'
import { cn } from '@/lib/utils'

import UserInformation from './user-information'
import UserPhoto from './user-photo'

interface UserWrapperProps {
  children?: React.ReactNode
  user: User
  className?: string
  showButton?: boolean
  imageFromGCS?: boolean
}

const UserWrapper = ({
  children,
  user,
  className,
  showButton = false,
  imageFromGCS = true,
}: UserWrapperProps) => {
  const imgRef = useRef<HTMLImageElement>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const preview = usePreviewProfilesValue()

  const changeBackgroundDiv = () => {
    if (imgRef.current && divRef.current) {
      const hex = getMostDominantColorHexFromImgElement(imgRef.current)
      divRef.current.style.backgroundColor = hex ?? 'transparent'
    }
  }

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.backgroundColor = 'transparent'
    }
  }, [divRef])

  useLayoutEffect(() => {
    changeBackgroundDiv()
  }, [imgRef, preview.image])

  return (
    <div className={cn('relative w-[340px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark', className)}>
      <div
        ref={divRef}
        className="absolute rounded-t-lg h-[3.75rem] w-full"
      />
      <div className="p-4 m-0 space-y-3 rounded-lg shadow-md">
        <UserPhoto
          ref={imgRef}
          image={user.image}
          username={user.username}
          imageFromGCS={imageFromGCS}
          handleImageLoad={changeBackgroundDiv}
        />
        <UserInformation user={user} showButton={showButton}>
          {children}
        </UserInformation>
      </div>
    </div>
  )
}

export default UserWrapper
