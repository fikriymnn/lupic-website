"use client";
import React, { useState } from "react";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaNewspaper,
  FaCamera,
  FaStore,
  FaAddressCard,
  FaBook,
  FaChalkboardTeacher,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { FaCalendarDays, FaScrewdriverWrench } from "react-icons/fa6";

const Sidebar = () => {
  const path = usePathname();
  const adminPath = path.split("/");
  const [isTeacherDropdownOpen, setIsTeacherDropdownOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/api/user",
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data === "success") {
        window.location.href = "/";
      }
    } catch (err) {
      alert("Logout failed");
    }
  };

  const isTeacherRouteActive = ["studycase", "lesson_plans", "video_training"].includes(
    adminPath[3]
  );

  return (
    <div className="h-screen w-64 bg-koreaBlue text-white flex flex-col fixed top-0 left-0 shadow-lg z-50">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-blue-500">
        <h2 className="text-2xl font-bold text-center p-4">Admin Panel</h2>
      </div>

      {/* Scrollable Navigation */}
      <nav
        className="flex-1 overflow-y-auto p-4 hide-scrollbar"
      >
        <ul className="space-y-1">
          <li>
            <a
              href="/lgndmn/dashboard"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                !adminPath[3] ? "bg-blue-500" : ""
              }`}
            >
              <FaHome className="text-lg" />
              <span className="text-sm font-medium">Home</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/aboutus"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "aboutus" ? "bg-blue-500" : ""
              }`}
            >
              <FaAddressCard className="text-lg" />
              <span className="text-sm font-medium">About Us</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/activities"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "activities" ? "bg-blue-500" : ""
              }`}
            >
              <FaUser className="text-lg" />
              <span className="text-sm font-medium">Activities</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/facilities"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "facilities" ? "bg-blue-500" : ""
              }`}
            >
              <FaScrewdriverWrench className="text-lg" />
              <span className="text-sm font-medium">Facilities</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/news"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "news" ? "bg-blue-500" : ""
              }`}
            >
              <FaNewspaper className="text-lg" />
              <span className="text-sm font-medium">News</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/gallery"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "gallery" ? "bg-blue-500" : ""
              }`}
            >
              <FaCamera className="text-lg" />
              <span className="text-sm font-medium">Gallery</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/services"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "services" ? "bg-blue-500" : ""
              }`}
            >
              <FaStore className="text-lg" />
              <span className="text-sm font-medium">Service Toko</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/teaching_material"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "teaching_material" ? "bg-blue-500" : ""
              }`}
            >
              <FaBook className="text-lg" />
              <span className="text-sm font-medium">Teaching Material</span>
            </a>
          </li>

          {/* Teacher Certification Dropdown */}
          <li>
            <button
              onClick={() =>
                setIsTeacherDropdownOpen(!isTeacherDropdownOpen)
              }
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                isTeacherRouteActive ? "bg-blue-500" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <FaChalkboardTeacher className="text-lg" />
                <span className="text-sm font-medium">
                  Teacher Certification
                </span>
              </div>
              {isTeacherDropdownOpen ? (
                <FaChevronUp className="text-sm" />
              ) : (
                <FaChevronDown className="text-sm" />
              )}
            </button>

            {isTeacherDropdownOpen && (
              <ul className="mt-1 ml-4 space-y-1 border-l-2 border-blue-400 pl-3">
                <li>
                  <a
                    href="/lgndmn/dashboard/studycase"
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 hover:bg-blue-500 ${
                      adminPath[3] === "studycase" ? "bg-blue-500" : ""
                    }`}
                  >
                    <span>Study Case</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/lgndmn/dashboard/lesson_plans"
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 hover:bg-blue-500 ${
                      adminPath[3] === "lesson_plans" ? "bg-blue-500" : ""
                    }`}
                  >
                    <span>Lesson Plans</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/lgndmn/dashboard/video_training"
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm transition-colors duration-200 hover:bg-blue-500 ${
                      adminPath[3] === "video_training" ? "bg-blue-500" : ""
                    }`}
                  >
                    <span>Video Training</span>
                  </a>
                </li>
              </ul>
            )}
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/event"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "event" ? "bg-blue-500" : ""
              }`}
            >
              <FaCalendarDays className="text-lg" />
              <span className="text-sm font-medium">Event</span>
            </a>
          </li>

          <li>
            <a
              href="/lgndmn/dashboard/pendaftaran"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "pendaftaran" ? "bg-blue-500" : ""
              }`}
            >
              <FaCalendarDays className="text-lg" />
              <span className="text-sm font-medium">Jadwal</span>
            </a>
          </li>
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="flex-shrink-0 p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-red-600"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>

      {/* Style to hide scrollbar */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
