/** @format */

import TweetEditor from "../utils/TweetEditor";
import HomeHeader from "./HomeHeader";
import MainPage from "./mainPage";
export default function HomePage() {
  return (
    <div className="ml-96">
      <HomeHeader />
      <TweetEditor />
      <MainPage />
    </div>
  );
}
