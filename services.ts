"use client"
import axios from "axios";

//  const api = axios.create({
//   baseURL: "http://127.0.0.1:8000/api",
// });
//  const api = axios.create({
//   baseURL: "https://djcrypto.onrender.com/api",
// });

 const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});


api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem('access_token')
    console.log('token',token)
    if(token){
    config.headers.Authorization = `Bearer ${token}`
    
    }
    return config
  },
  (error) => {
    console.log('hiiiiiiiiiii')
    return Promise.reject(error)
  }
)

export default api