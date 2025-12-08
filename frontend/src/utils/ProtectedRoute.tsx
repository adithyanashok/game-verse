import { Navigate } from "react-router";
import type { RootState } from "../store";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = sessionStorage.getItem("user");
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  console.log(user);
  return accessToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
