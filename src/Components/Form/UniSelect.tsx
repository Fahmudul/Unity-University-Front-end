import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
type TUniSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[];
};
const UniSelect = ({ label, name, options }: TUniSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item name="gender" label={label} rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            allowClear
            {...field}
            options={options}
          />
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </Form.Item>
      )}
    />
  );
};

export default UniSelect;
