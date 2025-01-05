import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/authContextProvider'

const useLogin = () => {
    const [ loading, setloading ] = useState(false)
    const { setAuthUser } = useContext(AuthContext)

  const login = async ({username, password}) =>{
    try {
        setloading(true)
        const res = await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password}),
            credentials: 'include'
        })
        const data = await res.json()

        if(data.error) throw new Error(data.error)

        localStorage.setItem('chat-user', JSON.stringify(data))
        setAuthUser(data)
    } catch (error) {
        toast.error(error.message)
    } finally{
        setloading(true)
    }
  }

  return {
    login,
    loading
  }
}

export default useLogin