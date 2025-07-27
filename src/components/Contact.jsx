// components/Contact.jsx
export default function Contact() {
  return (
    <section className="px-6 py-10 bg-red-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-600">Contact Us</h2>
        <form className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" />
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border rounded-lg" />
          </div>
          <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-2 border rounded-lg"></textarea>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">Send Message</button>
        </form>
        <p className="text-center mt-4 text-gray-600">📞 Hotline: +8801XXXXXXXXX</p>
      </div>
    </section>
  );
}
