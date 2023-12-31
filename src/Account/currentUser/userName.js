import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../../App";
import { useDetails } from "../customState/Details/useDetail";

export function useUserName(){
  const {user} = useContext(Appcontext);
const {name} = useDetails();

const [userName,setUserName] = useState();

useEffect(()=>{
  if(user.displayName){
    setUserName(user.displayName)
  }
  else if (name){
    setUserName(name)
    
  }


},[user.displayName,name])
return [userName]
}