import React, { useContext, useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";
import { appContext } from "../context/appContext";
import { useSelector } from "react-redux";

const AddFilter = () => {
  const { fetchFilterType } = useContext(appContext);
  const { filterTypes } = useSelector((state) => state.filterType);
  const [formData, setFormData] = useState({
    filterTypeId: 0,
    filterValue: "",
  });


  useEffect(() => {
    if (filterTypes.length > 0) {
      setFormData({
        ...formData,
        filterTypeId: filterTypes[0].filterTypeId,
      });
    }
  }, []);
  console.log(formData)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post(
        `/api/admin/action/addFilter/${formData.filterTypeId}`,
        {
          filterValue: formData.filterValue,
        }
      );

      if (response.data) {
        toast(response.data.message, {
          type: "success",
        });
        setFormData({
          filterTypeId: 0,
          filterValue: "",
        });
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError && error.response) {
        return toast(error.response.data.message, { type: "error" });
      }
      return toast("An unexpected error occurred. Please try again.", {
        type: "error",
      });
    }
  };

  if (filterTypes.length > 0) {
    return (
      <div className="p-4 w-full h-screen max-sm:mb-8">
        <h1 className="text-2xl text-gray-800">Add Filter</h1>
        <form
          action=""
          className="space-y-4 sm:w-[50%] mt-4"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="selectFilter"
              className="block text-sm font-medium text-gray-700"
            >
              Select Filter Type
            </label>
            <select
              name="filterTypeId"
              className="w-full border-gray-300 px-4 py-3 border mt-1 rounded-lg focus:outline-none"
              value={formData.filterTypeId}
              onChange={handleChange}
            >
              {filterTypes.map((filter) => {
                return (
                  <option
                    key={filter.filterTypeId}
                    value={filter.filterTypeId}
                    className="rounded-lg"
                  >
                    {filter.filterName}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="selectFilter"
              className="block text-sm font-medium text-gray-700"
            >
              Enter the filter Value
            </label>
            <input
              type="text"
              id="filterValue"
              name="filterValue"
              required
              onChange={handleChange}
              value={formData.filterValue}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
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
  } else {
    return (
      <div className="flex justify-center items-center">
        <div>
          <Loader2 className="w-[100px] h-[100px] animate-spin" />
        </div>
      </div>
    );
  }
};

export default AddFilter;
