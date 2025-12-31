import { Navigate, Outlet } from "react-router";
import type { RootState } from "../store";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { accessToken } = useAppSelector((state: RootState) => state.auth);

  return accessToken ? (
    children || <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
