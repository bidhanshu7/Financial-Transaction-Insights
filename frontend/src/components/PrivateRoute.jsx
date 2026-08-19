import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const PrivateRoute = () => {
  const { currentUser, isAdmin } = useSelector((state) => state.user);
  const location = useLocation(); 


  if (currentUser) {
    if (isAdmin && location.pathname.startsWith("/dashboard/admin")) {
      return <Outlet />;
    }
    if (!isAdmin && location.pathname.startsWith("/dashboard/user")) {
      return <Outlet />;
    }
    if (isAdmin) {
      return <Navigate to="/dashboard/admin" replace />;
    }
    return <Navigate to="/dashboard/user" replace />;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default PrivateRoute;
