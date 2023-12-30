import React from 'react'
import {addDoc,collection} from 'firebase/firestore'
import { db } from '../config/config'
import { Appcontext } from "../App";
import { useContext} from "react";

import { useSchema } from './customState/useSchema'
import { useSubmit } from './customState/useForm';
import { auth } from '../config/config';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom';
export default function SignUp() {
  const [schema2] = useSchema();
const [register,handleSubmit] = useSubmit(schema2)
const {user} = useContext(Appcontext)
console.log(user?.uid)
const nav = useNavigate()

// if(name){
//   console.log(name)
// }
const nameRef = collection(db,'userName')
 
  const submitData = async(data)=>{

    try{
     const newUser = await createUserWithEmailAndPassword(auth, data.email, data.password)
     const current = newUser.user
     if(!current.displayName){
 await addDoc(nameRef,{
        userName: data.userName,
        userId: current.uid

       })
       nav('/Post')

     }
    
    } catch (err){
console.log(err)
    }
  }
  return (
    <div>

<form onSubmit={handleSubmit(submitData)}>

<div><input type="email" placeholder='email' {...register('email')}/></div>
<div><input type="text" placeholder='user name' {...register('userName')}/></div>

 <div> <input type="password"  placeholder='password' {...register('password')}/></div>
 <div> <input type="password"  placeholder='re-Enter Password' {...register('confarmPassword')}/></div>

 <input type="submit" value="Sign UP" />
</form>
<h3>Already  have account Login  now <Link to='/'>signUp</Link></h3>

    </div>
  )

  
}
