/** @format */

import { FaTwitter, FaMagnifyingGlass } from "react-icons/fa6";
import {
  MdOutlineLocalPostOffice,
  MdBookmarkBorder,
  MdPersonOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { GoBell } from "react-icons/go";
import { BsHouseDoor, BsThreeDots } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarComponent() {
  const [dropDown, setDropDown] = useState(false);
  const toLogin = useNavigate();
  const manageDropdown = () => {
    setDropDown(!dropDown);
  };
  const handleSignOut = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("UserEmail");
    toLogin("/", { replace: true });
  };

  const styles = {
    "sidebar-Links": "text-white ml-24 mt-10 mb-10 text-xl",
    "tweet-button":
      "bg-[#1d9bf0] text-white border-1 rounded-full w-52 h-12 text-lg font-bold ml-24",
  };
  return (
    <div className="">
      <div id="sidebar" className="bg-black w-96 h-96 min-h-screen">
        <span>
          <FaTwitter />
        </span>
        <p className={`${styles["sidebar-Links"]}`}>
          <a href="#" className="flex flex-row">
            <BsHouseDoor className="basis-1/4 mt-1 text-3xl" />
            <span className="basis-3/4">Home</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a href="#" className="flex flex-row">
            <FaMagnifyingGlass className="basis-1/4 text-2xl" />
            <span className="basis-3/4">Explore</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a href="#" className="flex flex-row">
            <GoBell className="basis-1/4 text-3xl" />
            <span className="basis-3/4">Notifications</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a
            href="http://twitter-backend-rcbd.onrender.com/messages"
            className="flex flex-row"
          >
            <MdOutlineLocalPostOffice className="basis-1/4 text-3xl" />
            <span className="basis-3/4">Messages</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a href="#" className="flex flex-row">
            <MdBookmarkBorder className="basis-1/4 text-3xl" />
            <span className="basis-3/4">Bookmarks</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a href="#" className="flex flex-row">
            <MdPersonOutline className="basis-1/4 text-3xl" />
            <span className="basis-3/4">Profile</span>
          </a>
        </p>
        <p className={styles["sidebar-Links"]}>
          <a href="#" className="flex flex-row">
            <MdOutlineSettings className="basis-1/4 text-3xl" />
            <span className="basis-3/4">Settings</span>
          </a>
        </p>
        <a href="#">
          <button className={styles["tweet-button"]}>Tweet</button>
        </a>
        <div className="grid grid-col-3 grid-flow-row mt-20 ml-20">
          <div className="row-span-2 pl-6 pt-2">
            <img
              className="border-1 rounded-full h-10"
              src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier."
            />
          </div>
          <div className="text-black col-start-2 row-span-1 justify-center text-xl pt-1 h-5 mr-16">
            <span className="w-20 text-white">
              {localStorage.getItem("userName")}
            </span>
          </div>
          <div className="text-black col-start-2 row-span-1 justify-center mt-1 w-4 h-5">
            <span className="text-white text-sm">
              @{localStorage.getItem("userID")}
            </span>
          </div>
          <div className="col-start-3 col-span-1 ">
            <button onClick={manageDropdown}>
              <BsThreeDots className="text-white" />
            </button>
            {dropDown && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1 bg-black text-white"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    className="block px-4 py-2 text-sm  w-full text-left"
                    onClick={() => handleSignOut()}
                  >
                    SignOut
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
