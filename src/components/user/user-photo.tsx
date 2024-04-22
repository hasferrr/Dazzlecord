import { ProfilePhoto } from '@/components/profile-photo'

const UserPhoto = () => {
  return (
    <div className="relative w-[92px] h-[92px]">
      <ProfilePhoto
        className="box-content border-[6px] border-solid border-server dark:border-server-dark"
        src="https://cdn.discordapp.com/avatars/500610677384151051/754397d21d5b6060610e8e33ccefc164.webp?size=80"
        username="hasferrr"
        width={80}
        height={80}
      />
      <div className="box-content absolute bg-green-500 rounded-full bottom-0 right-0 w-4 h-4
      border-[6px] border-solid border-server dark:border-server-dark" />
    </div>
  )
}

export default UserPhoto
