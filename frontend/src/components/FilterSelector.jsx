import React, { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

const FilterSelector = ({
  filterType,
  setFormData,
  formData,
  handleChange,
}) => {
  const [filters, setFilters] = useState([]);

  const fetchFilterForTypes = async (id) => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getFiltersByType/${id}`
      );

      if (response.data) {
        setFilters(response.data.filters);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response) {
        return toast(error.response.data.extraDetails, { type: "error" });
      }
      return toast("An unexpected error occurred. Please try again.", {
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchFilterForTypes(filterType.filterTypeId);
  }, [filterType.filterTypeId]);

  return (
    <div>
      <label
        htmlFor=""
        className={"block text-sm font-medium text-gray-700 mt-4"}
      >{`Select value for ${filterType.filterName}`}</label>

      <div className="space-y-4 mt-2">
        {filters.length > 0 &&
          filters.map((filter) => {
            return (
              <div
                key={filter.id}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  name={filter.filterName}
                  id={filter.filterName}
                  value={filter.id}
                  checked={formData[filter.filterName] === filter.id}
                  onChange={(e) => {
                    handleChange(e, filter.id);
                  }}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={filter.filterName}
                  className="text-sm text-gray-800"
                >
                  {filter.filterValue}
                </label>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default FilterSelector;
