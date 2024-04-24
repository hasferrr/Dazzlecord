'use client'

import type { User } from '@prisma/client'

import UserWrapper from '@/components/user/user-wrapper'
import { usePreviewProfilesValue } from '@/context/settings/user/preview-profiles-context'

import ProfilesForm from './profiles-form'
import TimeElapsed from './time-elapsed'

interface ProfilesProps {
  user: User
}

const Profiles = ({
  user,
}: ProfilesProps) => {
  const previewProfilesValue = usePreviewProfilesValue()

  const previewUser = {
    ...user,
    name: previewProfilesValue.name,
    about: previewProfilesValue.about,
    image: previewProfilesValue.image ?? user.image,
  }

  return (
    <div>
      <h1 className="text-lg font-bold pb-5">Profiles</h1>
      <div className="flex flex-wrap-reverse gap-8">
        <div className="w-[315px]">
          <ProfilesForm user={user} />
        </div>
        <div className="space-y-2">
          <p className="uppercase font-bold text-xs">Preview</p>
          <UserWrapper user={previewUser} hideButton imageFromGCS={!previewUser.image?.startsWith('blob')}>
            <div>
              <h2 className="font-bold uppercase">Customizing My Profile</h2>
              {/* TODO: add pencil image, style it, add Example button */}
              <div>Image</div>
              <p>User Profile</p>
              <TimeElapsed />
              {' '}
              elapsed
            </div>
          </UserWrapper>
        </div>
      </div>
    </div>
  )
}

export default Profiles
