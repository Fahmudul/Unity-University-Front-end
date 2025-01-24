import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
type TUniSelectWithWatchProps = {
  label: string;
  name: string;
  options?: { value: string; label: string; disabled?: boolean }[];
  mode?: "multiple" | undefined;
  onValueChange: (value: string) => void;
};
const UniSelectWithWatch = ({
  label,
  name,
  options,
  mode,
  onValueChange,
}: TUniSelectWithWatchProps) => {
  const { control } = useFormContext();
  const id = useWatch({
    name: name,
    control,
  });
  // console.log(id);
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        // console.log(name);
        return (
          <Form.Item name="gender" label={label} rules={[{ required: true }]}>
            <Select
              mode={mode}
              // style={{ width: "100%" }}
              placeholder="Select a option and change input text above"
              allowClear
              {...field}
              options={options}
              onChange={(value) => onValueChange(value)}
            />
            {error && <span style={{ color: "red" }}>{error.message}</span>}
          </Form.Item>
        );
      }}
    />
  );
};

export default UniSelectWithWatch;
