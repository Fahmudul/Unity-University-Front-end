import { ReactNode } from "react";
import { useAppSelector } from "../../Redux/hooks";
import { selectToken } from "../../Redux/Features/auth/authSlice";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(selectToken);
  console.log(token);
  if (!token) return <Navigate to="/login" replace={true} />;
  return children;
};

export default PrivateRoute;
