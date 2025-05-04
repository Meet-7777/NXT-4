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

  const priceListRef = useRef(null);

  const priceListCategories = [
    {
      name: "Screws & Fasteners",
      subcategories: [
        { name: "CSK Philips Screws", path: "/price-list/csk-philips-screws" },
        { name: "Pan Head Screws", path: "/price-list/pan-head-screws" },
        {
          name: "Self-Tapping Screws",
          path: "/price-list/self-tapping-screws",
        },
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

  const [isMobileView, setIsMobileView] = useState(false);

  const checkSubmenuPosition = () => {
    if (priceListRef.current) {
      const rect = priceListRef.current.getBoundingClientRect();
      const availableSpaceRight = window.innerWidth - rect.right;

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

      if (!isMobile) {
        checkSubmenuPosition();
      }
    };

    checkMobileView();
    window.addEventListener("resize", checkMobileView);

    return () => window.removeEventListener("resize", checkMobileView);
  }, []);

  useEffect(() => {
    if (isPriceListOpen && !isMobileView) {
      checkSubmenuPosition();
    }
  }, [isPriceListOpen, isMobileView]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      // For desktop view only
      if (!isMobileView) {
        const priceListContainer = document.getElementById(
          "price-list-container"
        );
        if (
          isPriceListOpen &&
          priceListContainer &&
          !priceListContainer.contains(e.target)
        ) {
          setIsPriceListOpen(false);
          setActiveCategory(null);
        }

        const partnershipsContainer = document.getElementById(
          "partnerships-container"
        );
        if (
          isPartnershipsOpen &&
          partnershipsContainer &&
          !partnershipsContainer.contains(e.target)
        ) {
          setIsPartnershipsOpen(false);
        }
      }

      // Always handle mobile menu outside clicks
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

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [isPriceListOpen, isPartnershipsOpen, isMenuOpen, isMobileView]);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsPartnershipsOpen(false);
    setIsPriceListOpen(false);
    setActiveCategory(null);
  }, [location.pathname]);

  const handlePartnershipsToggle = (e) => {
    e.stopPropagation();
    setIsPartnershipsOpen(!isPartnershipsOpen);
    setIsPriceListOpen(false);
    setActiveCategory(null);
  };

  const handlePriceListToggle = (e) => {
    e.stopPropagation();
    setIsPriceListOpen(!isPriceListOpen);
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

  // For mobile view
  const toggleMobilePriceList = (e) => {
    e.stopPropagation();
    setIsPriceListOpen(!isPriceListOpen);
    setIsPartnershipsOpen(false);
  };

  // For mobile view
  const toggleMobilePartnerships = (e) => {
    e.stopPropagation();
    setIsPartnershipsOpen(!isPartnershipsOpen);
    setIsPriceListOpen(false);
    setActiveCategory(null);
  };

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
          id="mobile-menu-button"
          className="md:hidden text-[#03346E]"
          aria-label="Toggle menu"
          onClick={toggleMobileMenu}
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

          <div
            id="price-list-container"
            className="relative"
            ref={priceListRef}
          >
            <button
              className="bg-[#0E46A3] hover:bg-[#03346E] text-white py-2 px-4 rounded transition-colors flex items-center"
              onClick={handlePriceListToggle}
              aria-expanded={isPriceListOpen}
              aria-haspopup="true"
            >
              Price List
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${
                  isPriceListOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isPriceListOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-20">
                {priceListCategories.map((category, index) => (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() =>
                      !isMobileView && setActiveCategory(category.name)
                    }
                    onMouseLeave={() =>
                      !isMobileView && setActiveCategory(null)
                    }
                  >
                    <div className="flex justify-between items-center px-4 py-2 text-[#03346E] hover:bg-gray-100 cursor-pointer">
                      {category.name}
                      <ChevronRight className="w-4 h-4" />
                    </div>

                    {!isMobileView && activeCategory === category.name && (
                      <div
                        className={`absolute ${submenuPosition} top-0 w-64 bg-white border rounded shadow-lg`}
                      >
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

          <div
            id="partnerships-container"
            className="relative"
          >
            <button
              className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded transition-colors flex items-center"
              onClick={handlePartnershipsToggle}
              aria-expanded={isPartnershipsOpen}
              aria-haspopup="true"
            >
              Partnerships
              <ChevronDown
                className={`ml-2 w-4 h-4 transition-transform ${
                  isPartnershipsOpen ? "rotate-180" : ""
                }`}
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

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white shadow-md"
        >
          <nav className="px-4 pb-4 space-y-2">
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

              <div className="w-full">
                <button
                  className="bg-[#0E46A3] hover:bg-[#03346E] text-white py-2 px-4 rounded w-full text-left flex justify-between items-center"
                  onClick={toggleMobilePriceList}
                  aria-expanded={isPriceListOpen}
                  aria-haspopup="true"
                >
                  Price List
                  <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform ${
                      isPriceListOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isPriceListOpen && (
                  <div className="mt-2 bg-gray-100 rounded shadow-md">
                    {priceListCategories.map((category, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-200 last:border-b-0"
                      >
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

              <div className="w-full">
                <button
                  className="bg-[#F5004F] hover:bg-[#d60648] text-white py-2 px-4 rounded w-full text-left flex justify-between items-center"
                  onClick={toggleMobilePartnerships}
                  aria-expanded={isPartnershipsOpen}
                  aria-haspopup="true"
                >
                  Partnerships
                  <ChevronDown
                    className={`ml-2 w-4 h-4 transition-transform ${
                      isPartnershipsOpen ? "rotate-180" : ""
                    }`}
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