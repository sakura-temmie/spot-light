import {useState,useEffect} from "react";
import ChatMessage from "./ChatMessage"
import MyChatMessage from "./MyChatMessage"

const ChatMessageArea = ({ chatAPIData, myID }) => {
  return (
    <div className="w-full min-h-full border border-gray-200">
      <div className="w-full px-2 mb-2">
        {
          chatAPIData.map(chatData => (
            //送信者が自分と同じIDであれば、MyChatMessageコンポーネントを使用（違う場合はChatMessage）
            chatData.sender == myID ?
            <MyChatMessage
              key = {chatData.id}
              time= {new Date(chatData.created_at).toLocaleTimeString("ja-JP",{hour: '2-digit', minute:'2-digit'})}
              message= { chatData.body }
            />
            :
            <ChatMessage
              key = {chatData.id}
              time= {new Date(chatData.created_at).toLocaleTimeString("ja-JP",{hour: '2-digit', minute:'2-digit'})}
              message= { chatData.body }
            />
          ))
        }
        </div>
    </div>
  )
}

export default ChatMessageArea
