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
import { Notebook, NotebookTabs, NotepadText, PenBox, Text, Video } from "lucide-react";

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
        window.location.href = "/admin"
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err)
      window.location.href = "/admin"
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
              href="/admin/dashboard"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                !adminPath[3] ? "bg-blue-500" : ""
              }`}
            >
              <PenBox className="text-lg" />
              <span className="text-sm font-medium">Knowledge Test</span>
            </a>
          </li>

          <li>
            <a
              href="/admin/dashboard/studycase"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "studycase" ? "bg-blue-500" : ""
              }`}
            >
              <NotepadText className="text-lg" />
              <span className="text-sm font-medium">Study Case</span>
            </a>
          </li>

          <li>
            <a
              href="/admin/dashboard/lesson_plans"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "lesson_plans" ? "bg-blue-500" : ""
              }`}
            >
              <Notebook className="text-lg" />
              <span className="text-sm font-medium">Lesson Plans</span>
            </a>
          </li>

          <li>
            <a
              href="/admin/dashboard/video_training"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "video_training" ? "bg-blue-500" : ""
              }`}
            >
              <Video className="text-lg" />
              <span className="text-sm font-medium">Video Training</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/dashboard/form_setting"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 hover:bg-blue-500 ${
                adminPath[3] === "form_setting" ? "bg-blue-500" : ""
              }`}
            >
              <FaScrewdriverWrench className="text-lg" />
              <span className="text-sm font-medium">Form Setting</span>
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
