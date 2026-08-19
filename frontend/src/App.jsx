import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./components/DashBoard";
import UserDashBoard from "./components/UserDashBoard";
import DashBoardWrapper from "./components/DashBoardWrapper";
import CreateRole from "./components/CreateRole";
import AddFilter from "./components/AddFilter";
import ManageUser from "./components/ManageUser";
import CreateUser from "./components/CreateUser";
import EditUser from "./components/EditUser";
import ViewUser from "./components/ViewUser";
import Transactions from "./components/Transactions";
import ManageRoles from "./components/ManageRoles";
import EditRole from "./components/EditRole";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ViewRole from "./components/ViewRole";
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavBar />

      <ToastContainer autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/admin" element={<DashBoardWrapper />}>
            <Route path="" element={<DashBoard />} />
            <Route path="create-role" element={<CreateRole />} />
            <Route path="add-filter" element={<AddFilter />} />
            <Route path="manage-users" element={<ManageUser />} />
            <Route path="create-user" element={<CreateUser />} />
            <Route path="edit-user/:userId" element={<EditUser />} />
            <Route path="view-user/:userId" element={<ViewUser />} />
            <Route path="manage-roles" element={<ManageRoles />} />
            <Route path="edit-role/:roleId" element={<EditRole />} />
            <Route path="view-role/:roleId" element={<ViewRole />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard/user" element={<DashBoardWrapper />}>
            <Route path="" element={<UserDashBoard />} />
            <Route path="transactions" element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
      {/* <ReactQueryDevtools initialIsOpen={false} position="bottom" /> */}
    </QueryClientProvider>
  );
}

export default App;
