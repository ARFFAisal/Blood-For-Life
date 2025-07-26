import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../pages/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);

  // ⏳ Wait until auth loads, then check status from DB
  useEffect(() => {
    const checkUserStatus = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          if (res.data?.status === "blocked") {
            setIsBlocked(true);
          } else {
            setIsBlocked(false);
          }
        } catch (err) {
          console.error("Failed to fetch user status", err);
        }
      }
      setStatusLoading(false);
    };

    if (user) {
      checkUserStatus();
    } else {
      setStatusLoading(false);
    }
  }, [user, axiosSecure]);

  // Still loading Firebase
  if (loading || statusLoading) {
    return <Loading />;
  }

  // 🔒 Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ⛔ Blocked users not allowed
  if (isBlocked) {
    return (
      <div className="text-center p-10 text-red-600 font-semibold text-xl">
        Your account has been blocked. Please contact the administrator.
      </div>
    );
  }

  // ✅ Authenticated and active user
  return children;
};

export default PrivateRoute;
