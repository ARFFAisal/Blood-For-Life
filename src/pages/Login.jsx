import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../src/providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure"; // adjust path

export default function Login() {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      const user = result.user;

      const userData = {
        email: user.email,
        name: user.displayName || "No Name",
        photo: user.photoURL || "",
        loginCount: 1,
        role: "user",
        status: "active",
      };

      // Send with auth headers
      await axiosSecure.post("/add-user", userData);

      reset();
      navigate("/");
    } catch (err) {
      console.error("Login failed", err);
      alert("Login failed: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Login
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-300"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* 🔗 Link to Register */}
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <Link
            to="/registration"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
