import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/authContextProvider'

const useSignup = () => {
    const [loading, setLoading] = useState(false)
    const { authUser, setAuthUser } = useContext(AuthContext)

  const signUp = async ({username, fullname, password, confirmPassword, gender}) => {
    const success = handleInputError({username, password, confirmPassword, gender, fullname})
    if(!success) return

    setLoading(true)
    try {
        const res = await fetch('http://localhost:5000/api/auth/signup',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, fullname, password, confirmPassword, gender})
        })
        const data = await res.json()

        if (!res.ok) {
            // Log the response status and data for debugging
            console.error('Error:', res.status, data);
            toast.error(data.message || 'Signup failed');
            return;
          }

          localStorage.setItem('chat-user', JSON.stringify(data));
          setAuthUser(data)
    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    } finally{
        setLoading(false)
    }
  }

  return {
    signUp,
    loading
  }
}

export default useSignup

const handleInputError = ({username, fullname, password, confirmPassword, gender}) => {
    if(!username || !password || !confirmPassword || !gender || !fullname) {
        toast.error('All fields are required')
        return false
    }

    return true
}