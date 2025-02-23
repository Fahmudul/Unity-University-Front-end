import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { AdminPaths } from "../../Routes/Admin.routes";
import { FacultyPaths } from "../../Routes/Faculty.routes";
import { StudentPaths } from "../../Routes/Student.routes";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { useAppSelector } from "../../Redux/hooks";
// import { selectUser } from "../../Redux/Features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { selectToken } from "../../Redux/Features/auth/authSlice";
import { TUser } from "./PrivateRoute";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  // const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  let user;
  if (token) {
    user = verifyToken(token!);
  }
  let sidebarItems;
  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(AdminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemsGenerator(FacultyPaths, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemsGenerator(StudentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          height: "32px",
          margin: "16px",
          color: "#fff",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Unity University</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems as ItemType<MenuItemType>[]}
      />
    </Sider>
  );
};

export default Sidebar;
