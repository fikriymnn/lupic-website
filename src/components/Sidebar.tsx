"use client"
import React from "react";
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaNewspaper, FaCamera, FaStore, FaHistory, FaAddressCard } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaHouseMedical, FaScrewdriverWrench } from "react-icons/fa6";

const Sidebar = () => {
  const path = usePathname();
  const adminPath = path.split("/");
  return (
    <div className="h-screen w-64 bg-koreaBlue text-white flex flex-col fixed">
      <h2 className="text-2xl font-bold text-center p-4 border-b border-gray-700">
        Admin Panel
      </h2>
      <nav className="flex-1 p-4">
        <ul>
        <li className="mb-2">
            <a href="/lgndmn/dashboard" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${!adminPath[3]?"bg-koreaBlueMuda":""}`}>
              <FaHome />
              <span>Home</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/aboutus" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="aboutus"?"bg-koreaBlueMuda":""}`}>
              <FaAddressCard/>
              <span>About Us</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/activities" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="activities"?"bg-koreaBlueMuda":""}`}>
              <FaUser />
              <span>Activities</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/facilities" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="facilities"?"bg-koreaBlueMuda":""}`}>
              <FaScrewdriverWrench />
              <span>Facilities</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/news" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="news"?"bg-koreaBlueMuda":""}`}>
              <FaNewspaper />
              <span>News</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/gallery" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="gallery"?"bg-koreaBlueMuda":""}`}>
              <FaCamera />
              <span>Gallery</span>
            </a>
          </li>
          <li className="mb-2">
            <a href="/lgndmn/dashboard/services" className={`flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda rounded ${adminPath[3]=="services"?"bg-koreaBlueMuda":""}`}>
              <FaStore />
              <span>Service Toko</span>
            </a>
          </li>
         
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-700">
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-koreaBlueMuda hover:bg-red-600 rounded">
          <FaSignOutAlt />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;