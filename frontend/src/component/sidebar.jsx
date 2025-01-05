import React, { useContext, useState } from 'react'
import useLogout from '../hooks/useLogout'
import useGetConversation from '../hooks/useGetConversation'
import { getRandomEmoji } from '../utils/getEmoji'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { SocketContext } from '../context/SocketContextProvider'

const LogoutBtn = () =>{
  const { loading, logout} = useLogout(useContext)
  return(<>
    <div className='h-full p-2 flex justify-start'>
              {loading? <span className='loating loading-spinner'></span> : 
                <div className='w-12 h-12 rounded-full bg-slate-900 font-bold text-800 text-white flex justify-center items-center ' onClick={logout}>Out</div>
              }
    </div>
  </>)
}

const ProfileList = ({con, emoji}) => {
  const { selectedConversation, setSelectedConversation} = useConversation()
  const isSelected = selectedConversation?._id === con._id
  const {onlineUser} = useContext(SocketContext)
  const isOnline = onlineUser.includes(con._id) 
  console.log(isOnline)

  return (<>
    <div onClick={()=>setSelectedConversation(con)}
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?'bg-sky-400':''}`}>
				<div className={`avatar ${isOnline?'online':''}`}>
					<div className='w-12 rounded-full'>
						<img src={con.profilePic} alt='user avatar' />
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{con.fullname}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>
  </>)
}

const SearchInput = () =>{
  const [search, setSearch] = useState('')
  const {  setSelectedConversation}=useConversation()
  const {conversations}= useGetConversation()
  const handleSubmit = e =>{
    e.preventDefault()
    if(!search) return
    if(search.length<3) return toast.error('Search must be at least 3 characters')

    const conv = conversations.find(c=>c.fullname.toLowerCase().includes(search.toLowerCase()))
    if(conv){
      setSelectedConversation(conv)
      setSearch('')
    } else toast.error('User not found')
  }
  return(<>
    <form className="flex justify-between w-full p-2" onSubmit={handleSubmit}>
              <input className='w-[80%] p-2 px-4 rounded-2xl font-bold text-lg outline-none' placeholder='Search...' value={search} onChange={(e)=>setSearch(e.target.value)}/>
              <button type='submit' className='w-12 h-12 rounded-full bg-accent font-bold text-800 text-white '>S</button>
            </form>
  </>)
}

const Sidebar = () => {
  const { conversations, loading } = useGetConversation()
  return (
    <>
        <div className=' w-1/3'>
    
            <SearchInput/>
            
            <div className='  p-2'>{conversations.map(con=><ProfileList 
              key={con._id} con={con} emoji={getRandomEmoji()}
            />)}
            {loading?<span className='loading loading-spinner'></span>: null}
            </div>
            
            <LogoutBtn/>
        </div>
    </>
  )
}

export default Sidebar