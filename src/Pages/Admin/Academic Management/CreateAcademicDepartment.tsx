import React from "react";
import UniForm from "../../../Components/Form/UniForm";
import UniFormInput from "../../../Components/Form/UniFormInput";
import { FieldValues } from "react-hook-form";
import UniSelect from "../../../Components/Form/UniSelect";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../Redux/Features/Admin/academicManagement.api";
import { Button } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicDepartmentSchema } from "../../../Schema/AcademicSemesterSchema";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicDepartment = () => {
  let { data: academicFacultyList } = useGetAllAcademicFacultyQuery(undefined);
  academicFacultyList = academicFacultyList?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  console.log(academicFacultyList);

  const [createAcademicDepartment] =
    useCreateAcademicDepartmentMutation(undefined);
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const { data: res } = (await createAcademicDepartment(data)) as TResponse;
    console.log(res);
    if (res) {
      toast.success(res.message);
    } else {
      toast.error("This academic department already exists");
    }
  };
  return (
    <div>
      <UniForm
        onSubmit={onSubmit}
        resolver={zodResolver(AcademicDepartmentSchema)}
      >
        <UniFormInput type="text" name="name" label="Name Of Department" />
        <UniSelect
          label="Academic Faculty"
          name="academicFaculty"
          options={academicFacultyList}
        />
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </UniForm>
    </div>
  );
};

export default CreateAcademicDepartment;
