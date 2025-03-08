"use server"

import {signIn , signOut} from "@/auth";
import axios from "axios";

import { redirect } from "next/navigation";



export const getTrendingCoins = async ()=>{
    const response = await axios.get('https://api.coingecko.com/api/v3/search/trending', {
        method: 'GET',
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": 'CG-uGcDEUyt3c53ghHwSHLGbo5p',
        },
      });

      return response.data
}


export const login = async ()=>{

    await signIn("github")
}

export const logout = async ()=>{
    await signOut({redirectTo:"/"})
}

export const registerCred = async (data:{username:string,password:string})=>{
    try {
   
     await signIn("credentials",{

        redirect:false,
        callbackUrl:"/watchlist",
        username:data.username,
        password:data.password,
    })
 
   
 } catch (error) {
    console.error('Login failed:', error);
 }
 redirect("/watchlist")
}