// components/FAQ.jsx
export default function FAQ() {
  const faqs = [
    { q: "Who can donate blood?", a: "Anyone healthy aged 18–65 and weighing over 50kg." },
    { q: "How often can I donate?", a: "Every 3 months for men and every 4 months for women." },
    { q: "Is it safe?", a: "Yes, donating blood is completely safe and uses sterile equipment." },
  ];

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow-md">
            <h3 className="font-semibold text-lg">{faq.q}</h3>
            <p className="text-gray-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
