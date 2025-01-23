import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../Redux/Features/Admin/academicManagement.api";
import { Key, useState } from "react";
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

type TQueryParams = { name: string; value: string }[];
const AcademicSemester = () => {
  const [params, setparams] = useState<TQueryParams>([]);
  const { data, isLoading, isFetching } = useGetAllSemestersQuery(params);
  // console.log(data);
  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParams = [];
      filters?.name?.forEach((item: boolean | Key) => {
        const itemName = item as string;
        queryParams.push({ name: "name", value: itemName });
      });
      setparams(queryParams);
    }
    console.log({ filters, sorter, extra, pagination });
  };
  const semesterData = data?.data?.map(
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
      loading={isLoading || isFetching}
      columns={columns}
      dataSource={semesterData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
