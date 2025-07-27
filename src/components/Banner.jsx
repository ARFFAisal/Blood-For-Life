// components/Banner.jsx
import { Link } from "react-router-dom";
import Lottie from "lottie-react";

import blood from "../assets/blood.json"

export default function Banner() {
  return (
    <section className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-around px-6 py-12 bg-gradient-to-r from-red-50 to-white">
      <div className="space-y-5 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">
          Donate Blood, Save Life
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          Be a hero today. Join our community of life-saving donors and make a difference in someone's life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <Link to="/registration" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Join as a Donor
          </Link>
          <Link to="/search" className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-600 hover:text-white">
            Search Donors
          </Link>
        </div>
      </div>

      <div className="max-w-xs md:max-w-md">
        <Lottie animationData={blood} loop={true} />
      </div>
    </section>
  );
}
