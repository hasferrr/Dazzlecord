import { Download } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'

const Home = async () => {
  const session = await auth()

  const openDiscord = async () => {
    'use server'
    redirect(session ? '/app' : '/login')
  }

  return (
    <div className="bg-[rgb(64,78,237)] w-svw h-full px-16">
      <div className="h-20 flex justify-between items-center">
        <a href="#" className="flex h-[34px] w-[34px] gap-2 items-center">
          <Image
            src="/deezcord_tr_white.png"
            alt=""
            height={34}
            width={34}
          />
          <p className="text-xl font-extrabold">Deezcord</p>
        </a>
        <form action={openDiscord}>
          <button
            className="bg-white text-black px-4 py-2
            rounded-[28px] transition-all text-[14px] font-bold
            hover:text-indigo-500 hover:shadow-xl"
            type="submit"
          >
            {session ? 'Open Deezcord' : 'Login'}
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-10 md:items-center justify-center
      text-white h-[calc(100%-120px)] transition-all">
        <p className="md:text-5xl text-4xl font-extrabold md:text-center text-left">
          IMAGINE A PLACE...
        </p>
        <p className="md:text-lg text-base max-w-[780px] md:text-center text-left">
          ...where you can belong to a school club, a gaming group, or a worldwide art community.
          Where just you and a handful of friends can spend time together.
          A place that makes it easy to talk every day and hang out more often.
        </p>
        <form
          className="flex flex-wrap gap-6 md:text-lg text-base"
          action={openDiscord}
        >
          <button
            className="bg-white text-black py-4 px-8
            rounded-[28px] transition-all cursor-not-allowed
            hover:text-indigo-500 hover:shadow-xl"
            type="button"
          >
            <div className="flex gap-2">
              <Download />
              <div>Download</div>
            </div>
          </button>
          <button
            className="bg-[var(--dark-navigation)] py-4 px-8
            rounded-[28px] transition-all
            hover:bg-zinc-800 hover:shadow-xl"
            type="submit"
          >
            Open Deezcord in your Browser
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
