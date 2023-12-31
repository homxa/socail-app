import React, { useContext, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../config/config'
import { signOut } from 'firebase/auth'
import { useNavigate } from "react-router-dom";

import { useUserName } from '../../Account/currentUser/userName'
export default function Create() {
const [userName] = useUserName()
const nav = useNavigate()

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
      <h3>hello it working {userName}</h3>
<button onClick={logOut}>logOut</button>
    </div>
  )
}
