import axios from "axios";
import { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

export default function DetailsPage() {
  const { user } = useContext(AuthContext);
  const request = useLoaderData();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDonationConfirm = () => {
    setLoading(true);
    axios
      .patch(`http://localhost:5000/donation-request/${request._id}`, {
        status: "inprogress",
        donorName: user.displayName,
        donorEmail: user.email,
      })
      .then((res) => {
        console.log(res.data);
        alert("Donation confirmed!");
        setModalOpen(false);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 space-y-4">
        <h2 className="text-3xl font-bold text-red-600">
          Donation Request for {request.recipientName}
        </h2>
        <p className="text-gray-700">
          <strong>Location:</strong> {request.district}, {request.upazila}
        </p>
        <p className="text-gray-700">
          <strong>Hospital:</strong> {request.hospital}
        </p>
        <p className="text-gray-700">
          <strong>Address:</strong> {request.address}
        </p>
        <p className="text-gray-700">
          <strong>Blood Group:</strong> {request.bloodGroup}
        </p>
        <p className="text-gray-700">
          <strong>Date:</strong> {request.date} | <strong>Time:</strong> {request.time}
        </p>
        <p className="text-gray-700">
          <strong>Message:</strong> {request.message}
        </p>

        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 w-full bg-red-600 text-white text-lg py-2 rounded-lg hover:bg-red-700 transition"
        >
          Donate
        </button>
      </div>

      {/* Donation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Donation</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700">Donor Name</label>
                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Donor Email</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonationConfirm}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  {loading ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
