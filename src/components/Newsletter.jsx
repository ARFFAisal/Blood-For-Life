// components/Newsletter.jsx
export default function Newsletter() {
  return (
    <section className="px-6 py-12 text-center">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Subscribe to our Newsletter</h2>
      <p className="text-gray-600 mb-6">Get the latest updates, requests, and success stories directly in your inbox.</p>
      <div className="flex justify-center">
        <input type="email" placeholder="Enter your email" className="px-4 py-2 border rounded-l-lg w-64" />
        <button className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700">Subscribe</button>
      </div>
    </section>
  );
}
