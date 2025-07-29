// RoleBasedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function RoleBasedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/role/${user.email}`).then((res) => {
        setRole(res.data?.role);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [user, axiosSecure]);

  if (loading || isLoading) {
    return <div className="text-center text-lg font-medium py-10">Loading...</div>;
  }

  if (user && allowedRoles.includes(role)) {
    return children;
  }

  return <Navigate to="/" replace />;
}
