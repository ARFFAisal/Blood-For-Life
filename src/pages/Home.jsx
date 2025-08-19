// Home.jsx
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import HowItWorks from "../components/HowItWorks";
import RecentRequests from "../components/RecentRequests";
import Promotions from "../components/Promotions";
import Reviews from "../components/Reviews";
import Newsletter from "../components/Newsletter";
import Gallery from "../components/Gallery";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="text-red-500">
      {/* 1. Hero */}
      <Banner />
      {/* 2. Why Donate */}
      <Featured />
      {/* 3. How It Works */}
      <HowItWorks />
      {/* 4. Recent Requests */}
      <RecentRequests />
      {/* 5. Promotions */}
      <Promotions />
      {/* 6. Reviews */}
      <Reviews />
      {/* 7. Newsletter */}
      <Newsletter />
      {/* 8. Gallery */}
      <Gallery />
      {/* 9. FAQ */}
      <FAQ />
      {/* 10. Contact */}
      <Contact />
      {/* Footer */}
      <Footer />
    </div>
  );
}
