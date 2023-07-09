/** @format */
import { MdSearch } from "react-icons/md";
export default function SearchBar() {
  return (
    <div>
      <div
        id="SearchBar"
        className="bg-[#202327] my-3 h-10 flex w-80 min-w-50px rounded-full"
      >
        <span className="text-[#71767b] text-2xl ml-3 mt-2">
          <MdSearch />
        </span>
        <span className="text-[#71767b] text-lg mx-3 mt-1">Search Twitter</span>
      </div>
    </div>
  );
}
