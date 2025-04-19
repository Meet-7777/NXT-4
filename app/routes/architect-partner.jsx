import React from "react";
import Navbar from "../components/navbar";

export const meta = () => {
  return [
    { title: "NXT4 - Architect Partner" },
    { name: "partner form", content: "Architect Partner" },
  ];
};

const ArchitectPartner = () => (
  <div>
    <Navbar />
    <div className="w-full md:w-[60%] mx-auto p-4 md:p-6 bg-gray-100 rounded-xl shadow-lg mt-4 text-center">
      <h2 className="text-[#0E46A3] text-xl md:text-2xl font-semibold mb-4">
        Partner with Us
      </h2>

      <p className="mb-4 text-base md:text-lg text-gray-800">
        We're looking to collaborate with architects who can help us Empower
        Enterprises with Hardware & Lighting across India.
      </p>

      <p className="mb-4 font-semibold text-base md:text-lg">
        Contact us today to discuss potential partnerships.
      </p>

      <div className="space-y-2 text-sm md:text-base">
        <a
          href="mailto:nxt4hardware@gmail.com"
          className="text-[#007BFF] hover:underline block"
        >
          nxt4hardware@gmail.com
        </a>
        <a
          href="tel:+919768739622"
          className="text-[#007BFF] hover:underline block"
        >
          +91 9768739622
        </a>
      </div>
    </div>
  </div>
);

export default ArchitectPartner;
