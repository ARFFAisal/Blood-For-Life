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

  useEffect(() => {
    const checkUserStatus = async () => {
      if (user?.email) {
        try {
          const res = await axiosSecure.get(`/users/${user.email}`);
          setIsBlocked(res.data?.status === "blocked");
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

  if (loading || statusLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isBlocked) {
    return (
      <div className="text-center p-10 text-red-600 font-semibold text-xl">
        Your account has been blocked. Please contact the administrator.
      </div>
    );
  }

  return children;
};

export default PrivateRoute;
