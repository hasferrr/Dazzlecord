import { auth, signOut } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import { ModeToggle } from '@/components/mode-toggle'

const App = async () => {
  const session = await auth()

  return (
    <div>
      <ChatHeader
        name="App"
        serverId=""
        channelType="TEXT"
      />
      {JSON.stringify(session)}
      <form action={async () => {
        'use server'
        await signOut()
      }}>
        <button type="submit">Sign out</button>
      </form>
      <ModeToggle />
    </div>
  )
}

export default App
