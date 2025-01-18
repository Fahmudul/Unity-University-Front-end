import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../Redux/Features/Admin/academicManagement.api";
interface DataType {
  key: React.Key;
  _id: string;
  name: string;
  code: string;
  startMonth: string;
  endMonth: string;
  year: number;
}
const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Code",
    dataIndex: "code",
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
  },
  {
    title: "Year",
    dataIndex: "year",
  },
];
const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  // console.log(data);
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log({ filters, sorter, extra, pagination });
  };
  const semesterData = data?.data.map(
    ({ _id, name, code, startMonth, endMonth, year }: DataType) => ({
      key: _id,
      name,
      code,
      startMonth,
      endMonth,
      year,
    })
  );
  return (
    <Table<DataType>
      columns={columns}
      dataSource={semesterData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
