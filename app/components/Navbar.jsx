import { Link, useLocation } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isPartnershipsOpen, setIsPartnershipsOpen] = useState(false);
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState("left-full");
  const location = useLocation();
  
  // Create refs for checking available space
  const priceListRef = useRef(null);

  // Product categories for price lists
  const priceListCategories = [
    {
      name: "Screws & Fasteners",
      subcategories: [
        { name: "CSK Philips Screws", path: "/price-list/csk-philips-screws" },
        { name: "Pan Head Screws", path: "/price-list/pan-head-screws" },
        { name: "Self-Tapping Screws", path: "/price-list/self-tapping-screws" },
        { name: "Nuts & Bolts", path: "/price-list/nuts-bolts" },
      ],
    },
    {
      name: "Electrical Components",
      subcategories: [
        { name: "SMPS Drivers", path: "/price-list/smps-drivers" },
        { name: "LED Drivers", path: "/price-list/led-drivers" },
        { name: "Power Supplies", path: "/price-list/power-supplies" },
        { name: "Switches & Sockets", path: "/price-list/switches-sockets" },
      ],
    },
    {
      name: "Lighting Solutions",
      subcategories: [
        { name: "LED Panels", path: "/price-list/led-panels" },
        { name: "Strip Lights", path: "/price-list/strip-lights" },
        { name: "Downlights", path: "/price-list/downlights" },
        { name: "Outdoor Fixtures", path: "/price-list/outdoor-fixtures" },
      ],
    },
    {
      name: "Hardware Accessories",
      subcategories: [
        { name: "Channels & Profiles", path: "/price-list/channels-profiles" },
        { name: "Fixtures & Fittings", path: "/price-list/fixtures-fittings" },
        { name: "Tools", path: "/price-list/tools" },
        { name: "Mounting Hardware", path: "/price-list/mounting-hardware" },
      ],
    },
  ];

  // Track whether we're in mobile view
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Function to check available space and set submenu position
  const checkSubmenuPosition = () => {
    if (priceListRef.current) {
      const rect = priceListRef.current.getBoundingClientRect();
      const availableSpaceRight = window.innerWidth - rect.right;
      
      // If there's not enough space on the right (less than 300px), display submenu on the left
      if (availableSpaceRight < 300) {
        setSubmenuPosition("right-full");
      } else {
        setSubmenuPosition("left-full");
      }
    }
  };
  
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      
      // Only check submenu position if we're not in mobile view
      if (!isMobile) {
        checkSubmenuPosition();
      }
    };
    
    checkMobileView();
    window.addEventListener("resize", checkMobileView);
    
    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  // Additional effect to check position when dropdown is opened
  useEffect(() => {
    if (isPriceListOpen && !isMobileView) {
      checkSubmenuPosition();
    }
  }, [isPriceListOpen, isMobileView]);

  // Properly handle clicks outside of dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Check if price list dropdown should close
      const priceListContainer = document.getElementById("price-list-container");
      if (isPriceListOpen && priceListContainer && !priceListContainer.contains(e.target)) {
        setIsPriceListOpen(false);
        setActiveCategory(null);
      }
      
      // Check if partnerships dropdown should close
      const partnershipsContainer = document.getElementById("partnerships-container");
      if (isPartnershipsOpen && partnershipsContainer && !partnershipsContainer.contains(e.target)) {
        setIsPartnershipsOpen(false);
      }
      
      // Check if mobile menu should close (but don't close if clicking the hamburger button)
      const mobileMenuButton = document.getElementById("mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");
      if (
        isMenuOpen && 
        mobileMenu && 
        !mobileMenu.contains(e.target) && 
        mobileMenuButton && 
        !mobileMenuButton.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    // Add event listener to document body instead of document
    document.body.addEventListener("click", handleClickOutside);
    
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isPriceListOpen, isPartnershipsOpen, isMenuOpen]);

  // Reset states on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsPartnershipsOpen(false);
    setIsPriceListOpen(false);
    setActiveCategory(null);
  }, [location.pathname]);

  const handlePartnershipsToggle = (e) => {
    e.stopPropagation();
    setIsPartnershipsOpen(!isPartnershipsOpen);
    
    // Close other dropdowns
    setIsPriceListOpen(false);
    setActiveCategory(null);
  };

  const handlePriceListToggle = (e) => {
    e.stopPropagation();
    setIsPriceListOpen(!isPriceListOpen);
    
    // Close other dropdowns
    setIsPartnershipsOpen(false);
  };

  const handleCategoryToggle = (e, categoryName) => {
    e.stopPropagation();
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  const handleNavClick = () => {
    setIsMenuOpen(false);
    setIsPartnershipsOpen(false);
    setIsPriceListOpen(false);
    setActiveCategory(null);
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;
  const baseLinkStyle = "transition-colors duration-200 block px-1 py-1 rounded";
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
        
        {/* Mobile menu button */}
        <button
          id="mobile-menu-button"
          className="md:hidden text-[#03346E]"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`${baseLinkStyle} ${isActive("/") ? activeStyle : inactiveStyle}`}
            onClick={handleNavClick}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`${baseLinkStyle} ${isActive("/products") ? activeStyle : inactiveStyle}`}
            onClick={handleNavClick}
          >
            Products
          </Link>
          <Link
            to="/feedback"
            className={`${baseLinkStyle} ${isActive("/feedback") ? activeStyle : inactiveStyle}`}
            onClick={handleNavClick}
          >
            Feedback
          </Link>

          {/* Price List Dropdown - Desktop */}
          <div 
            id="price-list-container" 
            className="relative"
            ref={priceListRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bg-[#0E46A3] hover:bg-[#03346E] text-white py-2 px-4 rounded transition-colors flex items-center"
              onClick={handlePriceListToggle}
              aria-expanded={isPriceListOpen}
              aria-haspopup="true"
            >
              Price List
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${isPriceListOpen ? "rotate-180" : ""}`}
              />
            </button>
            
            {isPriceListOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                {priceListCategories.map((category, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => !isMobileView && setActiveCategory(category.name)}
                    onMouseLeave={() => !isMobileView && setActiveCategory(null)}
                  >
                    <div className="flex justify-between items-center px-4 py-2 text-[#03346E] hover:bg-gray-100 cursor-pointer">
                      {category.name}
                      <ChevronRight className="w-4 h-4" />
                    </div>
                    
                    {/* Desktop submenu - with dynamic positioning */}
                    {!isMobileView && activeCategory === category.name && (
                      <div className={`absolute ${submenuPosition} top-0 w-64 bg-white border rounded shadow-lg`}>
                        {category.subcategories.map((subcat, subIdx) => (
                          <Link
                            key={subIdx}
                            to={subcat.path}
                            className="block px-4 py-2 text-[#03346E] hover:bg-gray-100"
                            onClick={handleNavClick}
                          >
                            {subcat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  to="/price-list"
                  className="block px-4 py-2 text-[#03346E] font-medium hover:bg-gray-100 border-t"
                  onClick={handleNavClick}
                >
                  View All Price Lists
                </Link>
              </div>
            )}
          </div>

          {/* Partnerships Dropdown - Desktop */}
          <div 
            id="partnerships-container" 
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded transition-colors flex items-center"
              onClick={handlePartnershipsToggle}
              aria-expanded={isPartnershipsOpen}
              aria-haspopup="true"
            >
              Partnerships
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${isPartnershipsOpen ? "rotate-180" : ""}`}
              />
            </button>
            
            {isPartnershipsOpen && (
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white shadow-md" onClick={(e) => e.stopPropagation()}>
          <nav className="px-4 pb-4 space-y-2">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`${baseLinkStyle} ${isActive("/") ? activeStyle : inactiveStyle}`}
                onClick={handleNavClick}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`${baseLinkStyle} ${isActive("/products") ? activeStyle : inactiveStyle}`}
                onClick={handleNavClick}
              >
                Products
              </Link>
              <Link
                to="/feedback"
                className={`${baseLinkStyle} ${isActive("/feedback") ? activeStyle : inactiveStyle}`}
                onClick={handleNavClick}
              >
                Feedback
              </Link>

              {/* Price List Dropdown - Mobile */}
              <div className="w-full">
                <button
                  className="bg-[#0E46A3] hover:bg-[#03346E] text-white py-2 px-4 rounded w-full text-left flex justify-between items-center"
                  onClick={handlePriceListToggle}
                  aria-expanded={isPriceListOpen}
                  aria-haspopup="true"
                >
                  Price List
                  <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform ${isPriceListOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                {isPriceListOpen && (
                  <div className="mt-2 bg-gray-100 rounded shadow-md">
                    {priceListCategories.map((category, index) => (
                      <div key={index} className="border-b border-gray-200 last:border-b-0">
                        <button
                          className="flex justify-between items-center w-full px-4 py-2 text-[#03346E] font-medium"
                          onClick={(e) => handleCategoryToggle(e, category.name)}
                        >
                          {category.name}
                          <ChevronDown
                            className={`ml-2 w-4 h-4 transition-transform ${
                              activeCategory === category.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        
                        {activeCategory === category.name && (
                          <div className="pl-6 bg-gray-50">
                            {category.subcategories.map((subcat, subIdx) => (
                              <Link
                                key={subIdx}
                                to={subcat.path}
                                className="block px-4 py-2 text-[#03346E] hover:bg-gray-200"
                                onClick={handleNavClick}
                              >
                                {subcat.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    <Link
                      to="/price-list"
                      className="block w-full px-4 py-2 text-[#03346E] font-medium hover:bg-gray-200"
                      onClick={handleNavClick}
                    >
                      View All Price Lists
                    </Link>
                  </div>
                )}
              </div>

              {/* Partnerships Dropdown - Mobile */}
              <div className="w-full">
                <button
                  className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded w-full text-left flex justify-between items-center"
                  onClick={handlePartnershipsToggle}
                  aria-expanded={isPartnershipsOpen}
                  aria-haspopup="true"
                >
                  Partnerships
                  <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform ${isPartnershipsOpen ? "rotate-180" : ""}`}
                  />
                </button>
                
                {isPartnershipsOpen && (
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
        </div>
      )}
    </header>
  );
}