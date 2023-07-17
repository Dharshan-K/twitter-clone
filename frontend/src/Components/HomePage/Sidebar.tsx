/** @format */

import { FaTwitter, FaMagnifyingGlass, FaHouse } from "react-icons/fa6";
import {
  MdNotificationsNone,
  MdOutlineLocalPostOffice,
  MdBookmarkBorder,
  MdBookmark,
  MdSearch,
  MdPersonOutline,
  MdOutlineSettings,
} from "react-icons/md";
import { GoBell } from "react-icons/go";
import { BsHouseDoor, BsThreeDots } from "react-icons/bs";
export default function SidebarComponent() {
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
          <a href="#" className="flex flex-row">
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
            <span className="w-20 text-white">Dharshan K</span>
          </div>
          <div className="text-black col-start-2 row-span-1 justify-center mt-1 w-4 h-5">
            <span className="text-white text-sm">@kd_prog</span>
          </div>
          <div className="col-start-3 col-span-1 ">
            <button>
              <BsThreeDots className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
