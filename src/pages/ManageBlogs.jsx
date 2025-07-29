// src/pages/dashboard/ManageBlogs.jsx
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function ManageBlogs() {
  const axiosSecure = useAxiosSecure();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axiosSecure.get("/blogs").then(res => setBlogs(res.data));
  }, [axiosSecure]);

  const updateStatus = async (id, status) => {
    await axiosSecure.patch(`/blogs/${id}`, { status });
    setBlogs(blogs.map(blog => blog._id === id ? { ...blog, status } : blog));
  };

  const deleteBlog = async id => {
    await axiosSecure.delete(`/blogs/${id}`);
    setBlogs(blogs.filter(blog => blog._id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Blogs</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {blogs.map(blog => (
          <div key={blog._id} className="border rounded-xl p-4 shadow">
            <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            <img src={blog.thumbnail} alt="thumb" className="w-full h-40 object-cover rounded mb-2" />
            <p className="text-sm">Status: <strong>{blog.status}</strong></p>
            <div className="mt-2 space-x-2">
              {blog.status === "draft" ? (
                <button onClick={() => updateStatus(blog._id, "published")} className="btn btn-success btn-sm">Publish</button>
              ) : (
                <button onClick={() => updateStatus(blog._id, "draft")} className="btn btn-warning btn-sm">Unpublish</button>
              )}
              <button onClick={() => deleteBlog(blog._id)} className="btn btn-error btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
