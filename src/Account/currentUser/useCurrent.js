import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/config";

 
 export function useCurrent(){

  let user;
  const [userDetails] = useAuthState(auth);

  if(userDetails){
    user = userDetails
  
  }
else if (localStorage.getItem('users')){
user = JSON.parse(localStorage.getItem('users'))
}
return [user]

 }