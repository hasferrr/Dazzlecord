import { forwardRef } from 'react'

import ProfilePhoto from '@/components/profile-photo'
import { getFileURLFromGCS } from '@/helpers/helpers'

interface UserPhotoProps {
  image?: string | null
  username: string
  imageFromGCS?: boolean
  handleImageLoad?: () => void
}

const UserPhoto = forwardRef<HTMLImageElement, UserPhotoProps>(({
  image,
  username,
  imageFromGCS = true,
  handleImageLoad,
}, ref) => (
  <div className="relative w-[92px] h-[92px]">
    <ProfilePhoto
      ref={ref}
      className="box-content border-[6px] border-solid border-server dark:border-server-dark"
      src={imageFromGCS ? (image ? getFileURLFromGCS(image) : image) : image}
      username={username}
      width={80}
      height={80}
      handleImageLoad={handleImageLoad}
    />
    <div className="box-content absolute bg-green-500 rounded-full bottom-0 right-0 w-4 h-4
      border-[6px] border-solid border-server dark:border-server-dark"
    />
  </div>
))

UserPhoto.displayName = 'UserPhoto'

export default UserPhoto
