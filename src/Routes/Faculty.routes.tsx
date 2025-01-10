import FacultyDashboard from "../Pages/Faculty/FacultyDashboard";
import OfferedCourse from "../Pages/Faculty/OfferedCourse";

export const FacultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
