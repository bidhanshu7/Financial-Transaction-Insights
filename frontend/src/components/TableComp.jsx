import React from "react";
import Loader from "./Loader";

const TableComp = ({ users, loading }) => {
  return (
    <table className="min-w-full table-auto p-4">
      <thead className="bg-indigo-600 text-white">
        <tr>
          <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left max-sm:text-sm">
            S.No.
          </th>
          <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left max-sm:text-sm">
            Username
          </th>
          <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left max-sm:text-sm">
            Email
          </th>
          <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left max-sm:text-sm">
            Role
          </th>
          <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left max-sm:text-sm">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {users && users.length > 0 ? (
          users.map((user, index) => (
            <tr
              key={user.userId}
              className="border-b-2 border-gray-300 hover:bg-gray-100"
            >
              <td className="py-3 px-6 max-sm:px-3 max-sm:py-2">{index + 1}</td>
              <td className="py-3 px-6 max-sm:px-3 max-sm:py-2">
                {user.username}
              </td>
              <td className="py-3 px-6 max-sm:px-3 max-sm:py-2">
                {user.email}
              </td>
              <td className="py-3 px-6 max-sm:px-3 max-sm:py-2">
                {user.roleName}
              </td>
              <td className="flex gap-2 py-3 px-6">
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  <a href={`/dashboard/admin/edit-user/${user.id}`}>Edit</a>
                </button>
              </td>
            </tr>
          ))
        ) : loading ? (
          <tr className="h-16">
            <td colSpan="5" className="text-center py-4 px-4">
              <Loader />
            </td>
          </tr>
        ) : (
          <tr className="h-16">
            <td colSpan="5" className="text-center py-4 px-4">
              <h2 className="text-xl text-gray-700">
                You haven't created any users for this role yet
              </h2>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TableComp;
