import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
export type TUniSelectProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  mode?: "multiple" | undefined;
  disabled?: boolean;
};
const UniSelect = ({
  label,
  name,
  options,
  mode,
  disabled,
}: TUniSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item name="gender" label={label} rules={[{ required: true }]}>
          <Select
            mode={mode}
            // style={{ width: "100%" }}
            placeholder="Select a option and change input text above"
            allowClear
            {...field}
            options={options}
            disabled={disabled}
          />
          {error && <span style={{ color: "red" }}>{error.message}</span>}
        </Form.Item>
      )}
    />
  );
};

export default UniSelect;
