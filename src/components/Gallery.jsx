// components/Gallery.jsx
export default function Gallery() {
  const images = Array(6).fill("https://via.placeholder.com/300x200");

  return (
    <section className="px-6 py-12 bg-red-50">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Our Gallery</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {images.map((img, i) => (
          <img key={i} src={img} alt="Blood donation" className="rounded-xl shadow-md object-cover w-full h-48" />
        ))}
      </div>
    </section>
  );
}
