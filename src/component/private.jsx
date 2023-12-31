import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { Appcontext } from "../App";
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useUserName } from "../Account/currentUser/userName";
import { useDetails } from "../Account/customState/Details/useDetail";
import { getDownloadURL, ref,uploadBytes } from "firebase/storage";
import {v4} from 'uuid'
import { storage } from "../config/config";
import { db } from "../config/config";
import { collection,addDoc, query, where, getDocs } from "firebase/firestore";
import { useProfile } from "../Account/customState/Details/useProfile";
export default function Private() {
  const { user } = useContext(Appcontext);
  const [userName] = useUserName();
  const { photoURL } = useDetails();
  const [profile, setProfile] = useState(null)
const [uploadURL, setUpload] = useState('')
const [userProfile,setUserProfile] = useState(null)
const [pic] = useProfile(user.uid);
useEffect(()=>{
  setUserProfile(pic)
console.log(pic)

},[pic])

  const upLoadProfile = async()=>{
    try{
      const imgstoreRef = ref(storage, `image/${profile.name + v4()}`)
      const imgSent = await uploadBytes(imgstoreRef, profile);
      const imgURL = await getDownloadURL(imgSent.ref)
      //setting to fireStore 
      setUpload(imgURL)
const profileRef = collection(db,'profile')
const addedImg = await addDoc(profileRef, {
 image: imgURL,
 userId: user.uid  
});
//get image from fireStore url
const imgLocation = collection(db,'profile');
const specificImg = query(imgLocation,where('userId','==',user.uid))
const getImg = await getDocs(specificImg)
const getten = getImg.docs.map((doc)=> ({...doc.data()}))
setUserProfile(getten[0].image)
console.log(getten)


    } catch (err){
      console.log(err)
    }

  }

 





  if (user) {
    localStorage.setItem("users", JSON.stringify(user));
    return (
      <div>
        <div className="top">
          <div className="cover">
            <NavLink
              to="/Home"
              style={{ paddingLeft: "10px" }}
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/Post"
              style={{ paddingLeft: "10px" }}
              className={({ isActive }) => {
                return isActive ? "active" : "";
              }}
            >
              Post
            </NavLink>
          </div>
          <div className="user">
            {photoURL && (
              <img src={photoURL} alt="" />
            ) } 
            { !photoURL ?

userProfile ?  <img src={userProfile} />
:  (
  <div className="sett">
    <label htmlFor="inputFiles">+</label>
    <input
      type="file"
      id="inputFiles"
      onChange={(e) => setProfile(e.target.files[0])}
    />
    {profile && <button onClick={upLoadProfile}>upload</button>}
  </div>
): null

            
}
            <h4>{userName}</h4>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    );
  } else {
    return <Navigate />;
  }
}
