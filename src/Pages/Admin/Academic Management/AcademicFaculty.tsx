import { Button, Table, TableProps } from "antd";
import { useGetAllAcademicFacultyQuery } from "../../../Redux/Features/Admin/academicManagement.api";
interface IDataType {
  key: string;
  name: string;
}
const columns: TableProps<IDataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <div>
        <Button type="primary">Edit</Button>
        <Button type="primary">View More</Button>
      </div>
    ),
  },
];

const AcademicFaculty = () => {
  const { data } = useGetAllAcademicFacultyQuery(undefined);
  console.log(data);
  const academicFacultyData = data?.data?.map((item) => ({
    key: item._id,
    name: item.name,
  }));
  return <Table dataSource={academicFacultyData} columns={columns} />;
};

export default AcademicFaculty;
