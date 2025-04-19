import { Link } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#03346E]">NXT4</h1>
          <p className="text-sm text-gray-600 font-['Lobster']">
            Quality Hardware & Lighting. Delivered.
          </p>
        </div>

        <button
          className="md:hidden text-[#03346E]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center space-x-6">
          <Link className="text-[#03346E] hover:underline" to="/">
            Home
          </Link>
          <Link className="text-[#03346E] hover:underline" to="/products">
            Products
          </Link>
          <Link className="text-[#03346E] hover:underline" to="/feedback">
            Feedback
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded transition-colors"
              onClick={handleDropdownToggle}
            >
              Partnerships{" "}
              <ChevronDown
                className={`inline-block ml-1 w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                <Link
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-100"
                  to="/architect-partner"
                >
                  Architect Partner
                </Link>
                <Link
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-100"
                  to="/enterprise-solutions"
                >
                  Enterprise Solutions Inquiry
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-2 bg-white shadow">
          <Link className="block text-[#03346E] hover:underline" to="/">
            Home
          </Link>
          <Link className="block text-[#03346E] hover:underline" to="/products">
            Products
          </Link>
          <Link className="block text-[#03346E] hover:underline" to="/feedback">
            Feedback
          </Link>
          <div className="mt-2" ref={dropdownRef}>
            <button
              className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded w-full text-left"
              onClick={handleDropdownToggle}
            >
              Partnerships{" "}
              <i
                className={`fas fa-chevron-down ml-2 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="mt-2 bg-gray-100 rounded shadow-md">
                <Link
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-200"
                  to="/architect-partner"
                >
                  Architect Partner
                </Link>
                <Link
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-200"
                  to="/enterprise-solutions"
                >
                  Enterprise Solutions Inquiry
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
