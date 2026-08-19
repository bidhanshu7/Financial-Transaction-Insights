import React from "react";

const DashAdminComp = ({title,subtext,link,btntext,iconpath}) => {
  return (
    <div className=" flex border-[1px] border-gray-300 items-center rounded-lg  p-2 justify-between">
      <div className="">
        <img src={iconpath || "/createrole.png"} alt="" className="w-[50px] h-[50px]" />
      </div>
      <div className=" flex flex-col gap-2 flex-1 ml-5">
        <p className=" text-base text-gray-800 font-bold">{title}</p>
        <p className=" text-sm text-gray-600 font-semibold">
          {subtext}
        </p>
      </div>
      <button
        type="button"
        className="w-auto px-4 py-2 flex justify-center items-center bg-transparent border-2 border-indigo-600 text-indigo-600  rounded-lg font-semibold hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
      >
        <a href={link}>{btntext}</a>
      </button>
    </div>
  );
};

export default DashAdminComp;
