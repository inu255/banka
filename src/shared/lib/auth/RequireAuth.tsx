import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "./useAuth";

export const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Загрузка...</div>; // TODO: loader
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // return <>{children}</>;
  return <Outlet />;
};
