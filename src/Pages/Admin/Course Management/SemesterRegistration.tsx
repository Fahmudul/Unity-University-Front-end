import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { semesterStatusOptions } from "../../../constants/semester";

import { toast } from "sonner";
// import { useAddRegisteredSemesterMutation } from "../../../redux/Features/Admin/courseManagement";
import { TResponse } from "../../../types";
import UniForm from "../../../Components/Form/UniForm";
import UniSelect from "../../../Components/Form/UniSelect";
import {
  useAddAcademicSemesterMutation,
  useGetAllSemestersQuery,
} from "../../../Redux/Features/Admin/academicManagement.api";
import UniFormInput from "../../../Components/Form/UniFormInput";
import UniDateSelect from "../../../Components/Form/UniDateSelect";
import { useAddSemesterRegistrationMutation } from "../../../Redux/Features/Admin/courseManagement.api";

const SemesterRegistration = () => {
  const [addSemester] = useAddSemesterRegistrationMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <UniSelect
            name="status"
            label="Status"
            options={semesterStatusOptions}
          />
          <UniDateSelect name="startDate" label="Start Date" />
          <UniDateSelect name="endDate" label="End Date" />
          <UniFormInput type="text" name="minCredit" label="Min Credit" />
          <UniFormInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
