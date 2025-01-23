import { Button, Col, Flex } from "antd";
import UniForm from "../../../Components/Form/UniForm";
import { FieldValues } from "react-hook-form";
import UniSelect from "../../../Components/Form/UniSelect";
import { semesterName } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicSemesterSchema } from "../../../Schema/AcademicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../Redux/Features/Admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";

const CreateAcademicSemester = () => {
  const currentYear = new Date().getFullYear();
  const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    value: String(currentYear + number),
    label: String(currentYear + number),
  }));
  const [addAcademicSemester] = useAddAcademicSemesterMutation(undefined);
  const onSubmit = async (data: FieldValues) => {
    // console.log(data);
    const name = semesterName[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
      year: data.year,
    };
    const res = (await addAcademicSemester(semesterData)) as TResponse;
    if (res.error) return toast.error(res.error.data.message);
    toast.success("Academic Semester created successfully");
    console.log(res);
  };

  return (
    <Flex justify={"center"} align={"middle"}>
      <Col span={6}>
        <UniForm
          onSubmit={onSubmit}
          resolver={zodResolver(AcademicSemesterSchema)}
        >
          <div>
            <UniSelect label={"Semester"} name="name" options={semesterName} />
            <UniSelect label={"Year"} name="year" options={yearOptions} />
            <UniSelect
              label={"Start Month"}
              name="startMonth"
              options={monthOptions}
            />
            <UniSelect
              label={"End Month"}
              name="endMonth"
              options={monthOptions}
            />
          </div>
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
