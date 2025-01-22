import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
type TDatePickerProps = {
  name: string;
  label?: string;
};
const UniDateSelect = ({ name, label }: TDatePickerProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker {...field} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UniDateSelect;
