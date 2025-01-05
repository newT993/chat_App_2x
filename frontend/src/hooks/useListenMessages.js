import React, { useContext, useEffect } from 'react'
import { SocketContext } from '../context/SocketContextProvider'
import useConversation from '../zustand/useConversation'
import notiSound from '../assets/notification.mp3'

const useListenMessages = () => {
  const {socket}= useContext(SocketContext)
  const { messages, setMessage}=useConversation()
  useEffect(()=>{
    socket?.on('newMessage',(newMsg)=>{
        newMsg.shouldSh = true
        const sound = new Audio(notiSound)
        sound.play()
        setMessage([...messages, newMsg])
    })

    return ()=>socket?.off('newMessage')
  },[socket, messages, setMessage])
}

export default useListenMessages