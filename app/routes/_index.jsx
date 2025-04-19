import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { json } from "@remix-run/node";
import Navbar from "../components/navbar";

export async function loader() {
  return json({
    features: [
      { text: "Durable Hardware Components" },
      { text: "Premium Lighting Materials" },
      { text: "Reliable Supply Chain" },
      { text: "Tailored Enterprise Solutions" },
    ],
    heroImage:
      "https://res.cloudinary.com/dfxvwhesh/image/upload/v1744531745/office_xhyhys.jpg",
  });
}

export const meta = () => {
  return [
    { title: "NXT4 - Hardware & Lighting Solutions" },
    {
      name: "description",
      content:
        "NXT4 supplies high-quality hardware and lighting solutions for modern enterprises. Explore our durable materials, innovative designs, and dependable delivery service.",
    },
  ];
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Lobster&display=swap",
    },
  ];
};

export default function Index() {
  const { features, heroImage } = useLoaderData();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearInterval(interval);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [features.length]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Enterprise Solutions"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center">
            <h1 className="text-2xl md:text-4xl text-white font-bold leading-tight tracking-wide text-center">
              Empowering Enterprises with Hardware & Lighting
            </h1>
          </div>
        </section>

        <section className="px-4 py-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl text-[#0E46A3] mb-4">About Us</h2>
          <p className="mb-8">
            At NXT4, we are driven to provide both cutting-edge lighting systems
            and robust hardware solutions to enterprises across industries. Our
            dedication to innovation and quality ensures you get products that
            perform and last.
          </p>

          <h2 className="text-2xl text-[#0E46A3] mb-4">What We Offer</h2>
          <p className="mb-6">
            Whether you're designing a workspace, setting up infrastructure, or
            powering up an industrial unit — we deliver:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded shadow">
              <div className="text-3xl mb-2">🧱</div>
              <h3 className="text-xl font-bold mb-2">Reliable Hardware</h3>
              <p>
                From fasteners to fittings, we supply durable hardware materials
                for every enterprise need.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded shadow">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="text-xl font-bold mb-2">Lighting Excellence</h3>
              <p>
                Energy-efficient and stylish lighting products designed for
                longevity and performance.
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded shadow">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-xl font-bold mb-2">Trusted Partnerships</h3>
              <p>
                We believe in building long-term relationships by delivering
                consistent quality and service.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl text-[#0E46A3] mb-4">Our Features</h2>
          <div className="relative bg-gradient-to-br from-[#3a7bd5] to-[#3a6073] text-white p-8 rounded-lg shadow-lg h-48 md:h-64 lg:h-72 mx-auto max-w-md lg:max-w-lg flex items-center justify-center mb-8 transform transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
            <div className="relative z-10 text-2xl md:text-3xl font-['Lobster']">
              {features[currentFeature].text}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">
            © 2025 NXT4. All rights reserved.
          </p>
          <p className="mb-3 text-gray-600">Proudly crafted in India ❤️</p>
          <nav>
            <Link className="text-[#03346E] hover:underline" to="/disclaimer">
              Disclaimer
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
