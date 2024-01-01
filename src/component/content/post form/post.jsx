import React, { useState } from 'react'
import { useSubmit } from '../../../Account/customState/useForm'
import * as yup from 'yup'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import { v4 } from 'uuid'
import {storage} from '../../../config/config'
import {collection, addDoc} from 'firebase/firestore'
import { db } from '../../../config/config'
import { useDetails } from '../../../Account/customState/Details/useDetail'
import { useUserName } from '../../../Account/currentUser/userName'
import { useImg } from '../../../Account/currentUser/useimg'
import { useNavigate } from 'react-router-dom'
export default function Post() {
  const nav = useNavigate()
  const [displayImg,setDisplayImg] = useState(null)
  const {userId} = useDetails()
  const [userName] = useUserName()
  const [image] = useImg()
const schema = yup.object().shape({
post: yup.string().required(),
postImg: yup.mixed().nullable().optional(),
})
  const [register,handleSubmit] =useSubmit(schema);

  const submitData = async(data)=>{
    try{
      if(data.postImg.length > 0){
        const imgLocation = data.postImg[0];
      
        const imgRef = ref(storage, `collection/${imgLocation.name + v4()} `);
        const getImg = await uploadBytes(imgRef,imgLocation)
        const getDowload = await getDownloadURL(getImg.ref)
        // upload to fireStore

        const postLoca = collection(db,'posts')
         await addDoc(postLoca,{
userId: userId,
img: image,
userName: userName,
postImg: getDowload,
postText: data.post,

        })
      }

      else{
        const postLoca = collection(db,'posts')
       await addDoc(postLoca,{
userId: userId,
userImg: image,
userName: userName,
postText: data.post,

        })

      }
nav('/Home')
    } catch(err){
      console.log(err)
    }

console.log(data)

  }
  const img =async(e)=>{
  try{
    const hamza = e
    const imgRef = ref(storage, `collection/${hamza.name + v4()} `);
    const getImg = await uploadBytes(imgRef,hamza)
    const getDowload = await getDownloadURL(getImg.ref)
    setDisplayImg(getDowload)
  } catch(err){
    console.log(err)
  }
  }
  console.log(displayImg)
  return (
    <div>
<form action="" onSubmit={handleSubmit(submitData)}>
<textarea name="" id="" cols="35" rows="5" placeholder='What is happening?' {...register('post')}></textarea>
<div>
  <label htmlFor="image"> +add image</label>
  <input type="file" id='image' {...register('postImg')}  accept="image/*,video/*" onChange={(e)=> (img(e.target.files[0]))}/>
</div>
<div className='imgs'>
  {displayImg && (<img src={displayImg}/>)}
</div>

 <input type="submit" value="Post" />
</form>


    </div>
  )
}
