/** @format */

export default function HomeHeader() {
  const styles = {
    "home-header": "mx-28 my-10 text-lg font-bold text-white basis-1/2",
  };
  return (
    <div
      id="tweetHeader"
      className="w-[80vh] border-2 border-[#404040] opacity-80 relative"
    >
      <div className="px-2 pt-2 text-xl font-bold text-white bg-black">
        Home
      </div>
      <div className="flex bg-black h-20">
        <div className={styles["home-header"]}>
          <span>For you</span>
        </div>
        <div className={styles["home-header"]}>
          <span>Following</span>
        </div>
      </div>
    </div>
  );
}
