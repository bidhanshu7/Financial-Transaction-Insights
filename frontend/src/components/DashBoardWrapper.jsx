import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashUserSideBar from "./DashUserSideBar";
import DashAdminSideBar from "./DashAdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import { LogOutIcon } from "lucide-react";
import { SignOut } from "../redux/slice/userSlice";
import { RemoveFilterTypes } from "../redux/slice/filterTypeSlice";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import apiClient from "../utils/apiClient";

const DashBoardWrapper = () => {
  const { isAdmin, currentUser } = useSelector((state) => state.user);
  const [toggleSignOut, setToggleSignOut] = useState(true);
  const dispatch = useDispatch();

  const handleUserSignOut = async () => {
    try {
      const response = await apiClient.delete(
        `${isAdmin ? "/api/admin/signOut" : "/api/user/signOut"}`
      );

      if (response && response.data) {
        dispatch(RemoveFilterTypes());
        dispatch(SignOut());
        toast(response.data.message, {
          type: "success",
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Failed to sign out user");
      }
    }
  };
  return (
    <main className="flex max-sm:flex-col w-full h-screen relative">
      {isAdmin ? <DashAdminSideBar /> : <DashUserSideBar />}
      <div className="flex-1 h-screen overflow-y-auto">
        <div className=" flex justify-between p-4 border-b-2 border-gray-300">
          <h1 className=" text-2xl text-teal-700 font-semibold">
            {isAdmin ? "Admin DashBoard" : "UserDashBoard"}
          </h1>
          {/* Profile Section */}
          <div
            onClick={() => {
              setToggleSignOut(toggleSignOut ? false : true);
            }}
            className="max-sm:hidden relative px-4 py-3 rounded-lg items-center cursor-pointer border-[1.5px] border-gray-700"
          >
            <div className=" flex gap-5 items-center">
              <img
                className=" w-[40px] h-[40px]"
                alt="user-profile-image"
                src="/profile.png"
              />
              <p className=" text-sm text-gray-600 ">{currentUser.username}</p>
              {/* <Settings2 /> */}
              <LogOutIcon onClick={handleUserSignOut} />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
};

export default DashBoardWrapper;
