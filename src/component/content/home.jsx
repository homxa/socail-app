import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config/config'
import { useDetails } from '../../Account/customState/Details/useDetail'
import { Appcontext } from '../../App'
import HomePost from './post form/homePost'

export default function Home() {

  const [post,setPost] = useState()
 

//geting doc
const getDoc = async()=>{
try{
  const docCollection = collection(db,'posts');
const getten = await getDocs(docCollection)
setPost(getten.docs.map((doc)=> {
 return  {...doc.data(),id: doc.id}
}))
} catch(err){
  console.log(err)
}

}

useEffect(()=>{
  getDoc()
},[])
  return (
    <div>

{post?.map((docs)=>{
 
return(
<div className='j-s'>
<HomePost doc={docs}/>

</div>

)

})}

    </div>
  )
}
