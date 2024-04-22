import { Separator } from '@/components/ui/separator'

const UserInformation = () => {
  return (
    <div className="text-[13px] w-[308px] p-3 bg-text dark:bg-text-dark rounded-lg space-y-3">
      <div>
        <p className="text-base font-bold">name</p>
        <p>username</p>
        <p>status</p>
      </div>
      <Separator />
      <div>
        <h2 className="font-bold uppercase">About me</h2>
        <p>description</p>
      </div>
      <div>
        <h2 className="font-bold uppercase">Deezcord Member since</h2>
        <p>Oct 13, 2018</p>
      </div>
      <Separator />
      <div>Online</div>
      <Separator />
      <div>Sign Out</div>
    </div>
  )
}

export default UserInformation
