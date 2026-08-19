import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import Loader from "./Loader";

const EditUser = () => {
  const { userId } = useParams();

  const [userFormData, setUserFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchUserById = async () => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getUserDetails/${userId}`
      );
      if (response && response.data) {
        return response.data.user;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response?.data.message || "Failed to get user details", {
          type: "error",
        });
        return null;
      }
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getAllRoles");

      if (response.data) {
        return response.data.values;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message || "Failed to fetch roles", {
          type: "error",
        });
      }
    }
  };

  const {
    isError: isUserError,
    error: userError,
    data: user,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["fetch-user-by-id", userId],
    queryFn: fetchUserById,
    onError: (error) => {
      toast.error(
        error?.message || "An error occurred while fetching user details"
      );
    },
  });

  const {
    isError: isRolesError,
    error: rolesError,
    data: roles,
    isLoading: isRolesLoading,
  } = useQuery({
    queryKey: ["fetch-roles"],
    queryFn: fetchRoles,
    onError: (error) => {
      toast.error(error?.message || "Failed to get the roles details");
    },
  });

  if (isUserLoading || isRolesLoading) {
    return <Loader />;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (Object.keys(userFormData).length === 0) {
        return toast("Nothing to update", {
          type: "warning",
        });
      }
      const response = await apiClient.patch(
        `/api/admin/action/updateUserDetails/${userId}`,
        {
          ...userFormData,
          roleId: userFormData.roleId || user.roleId,
          email: user.email,
        }
      );

      if (response && response.data) {
        toast(response.data.message || "User Updated successfully", {
          type: "success",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast(error.response?.data.message || "Failed to update user", {
          type: "error",
        });
      }
    }
  };
  console.log(userFormData);
  return (
    <div className="p-4 w-full h-screen max-sm:mb-8">
      <h1 className=" text-2xl  text-gray-800">Update User</h1>
      <form className="space-y-4 sm:w-[50%]" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={userFormData.username || user.username}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={user.email}
            disabled={true}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={handleChange}
            value={userFormData.password || user.password}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {roles && roles.length > 0 ? (
          <div>
            <label
              htmlFor="roleId"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="roleId"
              name="roleId"
              value={userFormData.roleId || user.roleId}
              onChange={handleChange}
              className="w-full border-gray-300 px-4 py-3 border mt-1 rounded-lg focus:outline-none"
            >
              <option value="" disabled>
                Select a role
              </option>
              {roles.map((role, index) => (
                <option key={index} value={role.id}>
                  {role.roleName}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="mt-4 text-gray-600">No roles available</div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
