import { useDetails } from "../customState/Details/useDetail";
import { useProfile } from "../customState/Details/useProfile";
export function useImg(){
let image;
  const { photoURL,userId } = useDetails();
  const [pic] = useProfile(userId);

if(photoURL){
  image = photoURL
}
else if(pic){
  image = pic
}
 return [image]
} 