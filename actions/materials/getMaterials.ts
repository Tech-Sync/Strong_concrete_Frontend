import { auth } from "@/auth";

export const getMaterials = async()=>{
 const session = await auth();
 const user = session?.user;
 const role = user?.role;
 const token = session?.accessToken;

 
 console.log(session);
 if (!user) {
  throw new Error("User not found");
 }
 if (!token) {
  throw new Error("Token not found");
  
 }
 if ( role == 1 ||  role == 2 ||  role == 3 ) {

  throw new Error("User not authorized");
  
 }else {
  try {
   
   const materials = await fetch(process.env.NEXT_PUBLIC_APIBASE_URL+'/materials/' as string, {cache: "no-cache", headers: {
    "Authorization": `Bearer ${token}`,
    "Content-Type": "application/json"
   }
   })
   .then(res => res.json())
   return materials.data;
  } catch (error) {
   return error;
  }

 }
   
}