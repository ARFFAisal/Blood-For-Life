import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  const fetchUsers = () => {
    axiosSecure.get("/get-users").then(({ data }) => {
      setUsers(data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = (e, email) => {
    const role = e.target.value;
    axiosSecure
      .patch("/update-role", { email, role })
      .then(({ data }) => {
        if (data.modifiedCount) {
          alert("✅ User role updated!");
          fetchUsers();
        }
      })
      .catch(() => alert("❌ Failed to update role."));
  };

  const handleStatusToggle = (user) => {
    const newStatus = user.status === "blocked" ? "active" : "blocked";
    axiosSecure
      .patch("/update-status", { email: user.email, status: newStatus })
      .then(({ data }) => {
        if (data.modifiedCount) {
          alert(
            `✅ User ${newStatus === "blocked" ? "blocked" : "unblocked"}!`
          );
          fetchUsers();
        }
      })
      .catch(() => alert("❌ Failed to update status."));
  };

  return (
    <div className="p-6 overflow-x-auto bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-gray-100">
        🛡️ Admin Dashboard
      </h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-200">
            <th className="border px-3 py-2">#</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Role</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Login Count</th>
            <th className="border px-3 py-2">Created At</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr
              key={user.email}
              className="text-center border-b border-gray-300 dark:border-gray-700"
            >
              <td className="px-3 py-2 text-gray-900 dark:text-gray-100">{idx + 1}</td>
              <td className="px-3 py-2 text-blue-700 dark:text-blue-400">{user.email}</td>
              <td className="px-3 py-2 capitalize">
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(e, user.email)}
                  className="border px-2 py-1 rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="user" className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                    User
                  </option>
                  <option value="moderator" className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                    Moderator
                  </option>
                  <option value="admin" className="bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100">
                    Admin
                  </option>
                </select>
              </td>
              <td className="px-3 py-2 capitalize text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    user.status === "blocked"
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                >
                  {user.status || "active"}
                </span>
              </td>
              <td className="px-3 py-2 text-gray-900 dark:text-gray-100">{user.loginCount || 1}</td>
              <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-300">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="px-3 py-2">
                <button
                  onClick={() => handleStatusToggle(user)}
                  className={`px-3 py-1 rounded text-white text-sm ${
                    user.status === "blocked"
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {user.status === "blocked" ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
