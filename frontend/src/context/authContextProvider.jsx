import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  const [ authUser, setAuthUser ] = useState(JSON.parse(localStorage.getItem('chat-user')) || null)
  return (
    <AuthContext.Provider value={{authUser, setAuthUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider