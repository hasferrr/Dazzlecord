import { Hash } from 'lucide-react'

const ChatWelcome = ({ name }: {
  name: string
}) => (
  <div className="space-y-2 mb-4 px-5 pt-4">
    <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700
      flex items-center justify-center"
    >
      <Hash className="h-12 w-12 text-white" />
    </div>
    <p className="text-xl md:text-3xl font-bold">
      {`Welcome to #${name}`!}
    </p>
    <p className="text-zinc-600 dark:text-zinc-400 text-sm">
      {`This is the start of the #${name} channel.`}
    </p>
  </div>
)

export default ChatWelcome
