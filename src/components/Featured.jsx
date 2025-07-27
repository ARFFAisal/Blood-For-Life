// components/Featured.jsx
export default function Featured() {
  return (
    <section className="px-6 py-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Why Donate Blood?</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-800">Save Lives</h3>
          <p className="text-gray-600">Every drop counts. Your blood can save up to 3 lives.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-800">Free Health Check</h3>
          <p className="text-gray-600">All donors receive a free mini health screening.</p>
        </div>
        <div className="p-6 bg-white shadow-md rounded-xl text-center">
          <h3 className="text-xl font-semibold text-gray-800">Be a Community Hero</h3>
          <p className="text-gray-600">Join a growing network of active blood donors.</p>
        </div>
      </div>
    </section>
  );
}
