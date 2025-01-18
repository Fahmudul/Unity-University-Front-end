import { Button } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../../Redux/Features/auth/authApi";
import { useAppDispatch } from "../../Redux/hooks";
import { setUser } from "../../Redux/Features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import UniForm from "../../Components/Form/UniForm";
import UniFormInput from "../../Components/Form/UniFormInput";

const Login = () => {
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [login, { data, error }] = useLoginMutation();
  console.log("data", data);
  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        id: data.id,
        password: data.password,
      };
      // console.log(data);
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken);
      console.log(user);
      dispatch(setUser({ user, token: res.data.accessToken }));
      toast.success("Login successful", { id: toastId, duration: 2000 });
      navigate(`/${user.role}/dashboard`);
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
    // console.log(res);
  };
  return (
    <UniForm onSubmit={onSubmit}>
      <div>
        <UniFormInput name="id" type="text" label={"ID"} />
      </div>
      <div>
        <UniFormInput name="password" type="password" label={"Password"} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </UniForm>
  );
};

export default Login;
