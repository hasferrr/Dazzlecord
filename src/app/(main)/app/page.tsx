import { redirect } from 'next/navigation'

const App = async () => (
  redirect('/channels/me')
)

export default App
