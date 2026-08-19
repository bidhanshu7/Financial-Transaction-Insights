import React from "react";
import Button from "@mui/material/Button";

const Home = () => {
  return (
    <main className="h-screen w-full flex  justify-center items-center bg-gray-100">
      <div className="flex w-full max-sm:flex-col max-w-4xl px-4 py-8 bg-white shadow-lg rounded-lg">
        <div className="pt-8 w-full md:w-1/2 max-sm:order-2">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            Welcome to Financial Transaction Insights
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get detailed insights into your financial transactions, track your
            expenses, and make informed decisions for your financial future.
          </p>
          <div className="flex gap-4">
            <Button
              variant="contained"
              color="primary"
              className="w-full md:w-auto text-white"
            >
             <a href="/signin">Sign In</a> 
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="w-full md:w-auto text-blue-600 border-blue-600"
            >
              Sign Up
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 max-sm:order-1 flex justify-center items-center">
          <img
            src="/logo.png" 
            alt="Financial Insights"
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
