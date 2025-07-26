import { Navigate } from "react-router";
import UseRole from "../hooks/UseRole";
import AdminDashboard from "./AdminDashboard";

export default function Dashboard() {
  const { role, loading } = UseRole();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (role === "user") {
    return <div>User Dashboard</div>;
  }
  if (role === "moderator") {
    return <div>Moderator Dashboard</div>;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  }

  return <Navigate to={"/"} />;
}
