// Home.jsx
import Banner from "../components/Banner";
import Featured from "../components/Featured";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-white">
      <Banner />
      <Featured />
      <Contact />
      <Footer />
    </div>
  );
}
