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
    <div className="bg-[rgb(64,78,237)] w-svw h-full px-16 relative overflow-x-hidden">
      <Image
        className="absolute bottom-0 right-0 left-0 mx-auto z-10 select-none pointer-events-none"
        src="/wallpaper/decoration-wp.svg"
        alt=""
        height={626}
        width={2560}
      />
      <Image
        className="absolute bottom-0 right-[75%] z-10 select-none pointer-events-none"
        src="/wallpaper/discord-wp-l.svg"
        alt=""
        height={360 * 1.25}
        width={615 * 1.25}
      />
      <Image
        className="absolute bottom-0 left-[72%] z-10 select-none pointer-events-none"
        src="/wallpaper/discord-wp-r.svg"
        alt=""
        height={352}
        width={689}
      />
      <div className="h-20 flex justify-between items-center text-white">
        <button className="flex h-[34px] w-[138px] gap-2 items-center">
          <Image
            src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/653714c1f22aef3b6921d63d_636e0a6ca814282eca7172c6_icon_clyde_white_RGB.svg"
            alt=""
            height={34}
            width={34}
          />
          <p className="text-xl font-extrabold">Dazzlecord</p>
        </button>
        <div className="hidden lg:flex gap-8 font-semibold text-white">
          <button className="hover:underline">Download</button>
          <button className="hover:underline">Nitro</button>
          <button className="hover:underline">Discover</button>
          <button className="hover:underline">Safety</button>
          <button className="hover:underline">Support</button>
          <button className="hover:underline">Blog</button>
          <button className="hover:underline">Careers</button>
        </div>
        <form action={openDiscord} className="flex justify-center select-none z-20">
          <button
            className="bg-white text-black px-4 py-2
            rounded-[28px] transition-all text-[14px] font-bold
            hover:text-indigo-500 hover:shadow-xl"
            type="submit"
          >
            {session ? 'Open Dazzlecord' : 'Login'}
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-10 md:items-center sm:mx-5 md:mx-20 justify-center
      text-white h-[calc(100%-120px)] transition-all"
      >
        <p className="z-20 md:text-5xl text-4xl font-extrabold md:text-center text-left">
          IMAGINE A PLACE...
        </p>
        <p className="z-20 md:text-lg text-base max-w-[780px] md:text-center text-left">
          ...where you can belong to a school club, a gaming group, or a worldwide art community.
          Where just you and a handful of friends can spend time together.
          A place that makes it easy to talk every day and hang out more often.
        </p>
        <form
          className="flex flex-wrap gap-6 md:text-lg text-base select-none z-20"
          action={openDiscord}
        >
          <button
            className="bg-white text-black py-4 px-8
            rounded-[28px] transition-all
            hover:text-indigo-500 hover:shadow-xl"
            type="button"
          >
            <a
              className="flex gap-2"
              href="https://github.com/hasferrr/Dazzlecord"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download />
              <div>Download</div>
            </a>
          </button>
          <button
            className="bg-[var(--dark-navigation)] py-4 px-8
            rounded-[28px] transition-all
            hover:bg-zinc-800 hover:shadow-xl"
            type="submit"
          >
            Open Dazzlecord in your Browser
          </button>
        </form>
      </div>
    </div>
  )
}

export default Home
