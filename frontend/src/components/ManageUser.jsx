import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { useSelector } from "react-redux";
import TableComp from "./TableComp";

const ManageUser = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);

  const fetchAllUser = async () => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getAllUsers/${currentUser.id}`
      );

      if (response && response.status === 200) {
        console.log(response.data);
        return setUsers(response.data.users);
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

  useEffect(() => {
    fetchAllUser();
  }, []);
  return (
    <div className="p-4 w-full h-screen">
      <div>
        <h1 className="text-xl font-semibold text-gray-600 mb-4">
          Manage User
        </h1>
      </div>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <TableComp users={users} />
      </div>
    </div>
  );
};

export default ManageUser;
