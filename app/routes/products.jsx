import { Link } from "@remix-run/react";
import { useState } from "react";
export const meta = () => [
  { title: "NXT4 - Products" },
  {
    name: "products",
    content: "Take a glance to our product gallery",
  },
];
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
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#03346E] mb-4">Our Products</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Quality hardware and lighting solutions for all your electrical needs. 
          We provide only the best products for residential and commercial projects.
        </p>
        
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
            </div>
          </div>
        ))}
      </div>

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

      <div className="mt-16 bg-gray-50 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold text-[#03346E] mb-3">Need custom solutions?</h2>
        <p className="text-lg text-gray-600 mb-6">
          We provide customized electrical products for specific project requirements.
        </p>
        
        <a 
          href="https://wa.me/919768739622?text=Hello%20NXT4%2C%20I'm%20interested%20in%20your%20products%20and%20would%20like%20to%20know%20more." 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#03346E] hover:bg-[#022a5a] text-white py-3 px-8 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#03346E] focus:ring-offset-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.4023 3.57433C18.1794 1.35147 15.1937 0.0603199 12.0516 0.0603199C5.53335 0.0603199 0.219082 5.37458 0.219082 11.8928C0.219082 13.9696 0.787548 16.022 1.80433 17.7747L0.104004 24.0583L6.54295 22.3824C8.23373 23.3017 10.1131 23.8044 12.0516 23.8044C18.5698 23.8044 23.8841 18.4902 23.8841 11.9719C23.8841 8.82983 22.6245 5.84413 20.4023 3.57433ZM12.0516 21.7719C10.3344 21.7719 8.61747 21.2692 7.14598 20.3485L6.77896 20.1114L2.96465 21.1159L3.99524 17.3807L3.70175 16.9347C2.70717 15.4632 2.17331 13.6666 2.17331 11.8928C2.17331 6.39108 6.54968 2.01471 12.0514 2.01471C14.6758 2.01471 17.0987 3.09844 18.9743 4.97408C20.8499 6.84973 21.9336 9.27262 21.9336 11.897C21.9336 17.3988 17.5572 21.7751 12.0555 21.7751L12.0516 21.7719ZM17.5057 14.394C17.2126 14.2354 15.7667 13.5244 15.5 13.4442C15.2333 13.3641 15.0285 13.318 14.8297 13.6176C14.6309 13.9172 14.0709 14.5479 13.8984 14.7468C13.7259 14.9456 13.5461 14.9687 13.253 14.8101C12.96 14.6515 11.9915 14.3414 10.8614 13.3346C9.97109 12.5441 9.36717 11.5678 9.19468 11.2747C9.02219 10.9816 9.17861 10.8231 9.33161 10.6657C9.46883 10.5285 9.63764 10.3105 9.78745 10.138C9.93726 9.96541 9.97962 9.84159 10.0597 9.64274C10.1399 9.44389 10.0975 9.27148 10.0365 9.11289C9.97557 8.9543 9.37166 7.50835 9.13134 6.92212C8.89101 6.3359 8.6507 6.42784 8.4782 6.42784C8.30571 6.42784 8.09355 6.42784 7.89469 6.42784C7.69584 6.42784 7.38954 6.48877 7.12285 6.78185C6.85613 7.07492 6.10168 7.78587 6.10168 9.23182C6.10168 10.6778 7.15025 12.0696 7.29999 12.2685C7.44973 12.4673 9.35439 15.4432 12.315 16.7013C13.1219 17.0616 13.757 17.2665 14.2537 17.4184C15.0809 17.6692 15.8353 17.6363 16.4316 17.5753C17.1008 17.5075 18.2782 16.8889 18.5185 16.1829C18.7587 15.4769 18.7587 14.8871 18.6914 14.7741C18.624 14.661 18.422 14.5808 18.129 14.4222L17.5057 14.394Z"/>
          </svg>
          Contact Our Team on WhatsApp
        </a>
      </div>
    </div>
  );
}

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