import { CircleArrowDown, CircleArrowUp, Scale } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import TransactionOverviewComp from "./TransactionOverviewComp";
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { cn } from "../utils/twUtils";
import { AddFilterTypes } from "../redux/slice/filterTypeSlice";
import { useDispatch } from "react-redux";
import FilterModal from "./FilterModal";
import { CheckCircle, Clock, XCircle, ArrowLeftCircle } from "lucide-react";
import { appContext } from "../context/appContext";

const Transactions = () => {
  const dispatch = useDispatch();
  const [daysFilter, setDaysFilter] = useState(null);
  const [amountFilter, setAmountFilter] = useState("");
  const [volumeFilter, setVolumeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState([]);
  const { fetchFilterCountDetails } = useContext(appContext);
  const toggleModal = () => setIsOpen(!isOpen);
  const generateQueryParams = () => {
    const urlParams = new URLSearchParams();

    if (volumeFilter) urlParams.set("volume", volumeFilter);
    if (amountFilter) urlParams.set("amount", amountFilter);
    if (daysFilter) urlParams.set("days", daysFilter);
    if (page) urlParams.set("pageNo", page);

    return urlParams.toString();
  };

  const StatusIcon = ({ status }) => {
    switch (status) {
      case "Success":
        return <CheckCircle color="green" />;
      case "Pending":
        return <Clock color="orange" />;
      case "Failed":
        return <XCircle color="red" />;
      case "Reversed":
        return <ArrowLeftCircle color="blue" />;
      default:
        return null;
    }
  };
  const fetchFilterType = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getFilterTypes");

      if (response.data) {
        dispatch(AddFilterTypes(response.data.filterTypes));
        setFilterType(response.data.filterTypes);
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

  const clearFilter = () => {
    setAmountFilter("");
    setVolumeFilter("");
    setDaysFilter(1);
  };
  const fetchTransactions = async (queryParam) => {
    try {
      console.log(queryParam);
      const response = await apiClient.get(
        `/api/transaction/getTransactions?${queryParam}`
      );
      console.log(response);

      if (response && response.data) {
        setTransactions(response.data.transaction);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast(
          error?.response?.data?.message ||
            "Failed to fetch Transactions details",
          {
            type: "error",
          }
        );
        clearFilter();
      }
    }
  };

  const filterStatusDetails = async () => {
    const details = await fetchFilterCountDetails();
    setFilterStatus(details);
  };

  useEffect(() => {
    const queryParam = generateQueryParams();
    fetchTransactions(queryParam);
    fetchFilterType();
    filterStatusDetails();
  }, [volumeFilter, amountFilter, daysFilter, page]);

  const handleDcrPage = () => {
    setPage((prev) => {
      if (prev === 1) {
        return 1;
      }
      return prev - 1;
    });
  };

  const handleIncrPage = () => {
    setPage((prev) => {
      if (transactions.length < 20) {
        return prev;
      }
      return prev + 1;
    });
  };
  console.log(transactions);
  return (
    <>
      <FilterModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        filterTypes={filterType}
        setAmountFilter={setAmountFilter}
        setVolumeFilter={setVolumeFilter}
        setDaysFilter={setDaysFilter}
      />
      <div className={`p-4 h-screen relative ${isOpen ? "blur-3xl " : ""}`}>
        <h1 className="text-2xl text-gray-700 font-semibold">Transactions</h1>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {filterStatus && (
            <>
              {filterStatus.map((status, index) => {
                return (
                  <TransactionOverviewComp
                    title={`${status.status} Transactions`}
                    icon={StatusIcon({ status: status.status })}
                    value={status.sumTransaction}
                  />
                );
              })}
            </>
          )}
        </div>
        {/* Filters */}
        <div className="mt-4">
          <h2 className="text-base text-gray-700 font-semibold">
            Transaction Filters
          </h2>
          <div className="flex my-4 gap-4">
            <button
              onClick={toggleModal}
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Filter Table
            </button>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-base text-gray-700 font-semibold">
            Recent Transactions
          </h2>
          <div className="overflow-x-auto my-4">
            <table className="min-w-full table-auto border-collapse mb-6">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Total transactions
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Total Amount
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Product Code
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Feature Name
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Status
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Channel
                  </th>
                  <th className="py-3 px-4 text-left text-gray-800 border-b">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 border-gray-300 border-b-2"
                    >
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.totalTxn}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.totalAmount}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.productCode}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.featureName}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        <span
                          // className={`text-sm font-medium ${
                          //   transaction.status === "Success" ? "text-green-500" : "text-red-500"
                          // }`}
                          className={cn(
                            "text-sm font-medium",
                            transaction.status === "Success"
                              ? " text-green-500"
                              : transaction.status === "Failed"
                              ? "text-red-500"
                              : transaction.status === "Pending"
                              ? "text-sky-500"
                              : "text-yellow-500"
                          )}
                        >
                          {transaction.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.channel}
                      </td>
                      <td className="py-3 px-4 border-b text-gray-800">
                        {transaction.date}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="text-center text-gray-800 font-semibold text-xl"
                      colSpan={7}
                    >
                      Transactions Not Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="w-full flex justify-center py-4">
              <div className="flex gap-4">
                <button
                  className={` cursor-pointer px-4 py-2 ${
                    page === 1 ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                  } text-white rounded-md  transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 `}
                  onClick={handleDcrPage}
                >
                  Prev
                </button>
                <button
                  onClick={handleIncrPage}
                  className={` cursor-pointer px-4 py-2 = text-white rounded-md ${
                    transactions.length < 20
                      ? "bg-gray-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  } transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transactions;
