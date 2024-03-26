import { cn } from '@/lib/utils'

const ProfilePhoto = ({ username }: { username: string }) => {
  const initials = username.charAt(0).toUpperCase()
  const bgColorClasses = 'bg-black text-white dark:bg-white dark:text-black'

  return (
    <div className={cn('w-8 h-8 flex items-center justify-center rounded-full', bgColorClasses)}>
      <span className="text-xl font-bold select-none">{initials}</span>
    </div>
  )
}

export default ProfilePhoto
