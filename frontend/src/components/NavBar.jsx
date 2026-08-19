import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";

const NAVLINKS = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About Us",
    path: "/about",
  },
  {
    name: "Log In",
    path: "/signin",
  },
];
const NavBar = () => {
  const { isAdmin, currentUser } = useSelector((state) => state.user);
  return (
    <div
      className={`flex items-center ${
        currentUser ? "hidden" : ""
      } w-full px-4 py-2 justify-between shadow-lg`}
    >
      {/* Logo div */}
      <Header component={"nav"}/>
      <div className=" flex  gap-5 ">
        {/* NavLinks */}
        {NAVLINKS.map((navitems, index) => {
          return (
            <li
              key={index}
              className=" uppercase  list-none cursor-pointer border-b-2 border-transparent hover:border-b-2 hover:border-blue-600 "
            >
              <a href={navitems.path}>{navitems.name}</a>
            </li>
          );
        })}
      </div>
    </div>
  );
};

export default NavBar;
