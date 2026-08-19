import React from "react";
import DashSideBarComp from "./DashSideComp";
import Header from "./Header";
import { BookCheckIcon, HomeIcon } from "lucide-react";

const USER_SIDE_ELEMENTS = [
  {
    name: "Home",
    path: "/dashboard/user",
    Icon: <HomeIcon />,
  },
  {
    name: "Transactions",
    path: "/dashboard/user/transactions",
    Icon: <BookCheckIcon />,
  },
];

const DashUserSideBar = () => {
  return (
    <div className=" sm:w-[20%] max-sm:p-2 sm:h-screen sticky top-0 sm:left-0 border-r-2 border-gray-300">
      <div className=" flex flex-col gap-4 mt-8">
        <Header component={"dash"} />
        <div className=" flex-1 flex flex-col gap-4 px-4 max-sm:mt-4 max-sm:mb-4 mt-20">
          {USER_SIDE_ELEMENTS.map((elem, index) => {
            return (
              <DashSideBarComp
                icon={elem.Icon}
                path={elem.path}
                title={elem.name}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashUserSideBar;
