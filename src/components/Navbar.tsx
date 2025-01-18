'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-b from-koreaBlue to-black text-base text-white sticky top-0 z-50">
            <div className="flex justify-between items-center md:px-24 md:px-10  py-2">
                <div className="bg-white rounded-full p-2">
                    <img
                        src="/images/lupic-logo.png"
                        alt="Logo lupic"
                        className="h-10 w-10 object-contain"
                    />
                </div>
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="block md:hidden text-2xl"
                    aria-label="Toggle Menu"
                >
                    ☰
                </button>
                <ul
                    className={`${menuOpen ? 'block' : 'hidden'
                        } md:flex space-y-8 md:space-y-0 md:space-x-10 mt-4 md:mt-0`}
                >
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/about" className="hover:underline">About Us</Link></li>
                    <li><Link href="/goals" className="hover:underline">Goals & Activities</Link></li>
                    <li><Link href="/news" className="hover:underline">News</Link></li>
                    <li><Link href="/facilities" className="hover:underline">Facilities</Link></li>
                    <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
                    <li><Link href="/services" className="hover:underline">Services</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
