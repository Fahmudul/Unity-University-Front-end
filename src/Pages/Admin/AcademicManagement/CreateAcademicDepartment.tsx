import React from "react";
import UniForm from "../../../Components/Form/UniForm";
import UniFormInput from "../../../Components/Form/UniFormInput";
import { FieldValues } from "react-hook-form";

const CreateAcademicDepartment = () => {
  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div>
      <UniForm onSubmit={onSubmit}>
        <UniFormInput type="text" name="departmentName" label="Name Of Department" />
      </UniForm>
    </div>
  );
};

export default CreateAcademicDepartment;
