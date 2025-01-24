import UniSelectWithWatch from "../../../Components/Form/UniSelectWithWatch";
import UniForm from "../../../Components/Form/UniForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useCreateOfferedCourseMutation,
  useGetAllCourseQuery,
  useGetAllRegisteredSemestersQuery,
} from "../../../Redux/Features/Admin/courseManagement.api";
import UniSelect from "../../../Components/Form/UniSelect";
import { useGetCourseFacultyQuery } from "../../../Redux/Features/Admin/courseManagement.api";
import { useState } from "react";
import { Button, Col, Flex } from "antd";
import UniFormInput from "../../../Components/Form/UniFormInput";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../Redux/Features/Admin/academicManagement.api";
import UniTimePicker from "../../../Components/Form/UniTimePicker";
import { weekDaysOptions } from "../../../constants/global";
import moment from "moment";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");
  const [offerCourse] = useCreateOfferedCourseMutation(undefined);
  const { data: Courses } = useGetAllCourseQuery(undefined);
  const CourseOptions = Courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));
  console.log(CourseOptions);
  const { data: AssignedCourseFaculty, isFetching: fetchingFaculties } =
    useGetCourseFacultyQuery(courseId, {
      skip: !courseId,
    });
  const AssignedFacultyOptions =
    AssignedCourseFaculty?.data?.faculties?.map(({ _id, name }) => ({
      value: _id,
      label: name.firstName,
    })) || [];
  const { data: AcademicDepartments } =
    useGetAllAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = AcademicDepartments?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const { data: AcademicFaculty } = useGetAllAcademicFacultyQuery(undefined);
  const academicFacultyOptions = AcademicFaculty?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const { data: SemesterRegistration } =
    useGetAllRegisteredSemestersQuery(undefined);

  const semesterRegistrationOptions = SemesterRegistration?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );
  // console.log(AcademicDepartments, AcademicFaculty, SemesterRegistration);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const dataWithCourseid = {
      ...data,
      course: courseId,
      maxCapacity: Number(data.maxCapacity),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };
    console.log(dataWithCourseid);
    console.log(await offerCourse(dataWithCourseid));
  };

  // console.log(
  //   academicDepartmentOptions,
  //   academicFacultyOptions,
  //   semesterRegistrationOptions
  // );
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <UniSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <UniSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <UniSelectWithWatch
            onValueChange={setCourseId}
            options={CourseOptions}
            name="course"
            label="Course"
          />
          <UniSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={AssignedFacultyOptions}
          />
          <UniFormInput type="text" name="section" label="Section" />
          <UniFormInput type="text" name="maxCapacity" label="Max Capacity" />
          <UniSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />
          <UniTimePicker name="startTime" label="Start Time" />
          <UniTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </UniForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
