import Input from "antd/es/input/Input";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  type: string;
  name: string;
  label?: string;
};
const UniFormInput = ({ name, type, label }: TInputProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <>
          <label htmlFor={name}>{label}</label>
          <Input
            style={{ marginBottom: "10px" }}
            {...field}
            type={type}
            id={name}
          />
        </>
      )}
    />
  );
};

export default UniFormInput;
