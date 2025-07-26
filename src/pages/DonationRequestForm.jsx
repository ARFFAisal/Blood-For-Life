import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";
import districtData from "../../districts.json";
import upazilaData from "../../upazilas.json";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function DonationRequestForm() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    recipientName: "",
    district: "",
    upazila: "",
    hospital: "",
    address: "",
    bloodGroup: "",
    date: "",
    time: "",
    message: "",
  });

  const [availableUpazilas, setAvailableUpazilas] = useState([]);

  useEffect(() => {
    if (formData.district) {
      const selected = upazilaData.filter(
        (u) => String(u.district_id) === String(formData.district)
      );
      setAvailableUpazilas(selected);
    } else {
      setAvailableUpazilas([]);
    }
  }, [formData.district]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user?.status === "blocked") {
      alert("Your account is blocked. You cannot request donations.");
      return;
    }

    const data = {
      requesterName: user?.displayName || "",
      requesterEmail: user?.email || "",
      ownerEmail: user?.email || "", // 🟢 Required for /my-books route
      ...formData,
      status: "pending",
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/donation-request", data);
      alert("Donation request submitted!");

      // Reset the form
      setFormData({
        recipientName: "",
        district: "",
        upazila: "",
        hospital: "",
        address: "",
        bloodGroup: "",
        date: "",
        time: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting donation request:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-center text-red-600">
          Blood Donation Request
        </h2>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Requester Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">District</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select District</option>
            {districtData.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Upazila</label>
          <select
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
            disabled={!formData.district}
          >
            <option value="">Select Upazila</option>
            {availableUpazilas.map((upazila) => (
              <option key={upazila.id} value={upazila.name}>
                {upazila.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Hospital Name</label>
          <input
            type="text"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g. Dhaka Medical College"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Full Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="e.g. Zahir Raihan Rd, Dhaka"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Blood Group</label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Donation Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Donation Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Request Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg"
            placeholder="Explain why you need blood"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition"
        >
          Request
        </button>
      </form>
    </div>
  );
}
