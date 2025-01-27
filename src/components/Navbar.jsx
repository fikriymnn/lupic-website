'use client'
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <nav className="bg-koreaBlue text-base text-white sticky top-0 z-50">
            <div className="md:flex md:justify-between items-center md:px-24 md:px-10 py-2">
                <div className='flex justify-between'>
                    <div className=" rounded-full p-1 md:ml-0 ml-3">
                        <img
                            src="/logo_lupic.png"
                            alt="Logo lupic"
                            className="h-10 w-10 object-contain"
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

                <ul
                    className={`${menuOpen ? 'block' : 'hidden'
                        } md:ml-0 ml-10 md:flex space-y-8 md:space-y-0 md:space-x-10 mt-4 md:mt-0 py-3`}
                >
                    <li><Link href="/" className="hover:underline">Home</Link></li>
                    <li><Link href="/aboutus" className="hover:underline">About Us</Link></li>
                    <li><Link href="/activities" className="hover:underline">Goals & Activities</Link></li>
                    <li><Link href="/news" className="hover:underline">News</Link></li>
                    <li><Link href="/facilities" className="hover:underline">Facilities</Link></li>
                    <li><Link href="/gallery" className="hover:underline">Gallery</Link></li>
                    <li><Link href="/services" className="hover:underline mb-4">Services</Link></li>
                </ul>
            </div>
            {/* <div className='w-full flex justify-end'>
                <div className='w-[30%] md:h-16 bg-koreaBlueMuda absolute rounded-b-lg'>
                    <div className='grid grid-cols-3 h-full w-full justify-items-center align-items-center items-center'>
                        <Link href="/services" className="hover:underline text-base">Toko</Link>
                        <Link href="/services" className="hover:underline  text-base">Form</Link>
                        <Link href="/services" className="hover:underline  text-base">Services</Link>
                    </div>

                </div>
            </div> */}

        </nav>

    );
};

export default Navbar;
