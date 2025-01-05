import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
const useSendMsg = () => {
    const [ loading, setLoading ] = useState(false)
    const {messages, setMessage, selectedConversation}= useConversation()

  const sendMsg = async(msg)=>{
    setLoading(true)
    try {
        const res = await fetch(`http://localhost:5000/api/message/send/${selectedConversation._id}`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(msg)
        })
        const data = await res.json()

        if(data.error) throw new Error(data.error)

        setMessage([...messages, data])
    } catch (error) {
        toast.error(error.messages)
    } finally {
        setLoading(false)
    }
  }
  return { loading, sendMsg}
}

export default useSendMsg