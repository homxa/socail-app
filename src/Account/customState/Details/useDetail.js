import { Appcontext } from "../../../App";
import { useContext, useEffect, useState } from "react";
import { getDocs ,collection,where,query } from "firebase/firestore";
import { db } from "../../../config/config";
export function useDetails(){
 const {user} = useContext(Appcontext)
 const [email,setEmail] = useState(user.email);
 const [userId,setUserId] = useState(user.uid)
 const [photoURL, setPhoto] = useState(user.photoURL)
 const [name,setEmailName] = useState(null)  


 // email settings
 const getName = async()=>{
  const nameRef = collection(db,'userName')
  const specificRef = query(nameRef, where('userId','==',userId))
  try{
    const getten = await getDocs(specificRef);
  const done =  getten.docs.map((doc)=> ({...doc.data(), id: doc.id}))
  setEmailName(done[0].userName)
  
  } catch(err){
  console.log(err)
  }
   }
useEffect(()=>{

 
getName()
},[])
// const name = useState( )
return {name,email,userId,photoURL}
}