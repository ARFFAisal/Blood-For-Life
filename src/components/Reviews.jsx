// components/Reviews.jsx
export default function Reviews() {
  const reviews = [
    { name: "John D.", feedback: "Donating blood was a great experience. The team was professional and kind." },
    { name: "Maria S.", feedback: "I feel proud to save lives. Everyone should donate blood." },
    { name: "Rahim K.", feedback: "Quick and easy process. Highly recommended." },
  ];

  return (
    <section className="px-6 py-12 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">What Donors Say</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-600 italic">“{r.feedback}”</p>
            <h3 className="mt-4 font-semibold">{r.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
