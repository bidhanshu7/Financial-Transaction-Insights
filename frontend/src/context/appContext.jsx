import { createContext } from "react";
import apiClient from "../utils/apiClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { AddFilterTypes } from "../redux/slice/filterTypeSlice";

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const fetchFilterCountDetails = async () => {
    try {
      const response = await apiClient.get(
        "/api/transaction/getTransactionCountByStatus"
      );

      if (response && response.data) {
        return response.data.status;
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
      }
    }
  };

  const fetchFilterType = async () => {
    try {
      const response = await apiClient.get("/api/admin/action/getFilterTypes");

      if (response.data) {
        return dispatch(AddFilterTypes(response.data.filterTypes));
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

  return (
    <appContext.Provider value={{ fetchFilterCountDetails, fetchFilterType }}>
      {children}
    </appContext.Provider>
  );
};
