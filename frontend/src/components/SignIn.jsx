import React, { useState } from "react";
import { toast } from "react-toastify";
import apiClient from "../utils/apiClient";
import { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from "../redux/slice/userSlice";
import { Loader2 } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useSelector((state) => state.user);

  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "user",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(SignInStart());

    if (formData.email === "" || formData.password === "") {
      return toast("Please provide the credentials", { type: "error" });
    }

    try {
      let url = "";
      if (formData.type === "admin") {
        url = "/api/admin/signin";
      } else if (formData.type === "user") {
        url = "/api/user/signInUser";
      } else {
        return toast("Invalid user type", { type: "error" });
      }

      const response = await apiClient.post(url, formData);

      if (response.data) {
        dispatch(SignInSuccess(response.data));
        toast(response.data.message, { type: "success" });
        navigate(`/dashboard/${formData.type}`);
      }
    } catch (error) {
      console.error(error);
      dispatch(
        SignInFailure(error?.response?.data?.message || "Something went wrong")
      );

      if (error instanceof AxiosError && error.response) {
        return toast(error.response.data.message, { type: "error" });
      }

      return toast("An unexpected error occurred. Please try again.", {
        type: "error",
      });
    }
  };

  if (currentUser) {
    if (isAdmin) {
      return <Navigate to="/dashboard/admin" replace />;
    } else {
      return <Navigate to="/dashboard/user" replace />;
    }
  }

  return (
    <main className="h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md px-8 py-10 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>
        <form className="space-y-4 w-full" onSubmit={handleSubmit}>
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
              value={formData.email}
              required
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              required
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.password}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Select Account Type
            </label>
            <select
              name="type"
              id="type"
              onChange={handleChange}
              value={formData.type}
              className=" w-full border-gray-300 px-4 py-3 border mt-1 rounded-lg focus:outline-none"
            >
              <option value="user" className=" rounded-lg">
                user
              </option>
              <option value="admin" className=" rounded-lg">
                admin
              </option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              {user.isLoading ? (
                <>
                  Loading..... <Loader2 className="  animate-spin" />
                </>
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
        {/* <div className="mt-4 text-center">
          <p className="text-sm">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800">
              Sign up
            </a>
          </p>
        </div> */}
      </div>
    </main>
  );
};

export default SignIn;
