// src/pages/DonationRequests.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function DonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/available-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch donation requests:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-red-600">
        Available Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">No requests found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-semibold text-red-600">
                  {request.recipientName}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">District:</span>{" "}
                  {request.district}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Upazila:</span>{" "}
                  {request.upazila}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Hospital:</span>{" "}
                  {request.hospitalName}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Blood Group:</span>{" "}
                  {request.bloodGroup}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Date:</span>{" "}
                  {request.donationDate}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Time:</span>{" "}
                  {request.donationTime}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-blue-500">{request.status}</span>
                </p>
                <Link
                  to={`/details/${request._id}`}
                  className="text-blue-500 hover:underline font-medium block mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
