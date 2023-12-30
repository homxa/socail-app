import React, { useContext, useEffect, useState } from 'react'
import { useDetails } from '../../Account/customState/Details/useDetail'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/config'
import { Appcontext } from '../../App'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
export default function Create() {
const [name,email] = useDetails();
const {user} = useContext(Appcontext);
const [userName,setUserName] = useState();
const nav = useNavigate()

useEffect(()=>{
  if(user.displayName){
    setUserName(user.displayName)
  }
  else if (name){
    setUserName(name)
    
  }


},[user.displayName,name])
console.log(userName)
const logOut = async()=>{
  try{
    await signOut(auth)
  localStorage.removeItem('users')
  nav('/')
  } catch(err){
    console.log(err)
  }
    }
  return (
    <div>
      <h3>hello it working {userName == name? name: user.displayName}</h3>
<button onClick={logOut}>logOut</button>
    </div>
  )
}
