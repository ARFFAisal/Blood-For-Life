import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function DashboardLayout() {
  const { user, logOut } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    const fetchRole = async () => {
      try {
        const res = await axiosSecure.get("/get-user-role");
        setRole(res.data.role);
      } catch (err) {
        console.error("Role fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRole();
  }, [user, axiosSecure]);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner text-red-500"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-red-100 shadow-lg p-4 hidden md:block">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-red-600">Dashboard</h2>
          <p className="text-sm text-gray-600">{user?.email}</p>
        </div>

        <ul className="space-y-2">
          {/* Profile */}
          <li>
            <Link to="/dashboard/profile" className="block p-2 hover:bg-red-200 rounded">Profile</Link>
          </li>

          {/* User Routes */}
          {role === "user" && (
            <>
              <li>
                <Link to="/dashboard/create-request" className="block p-2 hover:bg-red-200 rounded">Create Request</Link>
              </li>
              <li>
                <Link to="/dashboard/my-requests" className="block p-2 hover:bg-red-200 rounded">My Requests</Link>
              </li>
            </>
          )}

          {/* Volunteer Routes */}
          {role === "volunteer" && (
            <>
              <li>
                <Link to="/dashboard/all-requests" className="block p-2 hover:bg-red-200 rounded">All Requests</Link>
              </li>
              <li>
                <Link to="/dashboard/volunteer-blogs" className="block p-2 hover:bg-red-200 rounded">Blog Control</Link>
              </li>
            </>
          )}

          {/* Admin Routes */}
          {role === "admin" && (
            <>
              <li>
                <Link to="/dashboard/manage-users" className="block p-2 hover:bg-red-200 rounded">Manage Users</Link>
              </li>
              <li>
                <Link to="/dashboard/manage-blogs" className="block p-2 hover:bg-red-200 rounded">Manage Blogs</Link>
              </li>
            </>
          )}

          {/* Logout */}
          <li>
            <button onClick={handleLogout} className="w-full p-2 text-left text-red-600 hover:bg-red-200 rounded">
              Logout
            </button>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white p-4">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-4">
          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <details className="dropdown">
              <summary className="btn btn-sm btn-outline">Menu</summary>
              <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52 mt-2 z-50">
                <li><Link to="/dashboard/profile">Profile</Link></li>
                {role === "user" && (
                  <>
                    <li><Link to="/dashboard/create-request">Create Request</Link></li>
                    <li><Link to="/dashboard/my-requests">My Requests</Link></li>
                  </>
                )}
                {role === "volunteer" && (
                  <>
                    <li><Link to="/dashboard/all-requests">All Requests</Link></li>
                    <li><Link to="/dashboard/volunteer-blogs">Blog Control</Link></li>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <li><Link to="/dashboard/manage-users">Manage Users</Link></li>
                    <li><Link to="/dashboard/manage-blogs">Manage Blogs</Link></li>
                  </>
                )}
                <li><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </details>
          </div>

          {/* Content Management Button for Admins */}
          {role === "admin" && (
            <button
              onClick={() => navigate("/dashboard/content-management")}
              className="btn btn-sm bg-red-600 text-white hover:bg-red-700"
            >
              📝 Content Management
            </button>
          )}
        </div>

        {/* Nested Route */}
        <Outlet />
      </main>
    </div>
  );
}
