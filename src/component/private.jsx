import React from 'react'
import { useContext } from 'react'
import { Appcontext } from '../App'
import { Navigate, Outlet } from 'react-router-dom';
export default function Private() {
  const {user} = useContext(Appcontext);
  console.log(user?.uid)
  if(user){
    localStorage.setItem('users',JSON.stringify(user))
    return <Outlet/>
  }
 else{
return <Navigate/>
 }
  
}
