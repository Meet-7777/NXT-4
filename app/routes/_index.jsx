import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { json } from "@remix-run/node";

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
    { title: "NXT4 - Premium Hardware & Lighting Solutions" },
    {
      name: "description",
      content:
        "NXT4 offers top-tier hardware & lighting materials for modern enterprises. Explore our reliable, durable, and design-forward solutions.",
    },
    {
      property: "og:title",
      content: "NXT4 - Empowering Enterprises with Hardware & Lighting",
    },
    {
      property: "og:description",
      content:
        "Quality hardware and lighting products designed for innovation, built for durability.",
    },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/dfxvwhesh/image/upload/v1744531745/office_xhyhys.jpg",
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
  const date = new Date();
  const year = date.getFullYear();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <main className="flex-grow">
        <section className="relative h-[60vh] w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Office Setup"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute inset-0 flex items-center justify-center z-10 px-4 text-center">
            <h1 className="text-2xl md:text-4xl text-white font-bold leading-tight tracking-wide">
              Empowering Enterprises with Hardware & Lighting
            </h1>
          </div>
        </section>

        <section className="px-4 py-10 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl text-[#0E46A3] mb-4">About Us</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            At NXT4, we provide cutting-edge lighting and robust hardware
            solutions for enterprises across industries. Our focus on
            innovation, durability, and performance makes us a trusted partner
            in building India’s infrastructure — from smart offices to
            industrial sites.
          </p>

          <h2 className="text-2xl md:text-3xl text-[#0E46A3] mb-4">
            What We Offer
          </h2>
          <p className="text-gray-700 mb-6">
            Whether you're designing a workspace, setting up infrastructure, or
            powering up an industrial unit — we deliver:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded shadow-sm">
              <div className="text-3xl mb-2">🧱</div>
              <h3 className="text-lg font-semibold mb-2">Reliable Hardware</h3>
              <p>
                Durable fittings, screws, channels, and essentials to build with
                confidence.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded shadow-sm">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="text-lg font-semibold mb-2">
                Lighting Excellence
              </h3>
              <p>
                Bright, energy-efficient lighting that enhances performance and
                space aesthetics.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded shadow-sm">
              <div className="text-3xl mb-2">🤝</div>
              <h3 className="text-lg font-semibold mb-2">
                Trusted Partnerships
              </h3>
              <p>
                Built on quality, communication, and long-term collaboration
                across India.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-12 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-[#0E46A3] mb-6">
            Our Features
          </h2>
          <div className="relative bg-gradient-to-br from-[#3a7bd5] to-[#3a6073] text-white p-8 rounded-lg shadow-lg h-48 md:h-56 lg:h-64 flex items-center justify-center mx-auto max-w-lg transform transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-black opacity-40 rounded-lg" />
            <div className="relative z-10 text-xl md:text-2xl font-['Lobster']">
              {features[currentFeature].text}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">
            © {year} NXT4. All rights reserved.
          </p>
          <p className="mb-2 text-gray-600">Proudly crafted in India ❤️</p>
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
