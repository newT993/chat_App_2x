import React, { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useGetMsg = () => {
  const [ loading, setLoading ] = useState(false)
  const { messages, setMessage, selectedConversation } = useConversation()
  
  useEffect(()=>{
    const getMsg = async()=>{
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/api/message/get/${selectedConversation?._id}`,{
          method: 'GET',
          credentials: 'include'
        })
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        setMessage(data)
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }

    if(selectedConversation._id) getMsg()
  },[selectedConversation._id, setMessage])

  return { messages, loading}
}

export default useGetMsg