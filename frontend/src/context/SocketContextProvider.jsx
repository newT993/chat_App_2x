import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './authContextProvider'
import io from 'socket.io-client'

export const SocketContext = createContext()

const SocketContextProvider = ({children}) => {
    const [ socket, setSocket ] = useState(null)
    const [ onlineUser, setOnlineUser] = useState([])
    const { authUser } = useContext(AuthContext)

    useEffect(() => {
		if (authUser) {
			const socket = io("http://localhost:5000",{
				query:{
					userId: authUser._id
				}
			});

			setSocket(socket);
			socket.on('getOnlineUsers', (users) =>{
				setOnlineUser(users)
			})

			return () => socket.close();
		} else {
			if (socket) {
				socket.close();
				setSocket(null);
			}
		}
	}, [authUser]);
	console.log(onlineUser)
  return (
    <SocketContext.Provider value={{socket, onlineUser}}>
        {children}
    </SocketContext.Provider>
  )
}

export default SocketContextProvider