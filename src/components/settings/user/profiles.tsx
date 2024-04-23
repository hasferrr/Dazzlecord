'use client'

import type { User } from '@prisma/client'

import UserWrapper from '@/components/user/user-wrapper'

import ProfilesForm from './profiles-form'
import TimeElapsed from './time-elapsed'

interface ProfilesProps {
  user: User
}

const Profiles = ({
  user,
}: ProfilesProps) => {
  return (
    <div>
      <h1 className="text-lg font-bold pb-5">Profiles</h1>
      <div className="flex flex-wrap-reverse gap-8">
        <div className="w-[315px]">
          <ProfilesForm />
        </div>
        <div className="space-y-2">
          <p className="uppercase font-bold text-xs">Preview</p>
          <UserWrapper user={user} hideButton>
            <div>
              <h2 className="font-bold uppercase">Customizing My Profile</h2>
              {/* TODO: add pencil image, style it, add Example button */}
              <div>Image</div>
              <p>User Profile</p>
              <TimeElapsed /> elapsed
            </div>
          </UserWrapper>
        </div>
      </div>
    </div>
  )
}

export default Profiles
