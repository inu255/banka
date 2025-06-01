import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./useAuth";
import { Spin } from "antd";

export const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div>
        <Spin size="large" fullscreen />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
