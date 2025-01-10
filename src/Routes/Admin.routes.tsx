import { NavLink } from "react-router-dom";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateAdmin from "../Pages/Admin/CreateAdmin";
import CreateFaculty from "../Pages/Admin/CreateFaculty";
import CreateStudent from "../Pages/Admin/CreateStudent";
import { ReactNode } from "react";
export type TAdminSideBarItems = {
  key: string;
  label: ReactNode;
  children?: TAdminSideBarItems[];
};

export type TAdminRoutes = {
  path: string;
  element: ReactNode;
};
export const AdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Management",
    children: [
      { name: "Create Admin", path: "create-admin", element: <CreateAdmin /> },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
    ],
  },
];

// export const AdminSideBarItems = AdminPaths.reduce(
//   (acc: TAdminSideBarItems[], item) => {
//     if (item.path && item.path) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

// export const AdminRoutes = AdminPaths.reduce((acc: TAdminRoutes[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }
//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }
//   return acc;
// }, []);
