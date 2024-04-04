const ChatMessages = () => {
  return (
    <div className="overflow-hidden">
      {
        (() => {
          const chats = []
          let i = 0
          while (i < 100) {
            const chat = <div key={i}>Hello Chat! {i}</div>
            chats.push(chat)
            i++
          }
          return chats
        })()
      }
    </div>
  )
}

export default ChatMessages
