// src/pages/dashboard/CreateRequest.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import districtData from "../../districts.json";
import upazilaData from "../../upazilas.json";

export default function CreateRequest() {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
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

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const request = {
      ...formData,
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      status: "pending", // Default status
    };

    try {
      const res = await axiosSecure.post("/donation-request", request);
      if (res.data.insertedId) {
        alert("Donation request submitted successfully!");
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
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit donation request.");
    }
  };

  const filteredUpazilas = upazilaData.filter(
    (u) => u.district_id === formData.district
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Create Donation Request</h2>

      <input
        type="text"
        name="recipientName"
        value={formData.recipientName}
        onChange={handleChange}
        placeholder="Recipient Name"
        className="input input-bordered w-full"
        required
      />

      <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select District</option>
        {districtData.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>

      <select
        name="upazila"
        value={formData.upazila}
        onChange={handleChange}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Upazila</option>
        {filteredUpazilas.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>

      <input
        type="text"
        name="hospital"
        value={formData.hospital}
        onChange={handleChange}
        placeholder="Hospital Name"
        className="input input-bordered w-full"
        required
      />

      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        placeholder="Address"
        className="input input-bordered w-full"
        required
      />

      <select
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Blood Group</option>
        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>

      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        className="input input-bordered w-full"
        required
      />

      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
        className="textarea textarea-bordered w-full"
        rows={3}
      />

      <div className="form-control">
        <label className="label">Requester Name</label>
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
      </div>

      <div className="form-control">
        <label className="label">Requester Email</label>
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full bg-gray-100"
        />
      </div>

      <button type="submit" className="btn btn-primary w-full">Submit Request</button>
    </form>
  );
}
