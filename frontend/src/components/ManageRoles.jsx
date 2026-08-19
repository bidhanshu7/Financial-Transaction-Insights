import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";

const ManageRoles = () => {
  const fetchAllRoles = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getAllRoles");

      if (response && response.data) {
        // setRoles(response.data.values);
        return response.data.values;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message || "Failed to fetch roles", {
          type: "error",
        });
        return null;
      }
    }
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["fetch-roles"],
    queryFn: fetchAllRoles,
  });

  if (isPending) {
    return <Loader />;
  }

  if (!data) {
    return (
      <h1 className=" text-center text-2xl font-semibold">No Role Found</h1>
    );
  }
  return (
    <>
      {data && (
        <div className="p-4 w-full h-screen">
          <div>
            <h1 className="text-xl max-sm:text-base font-semibold text-gray-600 mb-4">
              Manage Roles
            </h1>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className=" min-w-full table-auto">
                <thead className=" bg-indigo-600  text-white">
                  <tr>
                    <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left">
                      Role Id
                    </th>
                    <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left">
                      Role Name
                    </th>
                    <th className="py-3 px-6 max-sm:px-3 max-sm:py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    <>
                      {data.map((role, index) => {
                        return (
                          <tr
                            key={index}
                            className="border-b-2 border-gray-300 hover:bg-gray-100"
                          >
                            <td className=" py-3 px-6 max-sm:px-3 max-sm:py-2">
                              {role.id}
                            </td>
                            <td className=" py-3 px-6 max-sm:px-3 max-sm:py-2">
                              {role.roleName}
                            </td>
                            <td className=" flex gap-2 py-3 px-6 max-sm:px-3 max-sm:py-2">
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              >
                                <a
                                  href={`/dashboard/admin/view-role/${role.id}`}
                                >
                                  View
                                </a>
                              </button>
                              <button
                                type="button"
                                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                              >
                                <a
                                  href={`/dashboard/admin/edit-role/${role.id}`}
                                >
                                  Edit
                                </a>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageRoles;
