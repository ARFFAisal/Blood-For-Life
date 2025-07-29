// src/pages/dashboard/ManageUsers.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/users").then(res => setUsers(res.data));
  }, [axiosSecure]);

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/${id}`, { role });
    setUsers(users.map(u => (u._id === id ? { ...u, role } : u)));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="volunteer">Volunteer</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
