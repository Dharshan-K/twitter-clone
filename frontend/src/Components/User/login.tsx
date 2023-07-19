/** @format */
"use client";
import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa6";
import { checkEmail } from "../assets/utils";
import "../../Components/assets/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginComponent = () => {
  const [userName, setUserName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [userID, setUserID]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState(" ");
  const [userEmail, setUserEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState(" ");
  const [userPassword, setUserPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const navigate = useNavigate();

  const [data, setData] = useState({
    userid: "",
    emailid: "",
    userpassword: "",
  });

  useEffect(() => {
    const validEmail = checkEmail(userName);
    if (validEmail) {
      setData({ userid: "", emailid: userName, userpassword: userPassword });
    } else {
      setData({
        userid: userName,
        emailid: "",
        userpassword: userPassword,
      });
    }
  }, [userName, userPassword]);

  const login = async (e: any) => {
    e.preventDefault();

    const response = await axios.post("http://localhost:4000/login", data);
    console.log("response.headers", response.data);
    localStorage.setItem("userID", response.data.userID);
    localStorage.setItem("userName", response.data.userName);
    localStorage.setItem("UserEmail", response.data.userEmail);
    localStorage.setItem("token", response.data.token);
    navigate("/home", { replace: true });
  };

  //

  return (
    <div>
      <div className="bg-gray-700" id="login-background">
        <div className="bg-black" id="login-box">
          <div className="login-form px-28" id="login-form">
            <span className="flex justify-center py-5">
              <FaTwitter className="twitter-icon text-3xl" />
            </span>
            <p className="text-white text-4xl font-bold text-center">
              Sign in to twitter
            </p>
            <div>
              <form className="login-input ">
                <input
                  type="userName"
                  className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mx-14"
                  id="userName"
                  value={userName}
                  placeholder="Email or Username"
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="userName"
                  className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-6 mb-4 mx-14"
                  id="userName"
                  value={userPassword}
                  placeholder="Password"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
                <button
                  className="border-2 rounded-full bg-white text-black font-bold h-10 w-72 px-7 mt-8 mb-2 mx-14"
                  id="nextButton"
                  onClick={login}
                >
                  Login
                </button>
                <button
                  className="border-2 rounded-full bg-black text-white font-bold h-10 w-72 px-3 mt-4 mb-4 mx-14"
                  id="forgetPasswordButton"
                >
                  Forgot Password?
                </button>
              </form>
              <p
                className="text-gray-600 flex justify-center mt-6 text-lg"
                id="signUpLink"
              >
                Dont have an account?
                <a
                  href="http://localhost:3000/signUp"
                  className="text-blue-400"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
