import React, { useContext } from 'react'
import SignIn from './pages/SignIn.jsx'
import SignUP from './pages/SignUP.jsx'
import Home from './pages/home.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContext } from './context/authContextProvider.jsx'

const App = () => {
  const { authUser } = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route path='/signin' element={authUser ? <Navigate to={'/'}/> : <SignIn />} />
        <Route path='/signup' element={authUser ? <Navigate to={'/'}/> : <SignUP />} />
        <Route exact path='/' element={authUser ? <Home/>: <Navigate to={'/signin'}/> } />
      </Routes>
      <Toaster/>
    </>
  )
}

export default App