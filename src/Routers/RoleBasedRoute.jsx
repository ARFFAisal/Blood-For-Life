// RoleBasedRoute.jsx
import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../pages/Loading";

export default function RoleBasedRoute({ allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (user?.email) {
      const fetchRole = async () => {
        try {
          const res = await axiosSecure.get(`/users/role?email=${user.email}`);
          setRole(res.data.role);
        } catch (err) {
          console.error("Failed to fetch role:", err);
        } finally {
          setChecking(false);
        }
      };
      fetchRole();
    }
  }, [user?.email, axiosSecure]);

  if (loading || checking) return <Loading />;

  if (allowedRoles.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
