import { AxiosError } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { useSelector } from "react-redux";
import { appContext } from "../context/appContext";

const FilterModal = ({
  isOpen,
  toggleModal,
  filterTypes,
  setAmountFilter,
  setVolumeFilter,
  setDaysFilter,
}) => {
  const [toggleDays, setToggleDays] = useState(false);
  const [toggleAmount, setToggleAmount] = useState(false);
  const [toggleVolume, setToggleVolume] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [filterData, setFilterData] = useState({
    days: "",
    amount: "",
    volume: "",
  });

  const handleTypeChange = (typename) => {
    if (typename === "days") {
      setToggleDays(!toggleDays);
    } else if (typename === "amount") {
      setToggleAmount(!toggleAmount);
    } else if (typename === "volume") {
      setToggleVolume(!toggleVolume);
    }
  };
  const fetchUserFilter = async () => {
    try {
      const response = await apiClient.get(
        `/api/admin/action/getRoleDetails/${currentUser.roleId}`
      );
      if (response && response.data) {
        response.data.filters.map((filter) => {
          setFilterData((prev) => ({
            ...prev,
            [filter.filterName]: filter.filterValue,
          }));
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        return toast(
          error?.response?.data.message || "Failed to fetch user filters",
          {
            type: "error",
          }
        );
      }
    }
  };

  useEffect(() => {
    fetchUserFilter();
  }, []);

  const changeFilter = () => {
    toggleModal();
    // setToggleAmount(false);
    // setToggleVolume(false);
    // setToggleDays(false);
    if (filterData.amount) setAmountFilter(filterData.amount);
    if (filterData.days) setDaysFilter(filterData.days);
    if (filterData.volume) setVolumeFilter(filterData.volume);
    // setFilterData({
    //   daysFilter: "",
    //   amountFilter: "",
    //   volumeFilter: "",
    // });
    return;
  };

  const handleFilterChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(filterData);
  return (
    <>
      {isOpen && (
        <div
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto  overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center w-full h-full"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm ">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t  border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  Transaction Filter
                </h3>
                <button
                  onClick={() => {
                    toggleModal();
                    // setToggleAmount(false);
                    // setToggleVolume(false);
                    // setToggleDays(false);
                    // setFilterData({
                    //   daysFilter: "",
                    //   amountFilter: "",
                    //   volumeFilter: "",
                    // });
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <h2 className=" text-lg font-semibold text-gray-800">
                  Filter Types
                </h2>
                {/* <div className=" flex gap-3">
                  {filterTypes.length > 0 ? (
                    filterTypes.map((type) => {
                      return (
                        <div className=" flex items-center gap-3">
                          <input
                            type="checkbox"
                            className=""
                            onChange={() => {
                              handleTypeChange(type.filterName);
                            }}
                          />
                          <label
                            htmlFor=""
                            className=" text-sm text-gray-800 font-semibold"
                          >
                            {type.filterName}
                          </label>
                        </div>
                      );
                    })
                  ) : (
                    <p className=" text-center text-gray-800 font-semibold text-2xl">
                      Filters Not Found
                    </p>
                  )}
                </div> */}
                <div className=" space-y-4">
                  {/* {toggleDays && ( */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor=""
                    >
                      Enter filter for days
                    </label>
                    <input
                      type="text"
                      id="days"
                      name="days"
                      onChange={handleFilterChange}
                      value={filterData.days}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  {/* )} */}
                  {/* {toggleAmount && ( */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor=""
                    >
                      Enter filter for amount
                    </label>
                    <input
                      type="text"
                      id="amount"
                      name="amount"
                      onChange={handleFilterChange}
                      value={filterData.amount}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  {/* )} */}
                  {/* {toggleVolume && ( */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      htmlFor=""
                    >
                      Enter filter for Volume
                    </label>
                    <input
                      type="text"
                      id="volume"
                      name="volume"
                      onChange={handleFilterChange}
                      value={filterData.volume}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  {/* )} */}
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b ">
                <button
                  onClick={changeFilter}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterModal;
