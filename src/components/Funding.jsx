import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../providers/AuthProvider";

export default function FundingPage() {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [fundings, setFundings] = useState([]);
  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch funding data
  useEffect(() => {
    axiosSecure
      .get("/fundings")
      .then((res) => setFundings(res.data))
      .catch((err) => console.error("Failed to load fundings", err));
  }, [axiosSecure]);

  // Handle donation
  const handleDonate = () => {
    setLoading(true);
    axiosSecure
      .post("/fundings/donate", {
        fundingId: selected._id,
        donorName: user.displayName,
        donorEmail: user.email,
        amount,
      })
      .then(() => {
        alert("Donation successful!");
        setSelected(null);
        setAmount("");
      })
      .catch((err) => {
        console.error("Donation failed", err);
        alert("Donation failed");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-red-600">
        Funding Opportunities ❤️
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {fundings.map((fund) => (
          <div
            key={fund._id}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <h3 className="text-xl font-semibold text-red-500 mb-2">{fund.title}</h3>
            <p className="text-gray-700 mb-3">{fund.description}</p>
            <p className="text-sm text-gray-500">
              Target: ৳{fund.target} | Raised: ৳{fund.raised}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => setSelected(fund)}
            >
              Donate Now
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Your Donation</h3>
            <p className="mb-2">
              Campaign: <strong>{selected.title}</strong>
            </p>
            <input
              type="number"
              placeholder="Enter amount (৳)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                {loading ? "Processing..." : "Donate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
