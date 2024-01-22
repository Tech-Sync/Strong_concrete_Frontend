// example login

import { Login } from "@/types/types";

export const login = async (data:Login)=>{



 const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
   const response = await fetch(baseUrl+'/auth/login', { 
    method: 'post', 
    headers: new Headers({
     'Content-Type': 'application/json',
     'Accept': 'application/json'
        
    }), 
    body: JSON.stringify(data)
  })

  const jsonData = await response.json()

  console.log(jsonData)
  
  return jsonData
}