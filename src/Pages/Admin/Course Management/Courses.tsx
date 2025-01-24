import { Button, Modal, Table } from "antd";
import {
  useAssignCourseFacultyMutation,
  useGetAllCourseQuery,
} from "../../../Redux/Features/Admin/courseManagement.api";
// import { TTableData } from "./RegisteredSemesters";
import { useState } from "react";
import { useGetAllFacultyQuery } from "../../../Redux/Features/Admin/userManagement.api";
import UniSelect from "../../../Components/Form/UniSelect";
import UniForm from "../../../Components/Form/UniForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const Courses = () => {
  const { data: Coureses } = useGetAllCourseQuery(undefined);
  const CourseData = Coureses?.data?.map((item) => ({
    title: item.title,
    code: item.code,
    credits: item.credits,
    courseId: item._id,
  }));

  const columns = [
    {
      title: "Course Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      key: "credits",
    },
    {
      title: "Action",
      dataIndex: "courseId",
      key: "courseId",
      render: (item: string) => <AssignFaculties courseId={item} />,
    },
  ];
  // console.log(Coureses);

  return <Table columns={columns} dataSource={CourseData} />;
};

export const AssignFaculties = ({ courseId }) => {
  const { data: Faculties } = useGetAllFacultyQuery(undefined);
  // console.log(Faculties);
  const [assignFaculty] = useAssignCourseFacultyMutation();
  const FacultyData = Faculties?.data?.map((item) => ({
    label: `${item.name.firstName} ${item.name.lastName}`,
    value: item._id,
  }));
  // console.log(FacultyData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log({ data, courseId });
    const toastId = toast.loading("Assigning...");
    console.log({ courseId, faculties: data.faculties });
    try {
      const res = await assignFaculty({ courseId, faculties: data.faculties });
      if (res?.data?.success) {
        toast.success("Faculty assigned successfully", { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
      // console.log(res);
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button onClick={showModal}>Assign Faculty</Button>
      <Modal
        title="Available Faculties"
        open={isModalOpen}
        okText="Assign"
        footer={null}
        onCancel={() => setIsModalOpen(false)}
      >
        <UniForm onSubmit={onSubmit}>
          <UniSelect
            label={"Faculty"}
            name="faculties"
            options={FacultyData}
            mode="multiple"
          />
          <Button type="primary" htmlType="submit">
            Assign
          </Button>
        </UniForm>
      </Modal>
    </>
  );
};

export default Courses;
