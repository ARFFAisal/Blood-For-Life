import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function Myrequests() {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!user?.accessToken) return;

    axiosSecure
      .get("/my-requests")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch donation requests:", err);
        setLoading(false);
      });
  }, [user, axiosSecure]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">My Donation Requests</h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t made any donation requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {books.map((book) => (
            <div key={book._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-xl font-semibold mb-2">{book.recipientName}</h3>
              <p><strong>Blood Group:</strong> {book.bloodGroup}</p>
              <p><strong>District:</strong> {book.district}</p>
              <p><strong>Upazila:</strong> {book.upazila}</p>
              <p><strong>Hospital:</strong> {book.hospital}</p>
              <p><strong>Date:</strong> {book.date}</p>
              <p><strong>Time:</strong> {book.time}</p>
              <p><strong>Status:</strong> <span className="text-blue-600">{book.status}</span></p>
              <p className="mt-2 text-gray-600 italic">"{book.message}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
