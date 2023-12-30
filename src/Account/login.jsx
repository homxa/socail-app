import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import { useSchema } from './customState/useSchema'
import { useSubmit } from './customState/useForm'
import { auth } from '../config/config'
import { provider } from '../config/config'
import {signInWithEmailAndPassword,signOut,signInWithPopup} from 'firebase/auth'
import { Appcontext } from '../App'
import { Link, useNavigate } from 'react-router-dom'
export default function Login() {
const {user} = useContext(Appcontext)
console.log(auth.currentUser?.email)
const nav = useNavigate()

  const [schema] = useSchema()
  const [register,handleSubmit] = useSubmit(schema)
  const submitData = async(data)=>{
    try{
      await signInWithEmailAndPassword(auth, data.email, data.password)
     nav('Post')
      
    } catch(err){
console.log(err)
    }
  
  }
 
  const signIN = async()=>{
    try{
      await signInWithPopup(auth,provider)
     nav('Post')
      

    } catch(err){
      console.log(err)
    }
  }
  return (
    <div>

<form onSubmit={handleSubmit(submitData)}>

<div><input type="email" placeholder='email' {...register('email')}/></div>
 <div> <input type="password"  placeholder='password' {...register('password')}/></div>
 <input type="submit" value="Longin" />
</form>
<h3>dont have account create now <Link to='signUp'>signUp</Link></h3>
<button onClick={signIN}>SingIn with GOOGLE</button>
    </div>
  )
}
