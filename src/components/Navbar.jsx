"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setActiveSubDropdown(null);
  };

  const toggleSubDropdown = (sub) => {
    setActiveSubDropdown(activeSubDropdown === sub ? null : sub);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const onLogout = async (e) => {
    e.preventDefault();
    try {
      const Data = await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + "/api/public/logout",
        { withCredentials: true }
      );
      if (Data.data == "success") {
        alert("Logout success");
        window.location.href = "/";
      } else {
        alert("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    async function checkLogin() {
      try {
        const data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
          { withCredentials: true }
        );
        setLogin(!!data.data);
      } catch (err) {
        setLogin(false);
      }
    }
    checkLogin();
  }, []);

  const mainMenuItems = [
    { href: "/", label: "Home" },
    { href: "/aboutus", label: "About Us" },
    { href: "/activities", label: "Goals & Activities" },
    { href: "/news", label: "News" },
    { href: "/facilities", label: "Facilities" },
    { href: "/gallery", label: "Gallery" },
  ];

  const dropdownMenus = [
    {
      label: "Services",
      items: [
        { href: "/service_product", label: "Our Products" },
        { href: "/service_workshop", label: "Workshop" },
        { href: "/service_teacher", label: "Pre-Service Teacher Evaluation" },
        { href: "/", label: "In Service Teacher Training" },
        {
          label: "Teacher Certification Training",
          subItems: [
            { href: "/knowlage_test", label: "Knowledge Test" },
            { href: "/study_case", label: "Study Case" },
            { href: "/lesson_plans", label: "Lesson Plans" },
            { href: "/video_training", label: "Video Training" },
          ],
        },
      ],
    },
    {
      label: "Teaching Material",
      items: [
        { href: "/vid_page", label: "Videos" },
        { href: "/booksmodules_page", label: "Books/Modules" },
        { href: "/conferencepaper_page", label: "Conference Paper" },
      ],
    },
    {
      label: "Link",
      items: [
        { href: "https://chemprolab.id", label: "chemprolab.id", external: true },
        { href: "https://www.tokopedia.com/fablabedu", label: "tokopedia.com/fablabedu", external: true },
        { href: "https://sciencelove.com/", label: "sciencelove.com", external: true },
        { href: "https://ejournal.upi.edu/index.php/JPI", label: "ejournal.upi.edu/JPI", external: true },
        { href: "https://ejournal.upi.edu/index.php/JRPPK", label: "ejournal.upi.edu/JRPPK", external: true },
        { href: "https://phet.colorado.edu/en/simulations/filter?type=html", label: "phet.colorado.edu", external: true },
        { href: "https://reader.edus.news", label: "reader.edus.news", external: true },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-koreaRed shadow-lg py-2" : "bg-koreaRed py-3"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="bg-white rounded-full p-2 transition-transform duration-300 group-hover:scale-110 shadow-md">
              <img
                src="/images/lupic-logo.png"
                alt="Logo LUPIC"
                width={30}
                height={30}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {mainMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white px-3 py-2 rounded-md font-medium hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                style={{ fontSize: '0.8125rem' }}
              >
                {item.label}
              </Link>
            ))}

            {/* Desktop Dropdowns */}
            {dropdownMenus.map((dropdown) => (
              <div
                key={dropdown.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(dropdown.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="text-white px-3 py-2 rounded-md font-medium hover:bg-white/10 transition-colors duration-200 flex items-center gap-1 whitespace-nowrap"
                  style={{ fontSize: '0.8125rem' }}
                >
                  {dropdown.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === dropdown.label ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${activeDropdown === dropdown.label
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                    }`}
                >
                  {dropdown.items.map((item, idx) =>
                    item.subItems ? (
                      <div key={item.label} className="relative group/sub">
                        <button className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-koreaRed hover:text-white transition-colors duration-150 flex items-center justify-between border-t border-gray-100">
                          {item.label}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* Sub-dropdown */}
                        <div className="mx-auto border border-gray-100 z-40 top-0 w-56 rounded-lg shadow-xl overflow-hidden opacity-0 group-hover/sub:opacity-100 group-hover/sub:block hidden transition-all duration-200">
                          {item.subItems.map((sub, subIdx) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`block px-4 py-3 text-sm text-gray-700 hover:bg-koreaRed hover:text-white transition-colors duration-150 ${subIdx > 0 ? "border-t border-gray-100" : ""
                                }`}
                              onClick={closeMenu}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.external ? "_blank" : "_self"}
                        rel={item.external ? "noopener noreferrer" : ""}
                        className={`block px-4 py-3 text-sm text-gray-700 hover:bg-koreaRed hover:text-white transition-colors duration-150 ${idx > 0 ? "border-t border-gray-100" : ""
                          }`}
                        onClick={closeMenu}
                      >
                        {item.label}
                        {item.external && (
                          <svg className="inline-block w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        )}
                      </Link>
                    )
                  )}
                </div>
              </div>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-1 ml-2 border-l border-white/20 pl-2">
              <Link
                href={login ? "/personal" : "/login"}
                className="text-white px-3 py-2 rounded-md font-medium hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                style={{ fontSize: '0.8125rem' }}
              >
                {login ? "Personal" : "Login"}
              </Link>
              {login && (
                <button
                  onClick={onLogout}
                  className="text-white px-3 py-2 rounded-md font-medium hover:bg-white/10 transition-colors duration-200 whitespace-nowrap"
                  style={{ fontSize: '0.8125rem' }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-screen opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white/5 rounded-lg backdrop-blur-sm p-4 space-y-2">
            {mainMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Dropdowns */}
            {dropdownMenus.map((dropdown) => (
              <div key={dropdown.label} className="space-y-1">
                <button
                  onClick={() => toggleDropdown(dropdown.label)}
                  className="w-full flex justify-between items-center text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                >
                  {dropdown.label}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === dropdown.label ? "rotate-180" : ""
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {activeDropdown === dropdown.label && (
                  <div className="ml-4 space-y-1 bg-white/5 rounded-md p-2">
                    {dropdown.items.map((item) => {
                      // PERBAIKAN: Tambahkan return statement
                      return item.subItems ? (
                        <div key={item.label} className="space-y-1">
                          <button
                            onClick={() => toggleSubDropdown(item.label)}
                            className="w-full flex justify-between items-center text-white px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors duration-200 rounded"
                          >
                            {item.label}
                            <svg
                              className={`w-4 h-4 transition-transform duration-200 ${activeSubDropdown === item.label ? "rotate-180" : ""
                                }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          {activeSubDropdown === item.label && (
                            <div className="ml-3 space-y-1 bg-white/5 rounded p-2">
                              {item.subItems.map((sub) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  className="block text-white/80 px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors duration-200"
                                  onClick={closeMenu}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          key={item.href}
                          href={item.href}
                          target={item.external ? "_blank" : "_self"}
                          rel={item.external ? "noopener noreferrer" : ""}
                          className="block text-white/80 px-3 py-2 rounded text-sm hover:bg-white/10 transition-colors duration-200"
                          onClick={closeMenu}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Auth */}
            <div className="border-t border-white/20 pt-2 mt-2 space-y-1">
              <Link
                href={login ? "/personal" : "/login"}
                className="block text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                onClick={closeMenu}
              >
                {login ? "Personal" : "Login"}
              </Link>
              {login && (
                <button
                  onClick={onLogout}
                  className="w-full text-left text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-white/10 transition-colors duration-200"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;