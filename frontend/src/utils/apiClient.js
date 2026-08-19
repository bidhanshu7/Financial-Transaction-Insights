import axios, { AxiosError } from "axios";
import { store } from "../redux/store";
import { SignOut, UpdateToken } from "../redux/slice/userSlice";
import { RemoveFilterTypes } from "../redux/slice/filterTypeSlice";
import { toast } from "react-toastify";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const getTokenFromStore = () => {
  const state = store.getState();
  return state.user.token;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenFromStore();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const generateAccessToken = async () => {
  try {
    const response = await apiClient.get("/api/refresh");

    console.log(response);
    if (response && response.data) {
      store.dispatch(UpdateToken({ token: response.data.token }));
      return response.data.token;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast(error.response?.data.message || "Failed to refresh token", {
        type: "error",
      });
      return null;
    }
  }
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        if (
          error.response?.data.message === "Refresh Token expired" ||
          error.response?.data.message === "Token not found"
        ) {
          console.log("Unauthorized user signed out");
          store.dispatch(RemoveFilterTypes());
          toast("User Token Expired", {
            type: "info",
          });
          store.dispatch(SignOut());
        } else {
          const newToken = await generateAccessToken();

          console.log(newToken);
          if (newToken) {
            error.config.headers["Authorization"] = `Bearer ${newToken}`;

            return axios(error.config);
          }
        }
      }
    } else {
      console.log("Something went wrong", error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
