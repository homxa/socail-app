import {
  deleteDoc,
  doc as docLocation,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../config/config";
import { useDetails } from "../../../Account/customState/Details/useDetail";
export default function HomePost({ doc }) {
  const { userId } = useDetails();
  const [likes, setLikes] = useState();

  //adding like

  const likedPost = async () => {
    try {
      const likeCollec = collection(db, "postLikes");
      const current = await addDoc(likeCollec, {
        userId: userId,
        postId: doc.id,
      });
      setLikes((prev) => (prev ? [...prev, { userId: userId }] : [{ prev }]));
    } catch (err) {
      console.log(err);
    }
  };

  //Remove Like
  const removeLike = async () => {
   try{
     // then user query to spcified the doc to delete
     const likeCollec = collection(db, "postLikes");

     const likeDoc = query(
       likeCollec,
       where("postId", "==", doc.id),
       where("userId", "==", userId)
     );
 //then get the doc id 
 const gotten = await getDocs(likeDoc)
 
     //doc is used to specified element to be removed
     const likeToDelete = docLocation(db, "postLikes",gotten.docs[0].id);
     await deleteDoc(likeToDelete)
     const updatated  = likes.filter((post)=> (post.userId !== userId))
     setLikes(updatated)
   } catch(err){
    console.error(err)
   }
  };

  /// getting the like doc

  const getLikes = async () => {
    try {
      const likeCollec = collection(db, "postLikes");
      const likeFrom = query(likeCollec, where("postId", "==", doc.id));
      const getLike = await getDocs(likeFrom);
      setLikes(getLike.docs.map((docs) => ({ userId: docs.data().userId })));
    } catch (err) {
      console.log(err);
    }
  };

  // check if user hava liked
  const isLiked = likes?.find((user) => user.userId === userId);

  //geting doc
  useEffect(() => {
    getLikes();
  }, []);

  console.log(likes);
  return (
    <div>
      <div className="user-d">
        <img src={doc.userImg} alt="" />
        <p>@{doc.userName}</p>
      </div>
      <div className="posts">
        <p>{doc.postText}</p>
        {doc.fileType == "image/jpeg" ||
        doc.fileType === "image/png" ||
        doc.fileType === "image/jpg" ? (
          <img src={doc.postImg}></img>
        ) : (
          <video
            src={doc.postImg}
            controls={true}
            autoPlay={true}
            loop={true}
          />
        )}
        <p>
          <button onClick={isLiked? removeLike: likedPost}>
            {isLiked ? <>&#128078;</> : <>&#x1F44D;</>}
          </button>
        </p>
        {likes && <p>Likes:{likes?.length} </p>}
      </div>
    </div>
  );
}
