import { forwardRef } from 'react'

import ProfilePhoto from '@/components/profile-photo'
import { getFileURLFromGCS } from '@/helpers/helpers'

interface UserPhotoProps {
  image?: string | null
  username: string
  imageFromGCS?: boolean
  handleImageLoad?: () => void
  size?: number
  status?: boolean
}

const UserPhoto = forwardRef<HTMLImageElement, UserPhotoProps>(({
  image,
  username,
  imageFromGCS = true,
  handleImageLoad,
  size = 92,
  status = true,
}, ref) => {
  const borderSize = (6 / 92) * size < 2
    ? 2
    : (6 / 92) * size
  const photoSize = (80 / 92) * size
  const statusSize = (16 / 92) * size

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <ProfilePhoto
        ref={ref}
        className="box-content border-solid border-server dark:border-server-dark"
        style={{ borderWidth: borderSize }}
        src={imageFromGCS ? (image ? getFileURLFromGCS(image) : image) : image}
        username={username}
        width={photoSize}
        height={photoSize}
        handleImageLoad={handleImageLoad}
      />
      {status && (
        <div
          className="box-content absolute bg-green-500 rounded-full bottom-0 right-0
          border-solid border-server dark:border-server-dark"
          style={{ borderWidth: borderSize, width: statusSize, height: statusSize }}
        />
      )}
    </div>
  )
})

UserPhoto.displayName = 'UserPhoto'

export default UserPhoto
