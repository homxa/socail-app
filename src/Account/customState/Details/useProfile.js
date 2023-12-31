import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/config";
import { useEffect, useState } from "react";
import { useDetails } from "./useDetail";

export function useProfile(userId){
const [pic, setPic] = useState()

const geet = async()=>{

  const imgLocation = collection(db,'profile');
const specificImg = query(imgLocation,where('userId','==',userId))
const getImg = await getDocs(specificImg)
const getten = getImg.docs.map((doc)=> ({...doc.data()}))
if(getten.length > 0){
  setPic(getten[0].image)

} 
} 
useEffect(()=>{
  geet()
},[])
return [pic]
}