import ChatSideBarCard from "./ChatSideBarCard";

const ChatSideBar = ({ users, action }) => {
  const imgPath = "https://theater-check.s3.ap-northeast-1.amazonaws.com/"
  return (
    <div className="w-full">
      {users.map?.(user => (
        <ChatSideBarCard
          key={user.id}
          action= {() => action(user.id)}
          imageIconPath={imgPath + user.main_photo}
          name = { user.name }
        />
       ))
      }
    </div >
  )
}

export default ChatSideBar
