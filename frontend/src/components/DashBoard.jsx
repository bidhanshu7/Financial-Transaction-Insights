import React, { useContext, useEffect, useState } from "react";
import UserProfileSection from "./UserProfileSection";
import { useSelector } from "react-redux";
import TransactionOverviewComp from "./TransactionOverviewComp";
import { Settings2Icon, User2 } from "lucide-react";
import DashAdminComp from "./DashAdminComp";
import { appContext } from "../context/appContext";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";

const AdminCompConst = [
  {
    btntext: "Create Role",
    title: "Add a Role",
    iconpath: "/createrole.png",
    subtext: "Create new role with filters for the users",
    link: "/dashboard/admin/create-role",
  },
  {
    btntext: "Create User",
    title: "Add an User",
    iconpath: "/createuser.png",
    subtext: "Create user and assign role to user",
    link: "/dashboard/admin/create-user",
  },
  {
    btntext: "Create Filter",
    title: "Add a Filter",
    iconpath: "/addfilter.png",
    subtext: "Create a new filters for a filter type",
    link: "/dashboard/admin/add-filter",
  },
];

const DashBoard = () => {
  const { currentUser, isAdmin } = useSelector((state) => state.user);
  const { filterTypes } = useSelector((state) => state.filterType);
  const { fetchFilterType } = useContext(appContext);
  const [userCount, setUserCount] = useState(0);
  const [rolesCount, setRolesCount] = useState(0);

  const fetchAllUser = async () => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getAllUsers/${currentUser.id}`
      );

      if (response && response.status === 200) {
        console.log(response.data);
        return setUserCount(response.data.users.length);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(
          error?.response?.data?.message || "Failed to fetch user details",
          {
            type: "error",
          }
        );
      }
    }
  };

  const fetchAllRoles = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getAllRoles");

      if (response && response.data) {
        setRolesCount(response.data.values.length);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return toast(error.response?.data.message || "Failed to fetch roles", {
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    fetchFilterType();
    fetchAllUser();
    fetchAllRoles();
  }, []);

  return (
    <div className="p-4 w-full h-screen scrollbar-hide  max-sm:mb-8">
    {/* User profile Section */}
    <UserProfileSection user={currentUser} isAdmin={isAdmin} />
    <hr className="mt-2 border-gray-300 border-[1px]" />
  
    {/* Transaction Overview */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-2 gap-6 mt-5">
      <TransactionOverviewComp
        icon={<User2 />}
        title={"Users"}
        value={userCount}
      />
      <TransactionOverviewComp
        icon={<Settings2Icon />}
        title={"Roles Available"}
        value={rolesCount}
      />
      <TransactionOverviewComp
        icon={<Settings2Icon />}
        title={"Filter Type Available"}
        value={filterTypes.length}
      />
    </div>
  
    {/* Admin Actions */}
    <div className="w-full sm:w-[70%] lg:w-[50%] flex flex-col gap-4 p-2 mt-5 rounded-lg border-gray-400 border-2">
      <div>
        <h2 className="text-xl text-gray-800 font-semibold">
          Admin Actions
        </h2>
      </div>
      <hr className="border-[0.7px] my-3 border-gray-400" />
      {AdminCompConst.map((comp, index) => (
        <DashAdminComp
          key={index}
          btntext={comp.btntext}
          title={comp.title}
          iconpath={comp.iconpath}
          subtext={comp.subtext}
          link={comp.link}
          parent={"admin"}
        />
      ))}
    </div>
  </div>
  
  );
};

export default DashBoard;
