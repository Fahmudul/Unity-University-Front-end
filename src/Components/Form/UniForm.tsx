import { Row } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;
const UniForm = ({
  onSubmit,
  children,
  resolver,
  defaultValues,
}: TFormProps) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) formConfig.defaultValues = defaultValues;
  if (resolver) formConfig.resolver = resolver;
  const methods = useForm(formConfig);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <Row
      // justify={"center"}
      // align={"middle"}
      style={{ height: "100%", width: "100%" }}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(submit)} style={{ width: "100%" }}>
          {children}
        </form>
      </FormProvider>
    </Row>
  );
};

export default UniForm;
