/** @format */
"use client";
import Link from "next/link";
import { useState } from "react";
import {FaTwitter} from "react-icons/fa6";
import "../app/assets/login.css"

export default function LoginComponent() {
  const [userName,setUserName]:[string, React.Dispatch<React.SetStateAction<string>>] = useState("");
  const [userPassword,setUserPassword]:[string, React.Dispatch<React.SetStateAction<string>>] = useState("");
  return (
    <div>
      <div className="bg-gray-700" id="login-background">
        <div className="bg-black" id="login-box">
          <div className="login-form px-28" id="login-form">
            <span className="flex justify-center py-5"><FaTwitter className="twitter-icon text-3xl"/></span>
            <p className="text-white text-4xl font-bold text-center">Sign in to twitter</p>
            <div>
              <form className="login-input ">
                <input type="userName" className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mx-14" id="userName" value={userName} placeholder="Email or Username" onChange={(e)=>setUserName(e.target.value)}/>
                <input type="userName" className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-6 mb-4 mx-14" id="userName" value={userPassword} placeholder="Password" onChange={(e)=>setUserPassword(e.target.value)}/>
                <button className="border-2 rounded-full bg-white text-black font-bold h-10 w-72 px-7 mt-8 mb-2 mx-14" id="nextButton">Login</button>
                <button className="border-2 rounded-full bg-black text-white font-bold h-10 w-72 px-3 mt-4 mb-4 mx-14" id="forgetPasswordButton" >Forgot Password?</button>
              </form>
              <p className="text-gray-600 flex justify-center mt-6 text-lg" id="signUpLink">Dont have an account?<Link href="#" className="text-blue-400">Sign Up</Link></p>
            </div>
          </div>
        </div>        
      </div>      
    </div>
  );
}
