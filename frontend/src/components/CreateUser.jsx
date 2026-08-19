import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const CreateUser = () => {
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    roleId: "",
  });

  const [togglePassword, setTogglePassword] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [roles, setRoles] = useState([]);
  const handleChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };
  const fetchRoleDetails = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getAllRoles");

      if (response.data) {
        setRoles(response.data.values);
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
  useEffect(() => {
    fetchRoleDetails();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!userFormData.roleId) {
        return toast("Please select a role", {
          type: "error",
        });
      }
      const response = await apiClient.post(
        "/api/admin/action/createUser",
        userFormData
      );

      if (response.data) {
        setUserFormData({
          username: "",
          email: "",
          password: "",
          roleId: "",
        });
        toast(response.data.message, {
          type: "success",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error?.response?.data?.message || "Failed to create user", {
          type: "error",
        });
      }
    }
  };
  console.log(userFormData);

  const handlePasswordToggle = () => {
    setTogglePassword((prev) => !prev);
  };
  return (
    <div className="p-4 w-full h-screen max-sm:mb-8">
      <h1 className=" text-2xl  text-gray-800">Create User</h1>
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
            required
            onChange={(e) => {
              handleChange(e);
            }}
            value={userFormData.username}
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
            onChange={(e) => {
              handleChange(e);
            }}
            value={userFormData.email}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className=" relative">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type={togglePassword ? "text" : "password"}
            id="password"
            name="password"
            required
            onChange={(e) => {
              handleChange(e);
            }}
            value={userFormData.password}
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {togglePassword ? (
            <EyeClosedIcon
              className=" absolute right-4  top-10 cursor-pointer"
              onMouseLeave={handlePasswordToggle}
            />
          ) : (
            <EyeIcon
              className=" absolute right-4 top-10 cursor-pointer"
              onMouseEnter={handlePasswordToggle}
            />
          )}
        </div>
        <div>
          {roles.length > 0 ? (
            <>
              <label
                htmlFor=""
                className={"block text-sm font-medium text-gray-700 mt-4"}
              >{`Select a role`}</label>
              <select
                name="roleId"
                id="roleId"
                value={userFormData.roleId}
                onChange={handleChange}
                className=" w-full border-gray-300 px-4 py-3 border mt-1 rounded-lg focus:outline-none"
              >
                <option value="" disabled>
                  Select a role
                </option>
                {roles.map((role, index) => {
                  return (
                    <option key={index} value={role.id}>
                      {role.roleName}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <div className="">
              <h1 className="text-lg text-gray-600">
                Please Create a role before user
              </h1>
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center items-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
