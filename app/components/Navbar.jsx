import { Link, useLocation } from "@remix-run/react";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const baseLinkStyle =
    "transition-colors duration-200 block px-1 py-1 rounded";
  const activeStyle = "text-[#0E46A3] font-semibold underline";
  const inactiveStyle = "text-[#03346E] hover:text-[#F5004F]";

  return (
    <header className="bg-gray-50 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#03346E]">NXT4</h1>
          <p className="text-sm text-gray-600 font-['Lobster']">
            Quality Hardware & Lighting. Delivered.
          </p>
        </div>

        <button
          className="md:hidden text-[#03346E]"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`${baseLinkStyle} ${
              isActive("/") ? activeStyle : inactiveStyle
            }`}
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${baseLinkStyle} ${
              isActive("/products") ? activeStyle : inactiveStyle
            }`}
            onClick={handleNavClick}
          >
            Products
          </Link>
          <Link
            to="/feedback"
            className={`${baseLinkStyle} ${
              isActive("/feedback") ? activeStyle : inactiveStyle
            }`}
            onClick={handleNavClick}
          >
            Feedback
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded transition-colors flex items-center"
              onClick={handleDropdownToggle}
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              Partnerships
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                <Link
                  to="/architect-partner"
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-100"
                  onClick={handleNavClick}
                >
                  Architect Partner
                </Link>
                <Link
                  to="/enterprise-solutions"
                  className="block px-4 py-2 text-[#03346E] hover:bg-gray-100"
                  onClick={handleNavClick}
                >
                  Enterprise Solutions Inquiry
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>

      {isMenuOpen && (
        <nav
          className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md"
          ref={menuRef}
        >
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`${baseLinkStyle} ${
                isActive("/") ? activeStyle : inactiveStyle
              }`}
              onClick={handleNavClick}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`${baseLinkStyle} ${
                isActive("/products") ? activeStyle : inactiveStyle
              }`}
              onClick={handleNavClick}
            >
              Products
            </Link>
            <Link
              to="/feedback"
              className={`${baseLinkStyle} ${
                isActive("/feedback") ? activeStyle : inactiveStyle
              }`}
              onClick={handleNavClick}
            >
              Feedback
            </Link>

            <div ref={dropdownRef}>
              <button
                className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded w-full text-left flex justify-between items-center"
                onClick={handleDropdownToggle}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                Partnerships
                <ChevronDown
                  className={`ml-2 w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isDropdownOpen && (
                <div className="mt-2 bg-gray-100 rounded shadow-md">
                  <Link
                    to="/architect-partner"
                    className="block w-full px-4 py-2 text-[#03346E] hover:bg-gray-200"
                    onClick={handleNavClick}
                  >
                    Architect Partner
                  </Link>
                  <Link
                    to="/enterprise-solutions"
                    className="block w-full px-4 py-2 text-[#03346E] hover:bg-gray-200"
                    onClick={handleNavClick}
                  >
                    Enterprise Solutions Inquiry
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
