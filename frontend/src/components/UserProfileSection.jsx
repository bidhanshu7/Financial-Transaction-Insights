import React, { use } from "react";

const UserProfileSection = ({ user,isAdmin }) => {
  return (
    <div className="p-4  flex items-center max-sm:flex-col  max-sm:gap-3 justify-between">
      <div className="mr-4">
        <img src="/profile.png" className="w-[60px] h-[60px] rounded-lg" />
      </div>
      <div className="flex flex-col gap-1 flex-1">
        <h1 className="text-2xl text-gray-700 font-semibold">
          {user.username}
        </h1>
        <div className="flex gap-2">
          <span className="text-sm text-gray-800">{user.email}</span>
        </div>
      </div>
      {isAdmin ? (
        <div className="flex gap-4 ">
          <button
            type="button"
            className="w-auto px-4 flex justify-center items-center bg-transparent border-2 border-indigo-600 text-indigo-600  rounded-lg font-semibold hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
          >
            <a href="/dashboard/admin/add-filter">Add Filter</a>
          </button>
          <button
            type="button"
            className="w-auto px-4 flex justify-center items-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
          >
            <a href="/dashboard/admin/create-role">Add Role</a>
          </button>
        </div>
      ) : (
        <>
          <button
            type="button"
            className="w-auto px-4 py-2 flex justify-center items-center bg-transparent border-2 border-indigo-600 text-indigo-600  rounded-lg font-semibold hover:bg-indigo-600 hover:text-white focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all"
          >
            <a href="/dashboard/user/transactions">View Transactions</a>
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfileSection;
