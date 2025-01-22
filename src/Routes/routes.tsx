import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateStudent from "../Pages/Admin/UserManagement/CreateStudent";
import { routeGenerator } from "../utils/routesGenerator";
import { AdminPaths } from "./Admin.routes";
import { StudentPaths } from "./Student.routes";
import Login from "../Pages/Student/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: routeGenerator(AdminPaths),
  },
  {
    path: "/student",
    element: <App />,
    children: routeGenerator(StudentPaths),
  },
  {
    path: "/login",
    element: <Login />,
    children: routeGenerator(StudentPaths),
  },
]);

export default router;
