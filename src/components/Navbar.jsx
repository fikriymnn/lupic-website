"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState(null);

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
    } catch (err) {}
  };

  useEffect(() => {
    async function checkLogin() {
      try {
        const data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/public/user",
          { withCredentials: true }
        );
        if (data.data) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      } catch (err) {
        setLogin(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <nav className="bg-koreaRed text-white sticky top-0 z-50">
      <div className="md:flex md:justify-between items-center px-10 md:px-24 py-2">
        {/* LOGO */}
        <div className="flex justify-between w-full md:w-auto">
          <div className="bg-white rounded-full p-1 md:ml-0 ml-3">
            <img
              src="/images/lupic-logo.png"
              alt="Logo lupic"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="block md:hidden text-2xl mx-5"
            aria-label="Toggle Menu"
          >
            {menuOpen ? "X" : "☰"}
          </button>
        </div>

        {/* MENU ITEMS */}
        <ul
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-10 mt-4 md:mt-0 py-3 md:text-sm`}
        >
          {[
            { href: "/", label: "Home" },
            { href: "/aboutus", label: "About Us" },
            { href: "/activities", label: "Goals & Activities" },
            { href: "/news", label: "News" },
            { href: "/facilities", label: "Facilities" },
            { href: "/gallery", label: "Gallery" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="hover:underline"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* DROPDOWNS */}
          {[
            {
              label: "Services",
              items: [
                { href: "/services", label: "Our Products" },
                { href: "/service_workshop", label: "Workshop" },
                { href: "/service_teacher", label: "Pre-Service Teacher Evaluation" },
                // {
                //   label: "Teacher Certification Training",
                //   subItems: [
                //     { href: "/knowlage_test", label: "Knowlage Test" },
                //     { href: "/case_study", label: "Case Study" },
                //     { href: "/lesson_plans", label: "Lessons Plans" },
                //     { href: "/video", label: "Video" }
                //   ],
                // },
                { href: "/service_inservice", label: "In Service Teacher Training" },
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
                { href: "https://chemprolab.id", label: "chemprolab.id" },
                { href: "https://www.tokopedia.com/fablabedu", label: "tokopedia.com/fablabedu" },
                { href: "https://sciencelove.com/", label: "sciencelove.com" },
                { href: "https://ejournal.upi.edu/index.php/JPI", label: "ejournal.upi.edu/JPI" },
                { href: "https://ejournal.upi.edu/index.php/JRPPK", label: "ejournal.upi.edu/JRPPK" },
                { href: "https://phet.colorado.edu/en/simulations/filter?type=html", label: "phet.colorado.edu/en/" },
              ],
            },
          ].map((dropdown) => (
            <li key={dropdown.label} className="relative">
              <button
                onClick={() => toggleDropdown(dropdown.label)}
                className="cursor-pointer focus:outline-none flex justify-between w-full md:w-auto"
              >
                {dropdown.label}
                <span className="md:hidden">
                  {activeDropdown === dropdown.label ? "▲" : "▼"}
                </span>
              </button>

              {/* LEVEL 1 DROPDOWN */}
              <ul
                className={`${
                  activeDropdown === dropdown.label ? "block" : "hidden"
                } md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full mt-2 md:min-w-[180px] bg-koreaRed md:rounded-lg shadow-lg z-50 md:border md:border-white`}
              >
                {dropdown.items.map((item) =>
                  item.subItems ? (
                    <li key={item.label} className="relative group md:border-t">
                      <button
                        onClick={() => toggleSubDropdown(item.label)}
                        className="block w-full text-left hover:bg-koreaBlue text-sm py-2 px-4 md:py-3"
                      >
                        {item.label} ▸
                      </button>

                      {/* LEVEL 2 SUB-DROPDOWN */}
                      <ul
                        className={`${
                          activeSubDropdown === item.label ? "block" : "hidden"
                        } md:absolute md:left-full md:top-0 md:min-w-[180px] bg-koreaRed md:rounded-lg md:border md:border-white shadow-lg z-50`}
                      >
                        {item.subItems.map((sub) => (
                          <li key={sub.href} className="md:border-t">
                            <Link
                              href={sub.href}
                              className="block hover:bg-koreaBlue text-sm py-2 px-4 md:py-3 text-left"
                              onClick={closeMenu}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li key={item.href} className="md:border-t">
                      <Link
                        href={item.href}
                        className="block hover:bg-koreaBlue text-sm py-2 px-4 md:py-3 text-left"
                        onClick={closeMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>
          ))}

          {/* LOGIN / PERSONAL */}
          <li>
            <Link
              href={login ? "/personal" : "/login"}
              className="hover:underline"
              onClick={closeMenu}
            >
              {login ? "Personal" : "Login"}
            </Link>
          </li>
          {login && (
            <li>
              <Link href={""} className="hover:underline" onClick={onLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
