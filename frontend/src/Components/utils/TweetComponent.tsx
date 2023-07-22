/** @format */
"use client";
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { VscGraph } from "react-icons/vsc";
import { LiaDonateSolid } from "react-icons/lia";
import { useEffect,useState } from "react";
import axios from "axios";

export default function TweetComponent(tweetContent: any) {
  let { tweetid,userid, writtenby, tweetwritten, createdat, hashtags,likes } =
    tweetContent.tweetContent;
  const [likesCount,setLikesCount] = useState(likes) 

  const handleLike = async(id:string)=>{
    const response = await axios.post(`https://twitter-backend-rcbd.onrender.com/tweet/like/${id}`)
    setLikesCount(response.data.likesCount);
  }

  function createTweet(tweetString: string): any {
    let tweet = tweetString.split(/\s*(?=[#@])/);
    
    const tweetContainer = document.createElement('div')
    tweet.forEach((word: string) => {
      const span = document.createElement('span')

      if (word.startsWith("#")) {
        const word2 = word.substring(1)
        const link = document.createElement('a')
        link.href = `https://twitter-backend-rcbd.onrender.com/tweet/${word2}`
        link.textContent = word;
        link.setAttribute("style","color:#1d9bf0")
        span.appendChild(link)
      } else if (word.startsWith("@")) {
        
        const word2 = word.substring(1)
        const link = document.createElement('a')
        link.href = `https://twitter-backend-rcbd.onrender.com/tweet/${word2}`
        link.textContent = word;
        link.setAttribute("style","color:#1d9bf0")
        span.appendChild(link)
      } else {
        span.textContent = word;
      }
      tweetContainer.appendChild(span);
      ;
    });
    return tweetContainer
    
  }

  return (
    <div
      id="tweetComponent"
      className="flex flex-row bg-black w-[80vh] h-[65vh] border-[#404040] border-2"
    >
      <div id="profile-picture" className="basis-[70px]">
        <img
          className="border-1 rounded-full w-10 h-10 ml-2 mt-3"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div id="user-info" className="basis-5/6 w-96 mr-5">
        <div className="flex mt-2 mb-2">
          <p className="text-white text-[16px] w-[200px] max-w-[300px] font-bold">
            {writtenby}
          </p>
          <p className="text-gray-700 text-[15px]">@{userid}</p>
          <span className="ml-80 mt-2">
            <BsThreeDots className="text-white" />
          </span>
        </div>
        <div className="">
          <div id="tweet-content">
            <span className="text-white text-[15px]">
              <div dangerouslySetInnerHTML={{ __html: createTweet(tweetwritten).outerHTML }}></div>              
            </span>
          </div>
          <div id="tweet-footer pt-10">
            <img
              className="border-1 rounded-xl ml-5 mt-3 "
              src="https://source.unsplash.com/random/500x300?sig=incrementingIdentifier"
              alt=""
            />
          </div>
        </div>
        <div
          id="tweet-footer"
          className="text-slate-500 text-[17px] flex mt-4 ml-5 hover: text-pink-600"
        >
          <button className="flex w-24 text-slate-500 hover:text-pink-600 " onClick={()=>{handleLike(tweetid)}}>
            <FaRegHeart className="my-1" />
            <p className="text-[13px] px-2 pt-1">{likesCount}</p>
          </button>
          <button className="flex w-24 text-slate-500 hover:text-green-600">
            <AiOutlineRetweet className="my-1 text-[20px]" />
            <p className="text-[13px] px-2 pt-1">340</p>
          </button>
          <a href={`https://twitter-frontend-uypm.onrender.com/comments/${tweetid}`} className="flex w-24 text-slate-500 hover:text-blue-600">
            <FaRegComment className="my-1" />
            <p className="text-[13px] px-2 pt-1">340</p>
          </a>
          <button className="flex w-16 text-slate-500 hover:text-blue-600">
            <VscGraph className="my-1 text-[17px]" />
          </button>
          <button className="flex w-16 text-slate-500 hover:text-blue-600">
            <FiShare className="my-1 text-[17px]" />
          </button>
          <button className="flex w-24 text-slate-500 hover:text-blue-600">
            <LiaDonateSolid className="my-1 text-[20px]" />
            <span className="text-[13px] px-2 pt-1">Tip</span>
          </button>
        </div>
      </div>
    </div>
  );
}
