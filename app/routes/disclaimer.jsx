import { useLoaderData } from "@remix-run/react";
import Navbar from "../components/navbar";
import { json } from "@remix-run/node";

export const loader = () => {
  return json({
    disclaimer: {
      title: "Disclaimer",
      paragraphs: [
        "At NXT4, we strive to ensure the accuracy and completeness of the information presented on our website. However, despite our best efforts, some information may be incomplete or inaccurate. We reserve the right to make changes to the content at any time without prior notice.",
        "We disclaim all liability for any direct or indirect damages, regardless of their nature, arising from or in any way connected to the use of our website and/or the information contained herein. This includes any damages resulting from the temporary unavailability of the website.",
        "Furthermore, NXT4 assumes no responsibility for any direct or indirect damages resulting from the use of information obtained through this website.",
        "Reproduction or duplication of any part of this publication, by any means—whether print, photocopy, microfilm, digital techniques, internet, CD-ROM, or any other method—is prohibited without the prior written consent of NXT4.",
      ],
    },
  });
};

export const meta = () => {
  return [
    { title: "NXT4 - Disclaimer" },
    { name: "description", content: "Disclaimer For NXT4" },
  ];
};

export default function Disclaimer() {
  const data = useLoaderData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        <section className="px-4 py-8 max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-lg shadow p-6">
            <h2 className="text-2xl text-[#0E46A3] mb-6 text-center">
              {data.disclaimer.title}
            </h2>
            {data.disclaimer.paragraphs.map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-50 p-4 mt-auto border-t border-gray-200 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="mb-1 text-gray-600">
            © 2025 NXT4. All rights reserved.
          </p>
          <p className="mb-3 text-gray-600">Proudly crafted in India ❤️</p>
        </div>
      </footer>
    </div>
  );
}
