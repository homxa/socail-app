import { collection, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../../config/config'
import { useDetails } from '../../Account/customState/Details/useDetail'
import { Appcontext } from '../../App'

export default function Home() {
  const {userId} = useDetails()
  console.log(userId)
const [post,setPost] = useState()
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
console.log(post)
  return (
    <div>

{post?.map((doc)=>{
  console.log(doc.userImg)
return(
<div className='j-s'>
<div className='user-d'>
  <img src={doc.userImg} alt="" />
  <p>@{doc.userName}</p>

</div>
<div className='posts'>
<p>{doc.postText}</p>
{doc.postImg?<img src={doc.postImg} alt="" />:''}
<p><button>&#x1F44D;</button></p>
</div>

</div>

)

})}

    </div>
  )
}
