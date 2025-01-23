import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam, TStudent } from "../../../types";
import { useGetAllStudentsQuery } from "../../../Redux/Features/Admin/userManagement.api";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../Components/Layout/Modal";

export type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo"
> & { status: string };

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    { name: "limit", value: 3 },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const metaData = studentData?.meta;
  console.log(metaData);
  const tableData = studentData?.data?.map(
    ({ _id, fullName, id, user, email, contactNo }) => ({
      key: _id,
      fullName,
      userId: user._id,
      status: user.status,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "fullName",
    },

    {
      title: "Roll No.",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Action",
      key: "x",
      dataIndex: "userId",
      render: (item, record) => {
        console.log(record);
        return (
          <Space>
            <Link to={`/admin/student-data/${item}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <ConfirmationModal id={item} status={record?.status} />
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </>
  );
};

export default StudentData;
