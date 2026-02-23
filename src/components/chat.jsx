import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createsocketconnection } from "../utils/socket"
import { useSelector } from "react-redux"
import axios from "axios"
import Base_url from "../utils/BaseUrl"

const Chat = ()=>{
  const socket = createsocketconnection()
 const {targetuserId} = useParams()
const user = useSelector((store)=>store.user)
const [newMessage,setnewMessage] = useState("")
const [messages,setmessage]=useState([])
const FirstName= user?.FirstName
const userId= user?._id
const getprevchat=async()=>{
  if(!targetuserId) return
  try{
    let chat=await axios.get(Base_url+"/getchat/"+targetuserId,{
     withCredentials:true
 })
    let mesg=  chat.data.chat.messages
    console.log(mesg)

  const chatmessage = chat.data.chat.messages.map((msg)=>({
  FirstName:  msg.senderID?.FirstName,
  newMessage : msg.text,
    createdAt: msg.createdAt,
  }))
  setmessage(chatmessage)
  }catch(err){
    console.log(err)
  }
}
useEffect(()=>{
  getprevchat()
},[])
useEffect(()=>{
  if(!userId) return;
    // const socket = createsocketconnection();
    socket.emit("joinchat",{FirstName,userId,targetuserId})

    socket.on("newmessagerecieved",({FirstName,newMessage})=>{
 setmessage((messages)=> [...messages,{FirstName,newMessage}]) // will create array off object 
 setnewMessage("")
})

    return()=>{
        socket.disconnect()
    }
},[userId,targetuserId])



const sendMessage = ()=>{
  //  const socket = createsocketconnection();
   socket.emit("sendmessage",{FirstName,userId,targetuserId,newMessage})
}

 return(
   <div className="flex flex-col items-center">
  <div className="flex flex-col items-center border border-blue-700 w-[30vw]">
    
    <div className="h-[5vh] w-[30vw] border border-black">
      devtinder
    </div>

    {/* Chat Messages */}
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={"chat "+(user.FirstName ==msg.FirstName ? "chat-end" : "chat-start")}>
          <div className="chat-header">
            {msg.FirstName}
          </div>
          <div className="chat-bubble">
            {msg.newMessage}
            <small> {new Date(msg.createdAt).toLocaleTimeString()}</small>
          </div>
        </div>
      ))}
    </div>

    {/* Chat Input Section */}
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
          />
        </div>
      </div>

      <div className="flex">
        <input
          value={newMessage}
          onChange={(e) => setnewMessage(e.target.value)}
          className="border border-black"
          type="text"
          placeholder="hello world"
        />
        <button
          className="cursor-pointer border border-green-900"
          onClick={() => sendMessage()}
        >
          send
        </button>
      </div>
    </div>

  </div>
</div>
 )
}
export default Chat 