import OfferedCourse from "../Pages/Student/OfferedCourse";
import StudentDashboard from "../Pages/Student/StudentDashboard";

export const StudentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
];
