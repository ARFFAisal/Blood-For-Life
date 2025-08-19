// components/RecentRequests.jsx
export default function RecentRequests() {
  const requests = [
    { title: "A+ Blood Needed", desc: "Urgent requirement for surgery.", img: "https://via.placeholder.com/300x200" },
    { title: "O- Blood Needed", desc: "Emergency case at City Hospital.", img: "https://via.placeholder.com/300x200" },
    { title: "B+ Blood Needed", desc: "Patient with severe anemia.", img: "https://via.placeholder.com/300x200" },
  ];

  return (
    <section className="px-6 py-12 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Recent Requests</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {requests.map((req, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
            <img src={req.img} alt={req.title} className="h-40 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{req.title}</h3>
                <p className="text-gray-600">{req.desc}</p>
              </div>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">See More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
