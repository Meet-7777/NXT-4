import React from "react";

export const meta = () => {
  return [
    { title: "NXT4 - Architect Partner Program" },
    {
      name: "description",
      content:
        "Collaborate with NXT4 as an Architect Partner and grow with us.",
    },
  ];
};

export default function ArchitectPartner() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-white">

      <main className="flex-grow">
        <section className="px-4 py-10 max-w-3xl mx-auto">
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl md:text-3xl text-[#0E46A3] font-semibold mb-4">
              Partner with Us
            </h2>

            <p className="mb-4 text-gray-700">
              We're looking to collaborate with visionary architects who can
              help us empower enterprises across India with exceptional lighting
              and hardware solutions.
            </p>

            <p className="mb-6 font-medium text-gray-800">
              Let’s build excellence together. Contact us today.
            </p>

            <div className="space-y-3 text-sm md:text-base">
              <a
                href="mailto:nxt4hardware@gmail.com"
                className="text-[#007BFF] hover:underline block"
              >
                📧 nxt4hardware@gmail.com
              </a>
              <a
                href="tel:+919768739622"
                className="text-[#007BFF] hover:underline block"
              >
                📞 +91 97687 39622
              </a>
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
        </div>
      </footer>
    </div>
  );
}
