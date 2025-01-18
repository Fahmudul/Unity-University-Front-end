import UniForm from "../../../Components/Form/UniForm";
import UniFormInput from "../../../Components/Form/UniFormInput";
import { FieldValues } from "react-hook-form";
import { useCreateAcademicFacultyMutation } from "../../../Redux/Features/Admin/academicManagement.api";
import { Button } from "antd";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation(undefined);
  const onSubmit = async (payload: FieldValues) => {
    // console.log(data);
    const { data } = (await createAcademicFaculty(payload)) as TResponse;
    console.log(data);
    if (data) {
      toast.success(data.message);
    } else {
      toast.error("This Academic faculty already exists");
    }
  };
  return (
    <div>
      <UniForm onSubmit={onSubmit}>
        <UniFormInput
          type="text"
          name="name"
          label="Name Of Academic Faculty"
        />
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </UniForm>
    </div>
  );
};

export default CreateAcademicFaculty;
