import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const STATUSES = ["all", "pending", "inprogress", "done", "canceled"];

export default function Myrequests() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    if (!user?.accessToken) return;

    setLoading(true);
    axiosSecure
      .get("/my-requests")
      .then((res) => {
        console.log("Fetched requests:", res.data);
        // Check if res.data is an array, otherwise try to get array inside object
        if (Array.isArray(res.data)) {
          setRequests(res.data);
        } else if (Array.isArray(res.data.requests)) {
          setRequests(res.data.requests);
        } else if (Array.isArray(res.data.data)) {
          setRequests(res.data.data);
        } else {
          // fallback empty array if none found
          setRequests([]);
        }
      })
      .catch((err) => console.error("Failed to fetch donation requests:", err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  // Safe filtering: only filter if requests is an array
  const filteredRequests =
    Array.isArray(requests) && requests.length > 0
      ? filterStatus === "all"
        ? requests
        : requests.filter((r) => r.status === filterStatus)
      : [];

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentRequests = filteredRequests.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/donation-request/${id}`, {
        status: newStatus,
      });
      if (res.data.modifiedCount > 0) {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-red-600">
        My Donation Requests
      </h2>

      <div className="mb-4 flex justify-end">
        <label htmlFor="statusFilter" className="mr-2 font-semibold">
          Filter by Status:
        </label>
        <select
          id="statusFilter"
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-1"
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="text-center text-gray-500">
          No donation requests found for the selected filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-2 px-4 text-left">Recipient</th>
                <th className="py-2 px-4 text-left">Blood Group</th>
                <th className="py-2 px-4 text-left">District</th>
                <th className="py-2 px-4 text-left">Upazila</th>
                <th className="py-2 px-4 text-left">Hospital</th>
                <th className="py-2 px-4 text-left">Date</th>
                <th className="py-2 px-4 text-left">Time</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRequests.map((r) => (
                <tr
                  key={r._id}
                  className="border-b hover:bg-gray-100 transition-colors"
                >
                  <td className="py-2 px-4">{r.recipientName}</td>
                  <td className="py-2 px-4">{r.bloodGroup}</td>
                  <td className="py-2 px-4">{r.district}</td>
                  <td className="py-2 px-4">{r.upazila}</td>
                  <td className="py-2 px-4">{r.hospital}</td>
                  <td className="py-2 px-4">{r.date}</td>
                  <td className="py-2 px-4">{r.time}</td>
                  <td className="py-2 px-4 capitalize text-blue-700 font-semibold">
                    {r.status}
                  </td>
                  <td className="py-2 px-4 space-x-2">
                    {r.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => updateStatus(r._id, "done")}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Done
                        </button>
                        <button
                          onClick={() => updateStatus(r._id, "canceled")}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 border rounded ${
                  page === currentPage
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
