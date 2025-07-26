import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../src/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";  // adjust path

export default function Login() {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

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
        status: "active"
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border rounded"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              {...register("password", { required: true })}
              className="w-full px-3 py-2 border rounded"
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
      </div>
    </div>
  );
}
