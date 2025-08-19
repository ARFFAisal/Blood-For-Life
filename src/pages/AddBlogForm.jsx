// src/pages/dashboard/AddBlogForm.jsx
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

export default function AddBlogForm() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosSecure.post("/blogs", {
        ...formData,
        author: user?.displayName || "Anonymous",
        authorEmail: user?.email,
        createdAt: new Date(),
      });
      navigate("/dashboard/content-management");
    } catch (error) {
      console.error("Blog creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          className="input input-bordered w-full"
          required
          value={formData.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URL"
          className="input input-bordered w-full"
          required
          value={formData.thumbnail}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          className="textarea textarea-bordered w-full"
          rows="6"
          required
          value={formData.content}
          onChange={handleChange}
        />
        <div className="flex gap-4 items-center">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="select select-bordered"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Publishing..." : "Add Blog"}
        </button>
      </form>
    </div>
  );
}
