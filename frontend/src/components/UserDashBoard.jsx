import React from "react";
import UserProfileSection from "./UserProfileSection";
import { useSelector } from "react-redux";
import StatusPieChart from "./charts/StatusPieChart";
import ChannelBarChart from "./charts/ChannelBarChart";

const UserDashBoard = () => {
  const { currentUser, isAdmin } = useSelector((state) => state.user);
  return (
    <div className=" w-full h-screen scrollbar-hide ">
      <UserProfileSection user={currentUser} isAdmin={isAdmin} />

      <hr className=" border-[1.5px] border-gray-300 " />
      <div className="">
        <h2 className=" text-lg capitalize font-semibold text-gray-800 p-4">
          Overview
        </h2>
        <div className=" grid grid-cols-2">
          {/* Pie chart */}
          <div>
            <StatusPieChart />
          </div>
          {/* Bar Chart */}
          <div>
            <ChannelBarChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
