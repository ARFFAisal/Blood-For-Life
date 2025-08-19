// src/pages/dashboard/ContentManagement.jsx
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

export default function ContentManagement() {
  const { user, role } = useContext(AuthContext); // ensure role is passed via context
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure(); // should be array destructured

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosSecure.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "draft" ? "published" : "draft";
    try {
      await axiosSecure.patch(`/blogs/${id}`, { status: newStatus });
      setBlogs(prev =>
        prev.map(blog =>
          blog._id === id ? { ...blog, status: newStatus } : blog
        )
      );
    } catch (err) {
      console.error("Failed to update blog status", err);
    }
  };

  const handleDelete = async id => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;
    try {
      await axiosSecure.delete(`/blogs/${id}`);
      setBlogs(prev => prev.filter(blog => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };

  const filteredBlogs =
    filter === "all" ? blogs : blogs.filter(blog => blog.status === filter);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">📝 Content Management</h2>
        <Link to="/dashboard/content-management/add-blog">
          <button className="btn btn-primary">Add Blog</button>
        </Link>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      {loading ? (
        <p>Loading blogs...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found for this filter.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBlogs.map(blog => (
            <div key={blog._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={blog.thumbnail || "https://via.placeholder.com/400x250?text=No+Image"}
                  alt="thumbnail"
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog.title}</h2>
                <p>Status: <span className="capitalize font-semibold">{blog.status}</span></p>
                {role === "admin" && (
                  <div className="mt-2 flex gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-accent"
                      onClick={() => handlePublishToggle(blog._id, blog.status)}
                    >
                      {blog.status === "draft" ? "Publish" : "Unpublish"}
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
