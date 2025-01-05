import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversation = () => {
  const [ loading, setLoading ] = useState(false)
  const [ conversations, setConversations ] = useState([])

  useEffect(()=>{
    const getConver = async () =>{
      setLoading(true)
      try {
        const res = await fetch('http://localhost:5000/api/users',{
          method:'GET',
          credentials: 'include'
        })
        const data = await res.json()

        if(data.error) throw new Error(data.error)

        setConversations(data) 
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    getConver()
  },[])

  return { loading, conversations}
}

export default useGetConversation