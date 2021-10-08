const MyChatMessage = ({ time,message }) => {
  return (
    <div className="w-full flex justify-end mb-1">
      <p className="mr-2 mt-auto mb-0">
        {time}
      </p>
      <div className="w-2/5 p-2 bg-green-300 rounded-lg">
        {  message  }
      </div>
    </div>
  )
}

export default MyChatMessage
