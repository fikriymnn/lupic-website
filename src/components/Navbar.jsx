"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-koreaRed text-white sticky top-0 z-50">
      <div className="md:flex md:justify-between items-center px-10 md:px-24 py-2">
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

        <ul className={`${menuOpen ? "block" : "hidden"} md:flex space-y-4 md:space-y-0 md:space-x-10 mt-4 md:mt-0 py-3`}>
          {[
            { href: "/", label: "Home" },
            { href: "/aboutus", label: "About Us" },
            { href: "/activities", label: "Goals & Activities" },
            { href: "/news", label: "News" },
            { href: "/facilities", label: "Facilities" },
            { href: "/gallery", label: "Gallery" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:underline" onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}

          {/* Dropdown Items */}
          {[
            {
              label: "Services",
              items: [
                { href: "/services", label: "Our Products" },
                { href: "/service_workshop", label: "Workshop" },
                { href: "/service_teacher", label: "Pre-Service Teacher Evaluation" },
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
                { href: "2. https://ejournal.upi.edu/index.php/JRPPK", label: "ejournal.upi.edu/JRPPK" },
              ],
            },
          ].map((dropdown) => (
            <li key={dropdown.label} className="relative">
              <button
                onClick={() => toggleDropdown(dropdown.label)}
                className="cursor-pointer focus:outline-none flex justify-between w-full md:w-auto"
              >
                {dropdown.label}
                <span className="md:hidden">{activeDropdown === dropdown.label ? "▲" : "▼"}</span>
              </button>

              <ul
                className={`${activeDropdown === dropdown.label ? "block" : "hidden"} md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-full mt-2 md:min-w-[150px] bg-koreaRed md:rounded-lg shadow-lg z-50 md:border md:border-white`}
              >
                {dropdown.items.map((item) => (
                  <li key={item.href} className="md:border-t">
                    <Link
                      href={item.href}
                      className="block hover:bg-koreaBlue text-sm py-2 px-4 md:py-4 text-left"
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* {[
            { href: `${login?"/personal":"/login"}`, label: "Personal" },
          ].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:underline" onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))} */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;