import { Button, Table, TableProps } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../Redux/Features/Admin/academicManagement.api";
import { Link, NavLink } from "react-router-dom";
interface DataType {
  key: string;
  name: string;
  academicFaculty: string;
  academicFacultyId: string;
}
const columns: TableProps<DataType>["columns"] = [
  {
    title: "Department ",
    dataIndex: "name",
    key: "academicFaculty",
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
    key: "academicFaculty",
  },
  {
    title: "Action",
    dataIndex: "academicFacultyId",
    key: "action",
    render: (item) => {
      console.log(item);
      return (
        <Link to={`/admin/academic-department/${item}`}>
          <Button>Details</Button>
        </Link>
      );
    },
  },
];
const AcademicDepartment = () => {
  const { data, isLoading } = useGetAllAcademicDepartmentQuery(undefined);
  console.log(data);
  const dataList = data?.data?.map((item) => ({
    key: item._id,
    name: item.name,
    academicFaculty: item.academicFaculty.name,
    academicFacultyId: item.academicFaculty._id,
  }));
  return <Table dataSource={dataList} loading={isLoading} columns={columns} />;
};

export default AcademicDepartment;
