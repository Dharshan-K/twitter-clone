/** @format */
import { useEffect, useState } from "react";
import axios from "axios";
export default function ExploreKeysTab() {
  const [tab, setTab]: [number, React.Dispatch<React.SetStateAction<number>>] =
    useState(0);

  useEffect(() => {
    const getHashtags = async () => {
      const response = await axios.get(
        `http://localhost:4000/hashtag/${tab}`
      );
    };

    getHashtags();
  }, [tab]);

  return (
    <div className="flex flex-wrap bg-black text-white mt-2 font-mono border-b-2 border-gray-600">
      <div className="mr-10 mt-[10px] text-base border-b-[5px] rounded-t-2xl border-blue-500">
        <a
          href="#"
          onClick={() => {
            setTab(1);
          }}
          className=""
        >
          Profile
        </a>
      </div>
      <div
        className="mr-10 mt-[10px] text-base"
        data-te-toggle="pill"
        data-te-target="#For-you"
      >
        <a
          href="#"
          onClick={() => {
            setTab(2);
          }}
        >
          For you
        </a>
      </div>
      <div
        className="mr-10 mt-[10px] text-base"
        data-te-toggle="pill"
        data-te-target="#Trending"
      >
        <a
          href="#"
          onClick={() => {
            setTab(3);
          }}
        >
          Trending
        </a>
      </div>
      <div
        className="mr-10 mt-[10px] text-base"
        data-te-toggle="pill"
        data-te-target="#Sports"
      >
        <a
          href="#"
          onClick={() => {
            setTab(4);
          }}
        >
          Sports
        </a>
      </div>
      <div
        className="mr-10 mt-[10px] text-base"
        data-te-toggle="pill"
        data-te-target="#News"
      >
        <a
          href="#"
          onClick={() => {
            setTab(5);
          }}
        >
          News
        </a>
      </div>
      <div
        className="mr-10 mt-[10px] text-base"
        data-te-toggle="pill"
        data-te-target="#Entertaiment"
      >
        <a
          href="#"
          onClick={() => {
            setTab(6);
          }}
        >
          Entertaiment
        </a>
      </div>
    </div>
  );
}
