import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context";

export default function Protected() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="screen-loader">
        <div className="loader-logo">d</div>
        <p>Loading Digle...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
