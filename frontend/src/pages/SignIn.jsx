import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'

const SignIn = () => {
  const [ inputs, setInputs ] = useState({
    username: '',
    password: ''
  })
  const { loading, login } = useLogin()

  const handleChange = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(inputs)
  }
  return (
    <>
        <div className="w-[300px]  bg-gray-400 rounded-xl overflow- bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100 flex text-accent border-accent
        " >
        <form className='flex flex-col items-center text-accent w-full p-4 px-8 space-y-4' onSubmit={handleSubmit}>
            <h1 className='text-3xl font-extrabold '>Sign In</h1>
            <div className='w-full'>
              <h3 className='font-semibold text-accent'>Username</h3>
              <input placeholder='Enter Username' className='p-2 px-4  w-full rounded-md outline-none' name='username' value={inputs.username} onChange={handleChange}/>
            </div>
            <div className='w-full'>
              <h3 className='font-semibold '>Password</h3>
              <input placeholder='Enter Password' className='p-2 px-4 outline-none w-full rounded-lg ' name='password' value={inputs.password} onChange={handleChange}/>
            </div>
            <Link to={'/signup'} className='text-start w-full text-sm  underline '>Don't have an account?</Link>
            <button disabled={loading} className='btn w-full btn-accent text-white font-bold' type='submit'>{loading?<span className='loading loading-spinner'></span>:"Sign In"}</button>
        </form>
        </div>
    </>
  )
}

export default SignIn