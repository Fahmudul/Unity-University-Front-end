import AdminDashboard from "../Pages/Admin/AdminDashboard";
import CreateAdmin from "../Pages/Admin/UserManagement/CreateAdmin";
import CreateFaculty from "../Pages/Admin/UserManagement/CreateFaculty";
import CreateStudent from "../Pages/Admin/UserManagement/CreateStudent";
import { ReactNode } from "react";
import AcademicSemester from "../Pages/Admin/Academic Management/AcademicSemester";
import CreateAcademicSemester from "../Pages/Admin/Academic Management/CreateAcademicSemester";
import AcademicDepartment from "../Pages/Admin/Academic Management/AcademicDepartment";
import CreateAcademicDepartment from "../Pages/Admin/Academic Management/CreateAcademicDepartment";
import CreateAcademicFaculty from "../Pages/Admin/Academic Management/CreateAcademicFaculty";
import AcademicFaculty from "../Pages/Admin/Academic Management/AcademicFaculty";
import StudentData from "../Pages/Admin/UserManagement/StudentData";
import SingleStudentData from "../Pages/Admin/UserManagement/SingleStudentData";
import SemesterRegistration from "../Pages/Admin/Course Management/SemesterRegistration";
import RegisteredSemesters from "../Pages/Admin/Course Management/RegisteredSemesters";
import CreateCourse from "../Pages/Admin/Course Management/CreateCourse";
import Courses from "../Pages/Admin/Course Management/Courses";
import OfferCourse from "../Pages/Admin/Course Management/OfferCourse";
import OfferedCourses from "../Pages/Admin/Course Management/OfferedCourses";
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
    name: "Academic Management",
    children: [
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create Semester",
        path: "create-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A.Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
      {
        name: "Create Department",
        path: "create-department",
        element: <CreateAcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      { name: "Create Admin", path: "create-admin", element: <CreateAdmin /> },
      {
        name: "Students Data",
        path: "students-data",
        element: <StudentData />,
      },
      {
        path: "student-data/:id",
        element: <SingleStudentData />,
      },
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
  {
    name: "Course Mangement",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semesters",
        path: "registered-semesters",
        element: <RegisteredSemesters />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourses />,
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
