// components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p>&copy; 2025 BloodLink. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/available-requests" className="hover:underline">Requests</Link>
          <Link to="/search" className="hover:underline">Search</Link>
          <Link to="/blogs" className="hover:underline">Blog</Link>
        </div>
      </div>
    </footer>
  );
}
