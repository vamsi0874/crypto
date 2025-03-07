
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import axios from "axios"
import {jwtDecode} from "jwt-decode"
 

interface MyJwtPayload {
  user_id: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub
    ,Credentials({
      name:"Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        let user = null
        console.log(credentials)
       
        try {
       const res =  await axios.post('http://127.0.0.1:8000/api/token/', {username:credentials.username,password:credentials.password})
       console.log('res signin',res)

         const data = await res.data
        const decoded = jwtDecode<MyJwtPayload>(data.access)   
        console.log('details',decoded)
        console.log('user',data)

          user =  {
          id: decoded?.user_id.toString(),
    
          accessToken: data.access,
          refreshToken: data.refresh,
         };
        } 
        catch (error) {
          console.error(error)
          return null
        }

       return user
  
      }
      }),  
  ],
  pages:{
    signIn:"/login",
  }

})