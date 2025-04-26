// src/routes/products.jsx
import { Link } from "@remix-run/react";
import { useState } from "react";

// Product data - you can replace these with your Cloudinary image URLs
const productCategories = [
  {
    id: "led-panels",
    title: "LED PANELS",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604108/ledPanel_cbgkpf.jpg",
    description: "Energy-efficient LED panels designed for a bright and uniform light distribution, perfect for commercial and residential spaces."
  },
  {
    id: "wires-cables",
    title: "WIRES AND CABLES",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604109/wiresAndCables_sr5hsj.jpg",
    description: "High-quality wires and cables designed for electrical installations, ensuring reliable power transmission for diverse applications."
  },
  {
    id: "strip-light",
    title: "STRIP LIGHT",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604106/stripLight_jbtgbi.jpg",
    description: "Flexible and versatile strip lights that can be used for home and commercial lighting, available in various brightness levels."
  },
  {
    id: "fan",
    title: "FAN",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604106/Fan_x3kpom.jpg",
    description: "Modern and stylish fans that provide efficient air circulation. Designed with energy-saving features and whisper-quiet operation."
  },
  {
    id: "d-link-cables",
    title: "D-LINK CABLES",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604107/d-link-cat6-cable_zmwfew.jpg",
    description: "Durable high-speed network cables for reliable data transfer and digital connectivity, compatible with commercial infrastructure."
  },
  {
    id: "d-link-connector",
    title: "D-LINK RJ CONNECTOR",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604109/rj-connector_pibgop.jpg",
    description: "Premium RJ45 connectors that ensure secure data connection for all your networking needs. Perfect for professional installations."
  },
  {
    id: "flood-light",
    title: "FLOOD LIGHT",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604106/floodLights_rk8twz.jpg",
    description: "High-intensity flood lights perfect for outdoor areas. Engineered for durability and weather resistance."
  },
  {
    id: "street-light",
    title: "STREET LIGHT",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604106/streetLight_odtvdh.jpg",
    description: "Smart urban lighting solutions that combine energy efficiency with optimal illumination for public spaces and roadways."
  },
  {
    id: "led-drivers",
    title: "LED DRIVERS",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604107/LedDrivers_xl1bmn.jpg",
    description: "Reliable LED drivers designed to provide stable power supply and optimal output for commercial and home LED fixtures."
  },
  {
    id: "mcb-box",
    title: "MCB BOX",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604110/MCB-Box-legrand_itr6id.jpg",
    description: "Safety-focused MCB boxes that provide electrical circuit protection, overload prevention, and secure housing for circuit installations."
  },
  {
    id: "extension-board",
    title: "CANY EXTENSION BOARD",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604106/Cany-Entensions_q4xjq9.jpg",
    description: "Durable power outlets and safety features. Ideal for both home and commercial applications."
  },
  {
    id: "led-bulb",
    title: "LED LIGHT BULB",
    image: "https://res.cloudinary.com/dfxvwhesh/image/upload/v1745604107/LEDlightBulb_fjm8ju.jpg",
    description: "Bright and eco-friendly LED bulbs that combine high energy-efficient illumination. Perfect for residential, commercial, and industrial lighting solutions."
  }
];

export default function Products() {
  const [filter, setFilter] = useState("");
  
  const filteredProducts = filter 
    ? productCategories.filter(product => 
        product.title.toLowerCase().includes(filter.toLowerCase()) ||
        product.description.toLowerCase().includes(filter.toLowerCase())
      )
    : productCategories;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#03346E] mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Quality hardware and lighting solutions for all your electrical needs. 
          We provide only the best products for residential and commercial projects.
        </p>
        
        {/* Search Filter */}
        <div className="mt-6 max-w-md mx-auto">
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F5004F] focus:border-transparent"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
              <img 
                src={product.image} 
                alt={product.title} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = "/api/placeholder/300/200";
                  e.target.alt = "Product image placeholder";
                }}
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#03346E] mb-2">{product.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>
              {/* <Link 
                to={`/products/${product.id}`} 
                className="inline-block bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5004F] focus:ring-offset-2"
              >
                View Details
              </Link> */}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-[#03346E] mb-2">No products found</h2>
          <p className="text-gray-600">Try adjusting your search criteria.</p>
          <button 
            className="mt-4 text-[#F5004F] font-medium"
            onClick={() => setFilter("")}
          >
            Clear filters
          </button>
        </div>
      )}

      {/* CTA Section */}
      <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-[#03346E] mb-3">Need custom solutions?</h2>
        <p className="text-lg text-gray-600 mb-6">
          We provide customized electrical products for specific project requirements.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-[#03346E] hover:bg-[#022a5a] text-white py-3 px-8 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#03346E] focus:ring-offset-2"
        >
          Contact Our Team
        </Link>
      </div>
    </div>
  );
}

// Error boundary specific to the products route
export function ErrorBoundary() {
  return (
    <div className="flex flex-col justify-center items-center py-16 px-4 text-center">
      <h1 className="text-3xl font-bold text-[#03346E]">Products Coming Soon!</h1>
      <p className="text-lg mt-4 max-w-lg">
        We're currently working on our products page to bring you the best quality hardware and lighting solutions.
      </p>
      <p className="mt-6">
        <Link 
          to="/" 
          className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#F5004F] focus:ring-offset-2"
        >
          Return to Home
        </Link>
      </p>
    </div>
  );
}