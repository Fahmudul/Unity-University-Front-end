import React from "react";
import { useGetSingleStundetQuery } from "../../../Redux/Features/Admin/userManagement.api";
import { useParams } from "react-router-dom";

const SingleStudentData = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data, isLoading, isFetching } = useGetSingleStundetQuery(id);
  console.log(data);
  return <div></div>;
};

export default SingleStudentData;
