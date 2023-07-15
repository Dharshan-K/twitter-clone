/** @format */

export const ChatProfile = () => {
  return (
    <div className="">
      <div id="profilepicture">
        <img
          className="w-8 h-8 rounded-full"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div className="grid grid-row-2">
        <div className="row-span-1">
          <span>Dharshan</span>
          <span>kd_prog</span>
        </div>
        <span className="row-span-1">how are you</span>
      </div>
      <div></div>
    </div>
  );
};
