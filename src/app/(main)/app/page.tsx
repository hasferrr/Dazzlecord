import { redirect } from 'next/navigation'

const App = async () => {
  return (
    redirect('/channels/@me')
  )
}

export default App
