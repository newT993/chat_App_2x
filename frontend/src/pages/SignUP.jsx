import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useSignup from '../hooks/useSignup'

const CheckBox = ({selectedGender, handleCheck}) =>{
    return(<>
        <div className='flex items-center justify-start w-full space-x-4'>
                    <label className={`font-bold flex items-center space-x-4 ${selectedGender==='male'?"selected": ""}`}>
                        <span>Male</span> 
                        <input className='checkbox border-slate-700' type='checkbox' onChange={()=>{handleCheck('male')}} checked={selectedGender==='male'}/>
                    </label>
                    <label className={`font-bold flex items-center space-x-4 ${selectedGender==='male'?"selected": ""}`}>
                        <span>Female</span> 
                        <input className='checkbox border-slate-700' type='checkbox' onChange={()=>{handleCheck('female')}} checked={selectedGender==='female'}/>
                    </label>
                </div>
    </>)
}

const SignUP = () => {
    const [ inputs, setInputs ] = useState({
        username: '',
        fullname: '',
        password: '',
        confirmPassword: '',
        gender:''
    })
    const { loading, signUp } = useSignup()

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value })
    }

    const handleCheck = (gender) =>{
        setInputs({...inputs,gender})
      }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUp(inputs)
    }
  return (
    <>
        <div className="w-[400px]  bg-gray-400 rounded-xl overflow- bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-accent flex 
        " >
        <form className='flex flex-col items-center text-accent w-full p-4 px-8 space-y-4' onSubmit={handleSubmit}>
            <h1 className='text-3xl font-extrabold'>Sign Up</h1>
            <div className='w-full'>
                <h3 className='font-semibold'>Username</h3>
                <input placeholder='Enter Username' className='p-2 px-4  w-full rounded-md outline-none' value={inputs.username} name='username' onChange={e=>handleChange(e)}/>
            </div>
            <div className='w-full'>
                <h3 className='font-semibold'>Full Name</h3>
                <input placeholder='Enter Full Name' className='p-2 px-4  w-full rounded-md outline-none' value={inputs.fullname} name='fullname' onChange={e=>handleChange(e)}/>
            </div>
            <div className='w-full'>
                <h3 className='font-semibold'>Password</h3>
                <input placeholder='Enter Password' className='p-2 px-4  w-full rounded-md outline-none' value={inputs.password} name='password' onChange={e=>handleChange(e)}/>
            </div>
            <div className='w-full'>
                <h3 className='font-semibold'>Confirm Password</h3>
                <input placeholder='Enter Confirm Password' className='p-2 px-4 outline-none w-full rounded-lg ' value={inputs.confirmPassword} name='confirmPassword' onChange={e=>handleChange(e)} />
            </div>
            <CheckBox handleCheck={handleCheck} selectedGender={inputs.gender}/>
            <Link to={'/signin'} className='text-start w-full text-sm underline '>Already have an account.</Link>
            <button disabled={loading} className='btn w-full btn-accent text-white font-bold' type='submit'>{loading?<span className='loading loading-spinner'></span>:"Sign Up"}</button>
        </form>
        </div>
    </>
  )
}

export default SignUP