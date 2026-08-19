import React from "react";

const Header = ({component}) => {
  return (
    <div className="flex sm:justify-center items-center">
      <a href="/"><img src="/logo.png" className={component==="dash"?`w-[80px] h-[80px] rounded-xl`:`w-[45px] h-[45px] rounded-xl`} /></a>
      <div className="flex">
        <h1 className="bg-gradient-to-bl text-2xl from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Finan
        </h1>
        <span className="bg-gradient-to-r text-2xl from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
          cial
        </span>
      </div>
    </div>
  );
};

export default Header;
