import React, { useContext, useEffect, useRef, useState } from 'react'
import useConversation from '../zustand/useConversation'
import useSendMsg from '../hooks/useSendMsg'
import useGetMsg from '../hooks/useGetMsg'
import MessageSkeleton from './msgSkeleton'
import { AuthContext } from '../context/authContextProvider'
import { extractTime } from '../utils/extractTime'
import useListenMessages from '../hooks/useListenMessages'

const NoChatCon = () =>{
  const { authUser}= useContext(AuthContext)
  return(<>
    <div className='bg-accent w-full h-full flex justify-center items-center text-white flex-col mt-2 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 rounded-xl p-2'>
      <h1 className='text-3xl font-extrabold '>Hello {authUser.fullname}</h1>
      <p className='font-semibold '>Start a chat now</p>
    </div>
  </>)
}

const MsgInput = () =>{
  const { loading, sendMsg} = useSendMsg()
  const [ msg, setMsg ] = useState('')

  const handleSubmit = async(e) =>{
    e.preventDefault()
    if(!msg) return
    await sendMsg({message:msg})
    setMsg('')
  }
  return(<>
    <form className=' py-1 flex p-2 items-center relative' onSubmit={handleSubmit}>
                  <input className='w-full bg-slate-700 py-2 mt-1 outline-none px-4 rounded-lg text-gray-200 pr-12' placeholder='Send Message' value={msg} onChange={(e)=>setMsg(e.target.value)}/>
                  <button className='bg-slate-100 rounded-r-lg absolute w-10 h-10 top-2 right-2' type='submit'>{loading?<span className='loading loading-spinner'></span>:'Send'}</button>
    </form>
  </>)
}

const Msg = ({msg}) =>{
  const {authUser}=useContext(AuthContext)
  const {selectedConversation}= useConversation()
  const fromMe = authUser._id == msg.senderId
  const chatClassName = fromMe ? 'chat-end' : 'chat-start'
  const profile = fromMe ? authUser.profilePic : selectedConversation?.profilePic
  const bubbleColor = fromMe ? 'bg-blue-500' :''
  const formattedTime = extractTime(msg.createdAt)
  const shakeClass = msg.shouldSh ? 'shake' : ''

  return(<>
    <div className={`chat ${chatClassName}`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component' src={profile} />
				</div>
			</div>
			<div className={`chat-bubble text-white ${bubbleColor} ${shakeClass}  pb-2`}>{msg.message}</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
		</div>
  </>)
}

const Messages = () => {
  const {loading, messages}= useGetMsg()
  const lastMsg = useRef()
  useListenMessages()
  // useEffect(() => {
	// 	setTimeout(() => {
	// 		lastMsg.current?.scrollIntoView({ behavior: "smooth" });
	// 	}, 100);
	// }, [messages]);

  return(<>
    {!loading && messages.length>0 && messages.map(msg=><div key={msg._id} ref={lastMsg}>
      <Msg msg={msg} key={msg._id}/>
    </div>)}
    {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
    {!loading && messages.length ==0 && <p className='text-center'>Send a message to start conversation.</p>}
  </>)
}

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation}=useConversation()
  useEffect(()=>{
    // clean up function (unamount)
    return ()=>setSelectedConversation(null)
  },[setSelectedConversation])
  return (
    <>
        <div className='w-full border-l border-accent'>
              {!selectedConversation?<>
                <NoChatCon />
              </>:<>
                <div className='flex font-bold p-2 px-4 bg-slate-600'>
                  <span className='text-gray-400'>To</span>
                  <h2 className='text-900 ms-2  text-lg '>{selectedConversation.fullname}</h2>
                </div>
                <div className='  p-4 py-2 flex-1 overflow-y-auto h-[80%]'>
                    <Messages/>
                </div>
                <MsgInput/>
              </>}
        </div>
    </>
  )
}

export default MessageContainer