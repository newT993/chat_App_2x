import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/authContextProvider'
import toast from 'react-hot-toast'

const useLogout = () => {
    const [ loading, setLoading ] = useState(false)
    const { setAuthUser} = useContext(AuthContext)

  const logout = async()=>{
    try {
        setLoading(true)
        const res = await fetch('http://localhost:5000/api/auth/logout',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
        })
        const data = await res.json()
        if(data.error) throw new Error(data.error)
        localStorage.removeItem('chat-user')
        setAuthUser(null)   
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return { logout, loading }
}

export default useLogout