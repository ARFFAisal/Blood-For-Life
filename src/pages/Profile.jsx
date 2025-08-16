// src/pages/dashboard/ProfilePage.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import districtsData  from "../../districts.json"; // assume you're using this
import  upazilasData  from "../../upazilas.json";   // and this
import { toast } from "react-hot-toast";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [profileData, setProfileData] = useState(null);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => setProfileData(res.data))
        .catch(err => {
          console.error("Failed to load user profile:", err);
          toast.error("Failed to load profile.");
        });
    }
  }, [user?.email, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const { _id, email, ...updatableFields } = profileData;
      await axiosSecure.patch(`/users/${user.email}`, updatableFields);
      toast.success("Profile updated!");
      setEditable(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Update failed.");
    }
  };

  if (!profileData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <button
          className="btn btn-primary"
          onClick={() => editable ? handleSave() : setEditable(true)}
        >
          {editable ? "Save" : "Edit"}
        </button>
      </div>

      <form className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={profileData.email || ""}
            disabled
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block font-medium">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={profileData.avatar || ""}
            onChange={handleChange}
            disabled={!editable}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium">District</label>
          <select
            name="district"
            value={profileData.district || ""}
            onChange={handleChange}
            disabled={!editable}
            className="select select-bordered w-full"
          >
            <option disabled value="">Select District</option>
            {districtsData.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Upazila</label>
          <select
            name="upazila"
            value={profileData.upazila || ""}
            onChange={handleChange}
            disabled={!editable}
            className="select select-bordered w-full"
          >
            <option disabled value="">Select Upazila</option>
            {(upazilasData[profileData.district] || []).map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Blood Group</label>
          <select
            name="bloodGroup"
            value={profileData.bloodGroup || ""}
            onChange={handleChange}
            disabled={!editable}
            className="select select-bordered w-full"
          >
            <option disabled value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(bg => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
}
