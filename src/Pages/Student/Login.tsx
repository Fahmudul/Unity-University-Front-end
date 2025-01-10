import { Button } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../Redux/Features/auth/authApi";
import { useAppDispatch } from "../../Redux/hooks";
import { setUser } from "../../Redux/Features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [login, { data, error }] = useLoginMutation();
  console.log("data", data);
  const onSubmit = async (data) => {
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    console.log(data);
    const res = await login(userInfo).unwrap();
    const user = verifyToken(res.data.accessToken);
    console.log(user);
    dispatch(setUser({ user, token: res.data.accessToken }));
    // console.log(res);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" {...register("id")} />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" {...register("password")} />
      </div>
      <Button htmlType="submit">Submit</Button>
    </form>
  );
};

export default Login;
