/** @format */
"use client";
import { MdSearch } from "react-icons/md";
import {
  getSearchQuery,
  getUserQuery,
} from "../../../../tweets/utils/searchAPI";
import axios from "axios";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setsearchQuery] = useState("");

  const handleChange = (event: any) => {
    setsearchQuery(event.target.value);
  };

  const handleKeyDown = async (event: any) => {
    if (event.key === "Enter") {
      if (searchQuery === null) {
        return;
      } else {
        const data = { searchQuery: searchQuery };
        const response = await axios.post(
          "http://localhost:4000/tweet/search",
          data
        );

        localStorage.setItem("userData", response.data.userQuery[0]);
      }
      setsearchQuery("");
    }
  };
  return (
    <div>
      <div
        id="SearchBar"
        className="bg-[#202327] my-3 h-10 flex w-80 min-w-50px rounded-full"
      >
        <span className="text-[#71767b] text-2xl ml-3 mt-2">
          <MdSearch />
        </span>
        <input
          className="text-white bg-[#202327] text-lg mx-3 mt-1 outline-none"
          id="searchBarInput"
          value={searchQuery}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          placeholder="Search Twitter"
        />
      </div>
    </div>
  );
}
