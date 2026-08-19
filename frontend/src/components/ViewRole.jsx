import { useQuery } from "@tanstack/react-query";
import React from "react";
import apiClient from "../utils/apiClient";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";
import TableComp from "./TableComp";

const ViewRole = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { roleId } = useParams();
  const fetchAllUsers = async () => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getAllUsers/${currentUser.id}?roleId=${roleId}`
      );

      if (response && response.data) {
        return response.data.users;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast(error.response?.data.message || "Failed to fetch roles", {
          type: "error",
        });
        return null;
      }
    }
  };
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["fetch-roles"],
    queryFn: fetchAllUsers,
  });

  return (
    <div className="p-4 w-full h-screen max-sm:mb-8">
      <h1 className=" text-2xl text-gray-700 font-semibold">Role Details</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-4">
        <TableComp users={data} loading={isLoading} />
      </div>
    </div>
  );
};

export default ViewRole;
