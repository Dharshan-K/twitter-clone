/** @format */

export default function FollowComponent() {
  return (
    <div id="Follow" className="flex justify-end w-[310px] m-3">
      <div className="basis-1/4 ">
        <img
          className="rounded-full w-12 h-12 m-1"
          src="https://source.unsplash.com/random/200x200?sig=incrementingIdentifier"
        />
      </div>
      <div className="basis-2/4 text-white grid grid-row-2 w-[50px] h-[16px]">
        <span className="row-span-1 text-base">Dharshan</span>
        <span className="row-span-1 text-[14px]">@kd_prog</span>
      </div>
      <div className="basis-[120px]">
        <button className="text-white w-[110px] h-[40px] font-bold text-[] rounded-full bg-[#1d9bf0] m-2">
          Follow
        </button>
      </div>
    </div>
  );
}
