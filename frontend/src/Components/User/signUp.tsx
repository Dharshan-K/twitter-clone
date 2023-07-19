/** @format */
"use client";
import { useState, useEffect } from "react";
import { FaTwitter } from "react-icons/fa6";
import "../../Components/assets/login.css";
import axios from "axios";
import Datepicker from "react-tailwindcss-datepicker";

export const SignUpComponent = () => {
  const [userName, setUserName]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [userID, setUserID]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [userEmail, setUserEmail]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");
  const [userPassword, setUserPassword]: [
    string,
    React.Dispatch<React.SetStateAction<string>>
  ] = useState("");

  const [userDOB, setUserDOB] = useState({
    startDate: null,
    endDate: null,
  });

  const signUP = async (e: any) => {
    e.preventDefault();
    const data = {
      userid: userID,
      username: userName,
      emailid: userEmail,
      userpassword: userPassword,
      dateofbirth: userDOB,
      accesslevel: "User",
    };
    console.log(data);
    await axios.post("http://localhost:4000/signUP", data);
  };

  const handleValueChange = (newValue: any) => {
    setUserDOB(newValue);
  };

  return (
    <div>
      <div className="bg-gray-700" id="login-background">
        <div className="bg-black" id="SignIn-box">
          <div className="login-form px-28" id="login-form">
            <span className="flex justify-center py-5">
              <FaTwitter className="twitter-icon text-3xl" />
            </span>
            <p className="text-white text-4xl font-bold text-center">
              Sign in to twitter
            </p>
            <div>
              <form className="login-input ">
                <div className="flex">
                  <input
                    type="userName"
                    className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mx-14"
                    id="userName"
                    value={userID}
                    placeholder="user-ID"
                    onChange={(e) => setUserID(e.target.value)}
                  />
                  <input
                    type="userName"
                    className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mx-14"
                    id="userName"
                    value={userName}
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="flex">
                  <input
                    type="userName"
                    className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mx-14"
                    id="userName"
                    value={userEmail}
                    placeholder="Email"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                  <input
                    type="userName"
                    className="bg-black text-white border-2 rounded-lg h-12 w-72 px-3 mt-12 mb-4 mx-14"
                    id="userName"
                    value={userPassword}
                    placeholder="Password"
                    onChange={(e) => setUserPassword(e.target.value)}
                  />
                </div>
                <div className="w-[38vh]  mx-52 my-5">
                  <Datepicker
                    primaryColor={"blue"}
                    useRange={false}
                    asSingle={true}
                    value={userDOB}
                    onChange={handleValueChange}
                  />
                </div>
                <button
                  className="border-2 rounded-full bg-white text-black font-bold h-10 w-72 px-7 mt-8 mb-2 mx-52"
                  id="nextButton"
                  onClick={signUP}
                >
                  SignUp
                </button>
              </form>
              <p
                className="text-gray-600 flex justify-center mt-6 text-lg"
                id="signUpLink"
              >
                Already have an account?
                <a href="http://localhost:3000/" className="text-blue-400">
                  Log In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
