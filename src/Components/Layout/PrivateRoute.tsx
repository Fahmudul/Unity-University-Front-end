import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { logout, selectToken } from "../../Redux/Features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
// import { TUser } from "../../types";
export type TUser = {
  role: string;
  userId: string;
  iat: number;
  exp: number;
};
const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector(selectToken) as string;
  let user;
  if (token) {
    user = verifyToken(token!) as TUser;
  }
  const dispatch = useAppDispatch();
  console.log(token);
  console.log(user);
  if (role != undefined && role !== user?.role) {
    dispatch(logout());
    console.log(role);
    console.log(user?.role);
    // return <Navigate to="/login" replace={true} />;
  }
  if (!token) return <Navigate to="/login" replace={true} />;
  return children;
};

export default PrivateRoute;
