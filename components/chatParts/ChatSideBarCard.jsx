import Image from 'next/image';

const ChatSideBarCard = ({ name, imageIconPath, action }) => {
  return (
    <div className="w-full h-20 border border-gray-200 hover:border-blue-400 flex" onClick={action}>
      <div className="pl-2 py-2 w-1/4">
        <Image
          className="rounded-full object-fill"
          src={ imageIconPath }
          alt="icon"
          width={64}
          height={64}
        />
      </div>
      <div className="pl-4 py-6 w-3/4">
        <p className="text-lg">{ name }</p>
      </div>
    </div>
  )
}

export default ChatSideBarCard
