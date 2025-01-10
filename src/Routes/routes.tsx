import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateStudent from "../Pages/Admin/CreateStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
]);

export default router;
