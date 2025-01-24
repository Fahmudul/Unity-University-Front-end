import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import { semesterStatusOptions } from "../../../constants/semester";

import { toast } from "sonner";
// import { useAddRegisteredSemesterMutation } from "../../../redux/Features/Admin/courseManagement";
import UniForm from "../../../Components/Form/UniForm";
import UniSelect from "../../../Components/Form/UniSelect";

import UniFormInput from "../../../Components/Form/UniFormInput";
import UniDateSelect from "../../../Components/Form/UniDateSelect";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "../../../Redux/Features/Admin/courseManagement.api";

const CreateCourse = () => {
  let { data: CoursesData } = useGetAllCourseQuery(undefined);
  const [addCourse] = useCreateCourseMutation();
  CoursesData = CoursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating course...");

    const courseData = {
      ...data,
      isDeleted: false,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses.map((item: string) => ({
        course: item,
        isDeleted: false,
      })),
    };
    try {
      const res = await addCourse(courseData);
      console.log(res);
      if (res.data.success) {
        toast.success("Course created", { id: toastId });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniFormInput type="text" name="title" label="Course Title" />
          <UniFormInput type="text" name="prefix" label="Prefix" />
          <UniFormInput type="text" name="code" label="Course Code" />
          <UniFormInput type="text" name="credits" label="Credits" />
          <UniSelect
            label="Prerequisites Course"
            name="preRequisiteCourses"
            options={CoursesData}
            mode="multiple"
          />
          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
