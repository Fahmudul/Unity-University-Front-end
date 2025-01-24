import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateStudent from "../Pages/Admin/UserManagement/CreateStudent";
import { routeGenerator } from "../utils/routesGenerator";
import { AdminPaths } from "./Admin.routes";
import { StudentPaths } from "./Student.routes";
import Login from "../Pages/Student/Login";
import PrivateRoute from "../Components/Layout/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute role={undefined}>
        {" "}
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute role={"admin"}>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(AdminPaths),
  },
  {
    path: "/student",
    element: (
      <PrivateRoute role={"student"}>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(StudentPaths),
  },
  {
    path: "/login",
    element: <Login />,
    children: routeGenerator(StudentPaths),
  },
]);

export default router;
