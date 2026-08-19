
import React from "react";

const TransactionOverviewComp = ({ title, icon, value , parent }) => {
  return (
    <div className="flex flex-col border-2 cursor-pointer border-gray-200 rounded-lg shadow-md bg-white hover:shadow-xl transition-all ease-in-out duration-300 transform hover:scale-105">
      <div className="flex p-4 items-center gap-4">
        <div className="p-3 bg-indigo-100 rounded-full">{icon}</div>
        <div className="flex flex-col">
          <h2 className={`${parent==="admin"?"text-xl":" text-base"} text-gray-800 font-semibold`}>{title}</h2>
          <p className="text-lg font-semibold text-indigo-600">{value}</p>
        </div>
      </div>
      {/* <div className="bg-gray-100 rounded-b-lg px-6 py-4 hover:bg-indigo-50 transition-all ease-in-out duration-200">
        <p className="text-sm text-indigo-600 font-medium">View All</p>
      </div> */}
    </div>
  );
};

export default TransactionOverviewComp;
