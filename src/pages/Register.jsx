import Lottie from "lottie-react";
import { useContext, useEffect, useState } from "react";
import {
  BiDonateBlood,
  BiEnvelope,
  BiImageAdd,
  BiKey,
  BiUser,
  BiMap,
} from "react-icons/bi";
import { useNavigate } from "react-router";
import happy from "../assets/happy.json";
import Title from "../components/Title";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";  // adjust the path as needed


// 🔽 Import district & upazila data from JSON
import districtData from "../../districts.json";
import upazilaData from "../../upazilas.json";

const Register = () => {
  const goTo = useNavigate();
  const { createUser, updateUser, setUser } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  // 🔁 Load districts initially
  useEffect(() => {
    setDistricts(districtData);
  }, []);

  // 🔁 Filter upazilas when district changes
  useEffect(() => {
    if (selectedDistrict) {
      const filtered = upazilaData.filter(
        (u) => u?.district_id === selectedDistrict
      );
      setUpazilas(filtered);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);
const axiosSecure = useAxiosSecure();

  // 🔒 Handle registration
 const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const image = form.image.value;
  const email = form.email.value;
  const pass = form.pass.value;
  const group = form.group.value;
  const district = form.district.value;
  const upazila = form.upazila.value;

  createUser(email, pass)
    .then((res) => {
      updateUser({ displayName: name }).then(async () => {
        setUser({ ...res.user, displayName: name, photoURL: image });

        // Prepare user data for backend
        const userData = {
          name,
          email,
          photoURL: image,
          bloodGroup: group,
          district,
          upazila,
          role: "user",  // optional default role
          createdAt: new Date(),
        };

        try {
          // Send user to backend to save in MongoDB
          const response = await axiosSecure.post("/add-user", userData);
          console.log("User saved in DB:", response.data);
        } catch (error) {
          console.error("Error saving user to DB:", error);
        }

        goTo("/");
      });
    })
    .catch(console.error);
};


  return (
    <div className="bg-orange-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Title>Register to Donate</Title>

          {/* Name */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiUser className="text-xl text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>

          {/* Image */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiImageAdd className="text-xl text-gray-500" />
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiEnvelope className="text-xl text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>

          {/* Blood Group */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiDonateBlood className="text-xl text-gray-500" />
            <select
              name="group"
              className="flex-1 bg-transparent outline-none"
              required
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiMap className="text-xl text-gray-500" />
            <select
              name="district"
              className="flex-1 bg-transparent outline-none"
              required
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Upazila */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiMap className="text-xl text-gray-500" />
            <select
              name="upazila"
              className="flex-1 bg-transparent outline-none"
              required
              disabled={!selectedDistrict}
            >
              <option value="">Select Upazila</option>
              {upazilas.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center gap-3 border-b pb-2">
            <BiKey className="text-xl text-gray-500" />
            <input
              type="password"
              name="pass"
              placeholder="Password"
              className="flex-1 outline-none bg-transparent"
              required
            />
          </div>

          {/* Submit Button */}
          <input
            type="submit"
            value="Register Now"
            className="btn btn-primary w-full"
          />
        </form>

        {/* Animation */}
        <div className="flex flex-col items-center justify-center">
          <Lottie animationData={happy} className="w-full max-w-md" />
        </div>
      </div>
    </div>
  );
};

export default Register;
