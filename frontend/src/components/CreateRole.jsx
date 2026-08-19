import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterSelector from "./FilterSelector";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { appContext } from "../context/appContext";

const CreateRole = () => {
  const [formData, setFormData] = useState({
    roleName: "",
    volume: null,
    amount: null,
    days: null,
  });

  const { filterTypes } = useSelector((state) => state.filterType);
  console.log(filterTypes);

  const { fetchFilterType } = useContext(appContext);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e, filterId) => {
    const { checked, name } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked ? filterId : null,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (
        !formData.amount ||
        !formData.days ||
        !formData.volume ||
        !formData.roleName
      ) {
        return toast("Please select all fields and submit the form", {
          type: "warning",
        });
      }

      const response = await apiClient.post("/api/admin/action/createRole", {
        roleName: formData.roleName,
        volumeFilterId: formData.volume,
        amountFilterId: formData.amount,
        daysFilterId: formData.days,
      });

      if (response) {
        if (response.status === 200 || response.status === 201) {
          toast(response.data.message, {
            type: "success",
          });
          setFormData({
            roleName: "",
            volume: null,
            amount: null,
            days: null,
          });
          return;
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(error.response.data.message, {
          type: "error",
        });
      }
    }
  };

  console.log(formData);
  return (
    <div className="p-4 w-full h-screen max-sm:mb-8">
      <h1 className="text-2xl text-gray-800">Create Role</h1>
      <form className=" space-y-4 sm:w-[50%] mt-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="selectFilter"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Enter Role Name
          </label>
          <input
            type="text"
            id="roleName"
            name="roleName"
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {filterTypes.map((filterType, index) => {
          return (
            <FilterSelector
              key={index}
              filterType={filterType}
              setFormData={setFormData}
              handleChange={handleCheckboxChange}
              formData={formData}
            />
          );
        })}
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

export default CreateRole;
