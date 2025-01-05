import React from 'react'
import Sidebar from '../component/sidebar.jsx'
import MessageContainer from '../component/messageContainer.jsx'

const Home = () => {
  return (
    <div className='w-[900px] h-[550px] bg-gray-400 rounded-xl overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-accent flex h-[500px]
'>
        <Sidebar/>
        <MessageContainer/>
    </div>
  )
}

export default Home