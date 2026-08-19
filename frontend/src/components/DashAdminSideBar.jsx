import React, { useState } from "react";
import Header from "./Header";
import {
  HamIcon,
  HomeIcon,
  MenuIcon,
  Plus,
  Settings,
  Settings2,
  UserPlus2,
  Users,
} from "lucide-react";
import DashSideBarComp from "./DashSideComp";

const ADMIN_SIDE_ELEMENTS = [
  {
    name: "Home",
    path: "/dashboard/admin",
    Icon: <HomeIcon />,
  },
  {
    name: "Create Role",
    path: "/dashboard/admin/create-role",
    Icon: <Settings2 />,
  },
  {
    name: "Add Filter",
    path: "/dashboard/admin/add-filter",
    Icon: <Plus />,
  },
  {
    name: "Manage Users",
    path: "/dashboard/admin/manage-users",
    Icon: <Users />,
  },
  {
    name: "Create User",
    path: "/dashboard/admin/create-user",
    Icon: <UserPlus2 />,
  },
  {
    name: "Manage Roles",
    path: "/dashboard/admin/manage-roles",
    Icon: <Settings />,
  },
];

const DashAdminSideBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className=" sm:w-[20%] max-sm:p-2 sm:h-screen sticky top-0 sm:left-0 border-r-2 border-gray-300">
      <div className=" flex flex-col gap-4 max-sm:mt-4 mt-8">
        <div className="max-sm:flex max-sm:items-center max-sm:justify-between">
          <Header component={"dash"} />
          <MenuIcon
            className="sm:hidden"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          />
        </div>

        <div
          className={`sm:flex-1 ${
            toggleMenu ? "max-sm:flex" : "max-sm:hidden"
          } flex flex-col gap-4 px-4 max-sm:mt-4 mt-20`}
        >
          {ADMIN_SIDE_ELEMENTS.map((elem, index) => {
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

export default DashAdminSideBar;
