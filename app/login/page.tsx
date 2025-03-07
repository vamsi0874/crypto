'use client'
import { useState } from "react";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import {  useRouter } from 'next/navigation';
import { registerCred } from "@/app/(lib)/actions/auth";


const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
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

// Validation Schemas
const signupSchema = z.object({
  username: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  // email: z.string().email("Invalid email"),
  username: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AuthForm = () => {

  const [isSignup, setIsSignup] = useState(true);
  const [error, setError] = useState({
    message:''
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : loginSchema),
  });

console.log(isSignup)

  const get_token = async (data:any) => {
    try {
      const res = await api.post('/token/', {
        username : data.username,
        password : data.password,
      })
      const tokens = await res.data

      return tokens ? tokens : null
      
  } catch (error) {
    console.error('Signup failed:', error);
    
  }
}

  const onSubmit = async (data:any) => {
    console.log(data)
    // router.push('/watchlist')
    if(isSignup){
      try {
        
        const res = await api.post('/user/register/', {
          username : data.username,
          password : data.password,
      })
      const user = await res.data
      console.log('user',user)

      // router.push('/watchlist')
      
    }
   catch (error) {
    console.error('Login failed:', error);
  }
  setIsSignup(false)
 
  } else {
      const tokens = await get_token(data)
      if(tokens){
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        console.log(tokens.access) 
  
        router.push('/')
      }else {
        setError({message:'Invalid Credentials'})
    }
  }
}

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-800 dark:text-white">
          {isSignup ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div>
            <input
              {...register("username")}
              type="text"
              placeholder="username"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
            {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="ml-1 font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;

