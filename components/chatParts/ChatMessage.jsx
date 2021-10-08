const ChatMessage = ({ time,message }) => {
  return (
    <div className="flex w-full mb-1">
      <div className="w-2/5 p-2 bg-gray-300 rounded-lg">
        {  message  }
      </div>
      <p className="ml-2 mt-auto mb-0">
        {time}
      </p>
    </div>
  )
}

export default ChatMessage
