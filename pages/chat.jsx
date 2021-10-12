import { useState, useEffect } from 'react'
import Cookie from "universal-cookie";
import Layout from "../components/layoutParts/Layout"
import ChatSideBar from "../components/chatParts/ChatSideBar"
import ChatMessageArea from "../components/chatParts/ChatMessageArea"
import MessageSendBox from "../components/chatParts/MessageSendBox"


export default function chat() {

  //サイドバーに表示するチャットしたことあるユーザー一覧
  const [chatUser, setChatUser] = useState([])
  const [myID, setMyID] = useState("")
  const [reciverID, setReciverID] = useState("")
  const [senderName , setSenderName] = useState("")
  const [chatData, setChatData] = useState([])
  const [newMessage, setNewMessage] = useState([])

  //初回ロード時に起動
  useEffect(() => {
    getMyUserData()
    getChatUser()
  }, [])

  //reciverIDの値が変わる度にチャットデータを受信
  useEffect(() => {
    getChatData()
  },[reciverID])

  useEffect(() => {
    const data = chatData
    data.push(newMessage)
    setChatData(data)
  }, [newMessage])

  //自分のユーザー情報を取得する
  const getMyUserData = async () => {
     //アクセストークンの取得
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}get_user`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      }).then(res => {
          if (res.status === 400) {
            throw "authentication failed"
          } else if (res.ok) {
            return res.json()
          }
      }).then(data => {
        setMyID(data.user.id)
      })
    } catch (err) {
      console.log(err);
      return
    }
  }

  //チャットのやり取りしたことがある人を取得
  const getChatUser = async () => {
    //アクセストークンの取得
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}messages/users`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
      }).then(res => {
          if (res.status === 400) {
            throw "authentication failed"
          } else if (res.ok) {
            return res.json()
          }
      }).then(data => {
        setChatUser(data.data)
        //初回起動時にreciverIDをセット
        setReciverID(data.data[0].id)
      })
    } catch (err) {
      console.log(err);
      return
    }
  }

  //chatデータを取得
  const getChatData = async () => {
    //アクセストークンの取得
    const accessToken = await localStorage.getItem("access_token");
    try {
      await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}messages`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: accessToken,
          receiver: reciverID,
          sender: myID
        })
      }).then(res => {
          if (res.status === 400) {
            throw "authentication failed"
          } else if (res.ok) {
            return res.json()
          }
      }).then(data => {
        setChatData(data.data.reverse().filter(data => data.body !== ""))
        setSenderName(chatUser.filter(user => user.id == reciverID)[0].name)
      })
    } catch (err) {
      console.log(err)
      return
    }
  }


  //chatデータを送る
  const sendChatData = async (message) => {
    if (message != "" && reciverID != "") {
      //アクセストークンの取得
      // console.log(`myID:${myID}`)
      // console.log(`reciverID:${reciverID}`)
      const accessToken = await localStorage.getItem("access_token");
      try {
        await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}messages/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: accessToken,
            message : message,
            sender: myID,
            receiver : reciverID
          })
        }).then(res => {
            if (res.status === 400) {
              throw "authentication failed"
            } else if (res.ok) {
              return res.json()
            }
        }).then(data => {
          setNewMessage(data.data)
        })
      } catch (err) {
        console.log(err);
        return
      }
    } else {
      alert("メッセージを入力または送信者を選択して下さい")
    }
  }

  const addChatData = (Message) => {
    console.log(Message)
    chatData.push(Message)
    console.log(chatData)
  }

  const chatAreaStyle = {
    height : "80vh"
  }
  return (
    <Layout title="Chat">
      <div style={chatAreaStyle} className="w-4/5 mx-auto flex">
        <div className="w-1/3 h-full overflow-scroll">
          <ChatSideBar
            users={chatUser}
            action={setReciverID}
          />
        </div>
        <div className="w-full">
          <div className="w-full text-lg bg-white mb-2">
            { senderName }
          </div>
          <div className="h-4/5 overflow-scroll">
            <ChatMessageArea
              chatAPIData = { chatData }
              myID = { myID }
            />
          </div>
          <MessageSendBox
            action = { sendChatData }
          />
        </div>
      </div>
    </Layout>
  )
}
