// src/pages/SearchDonors.jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function SearchDonors() {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");

  // Fetch all donors
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("https://assignment-12-sever.vercel.app/donors");
      setDonors(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter donors based on search inputs
  const filteredDonors = donors.filter((donor) => {
    return (
      donor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (bloodGroup ? donor.bloodGroup === bloodGroup : true) &&
      (location ? donor.location.toLowerCase().includes(location.toLowerCase()) : true)
    );
  });

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Search Donors</h2>

      {/* Search Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full md:w-1/3"
        />

        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full md:w-1/4"
        >
          <option value="">All Blood Groups</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 w-full md:w-1/3"
        />
      </div>

      {/* Donors List */}
      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Loading donors...</p>
      ) : filteredDonors.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No donors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <div
              key={donor._id}
              className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 transition-colors"
            >
              <h3 className="text-xl font-semibold">{donor.name}</h3>
              <p>
                <span className="font-medium">Blood Group:</span> {donor.bloodGroup}
              </p>
              <p>
                <span className="font-medium">Location:</span> {donor.location}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {donor.phone}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
