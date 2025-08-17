// components/HowItWorks.jsx
export default function HowItWorks() {
  const steps = [
    { title: "Register", desc: "Sign up and join our donor community.", img: "https://via.placeholder.com/300x200" },
    { title: "Get Matched", desc: "We connect your blood group with patients in need.", img: "https://via.placeholder.com/300x200" },
    { title: "Donate", desc: "Save lives by donating at nearby hospitals.", img: "https://via.placeholder.com/300x200" },
  ];

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">How It Works</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="bg-white shadow-md rounded-xl overflow-hidden flex flex-col">
            <img src={step.img} alt={step.title} className="h-40 w-full object-cover" />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
              <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">See More</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
