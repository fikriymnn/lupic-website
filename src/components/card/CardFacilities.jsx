import Image from "next/image";
import { useState } from "react";

export default function CardFacilities({ gambar, judul, deskripsi, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <a
      href={"/facilities/" + id}
      className="group block mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[320px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
        {/* Image Container with Overlay */}
        <div className="relative w-full h-[280px] overflow-hidden rounded-t-2xl bg-gray-100">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
            alt={judul}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Gradient Overlay on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-koreaBlue/80 via-koreaBlue/20 to-transparent transition-opacity duration-500 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="px-4 py-6 space-y-3 h-40">
          {/* Title with underline animation */}
          <div className="relative">
            <h3 className="font-bold text-center text-lg leading-tight text-koreaBlue min-h-[1.5rem] flex items-center justify-center px-2 transition-colors duration-300 group-hover:text-koreaRed">
              <span className="line-clamp-2">{judul}</span>
            </h3>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed text-center px-2 min-h-[1.5rem] line-clamp-1">
            {deskripsi}
          </p>

          {/* Read More Link */}
          <div className="pt-2 flex justify-center">
            <span className="text-koreaBlue text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
              Learn More
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Corner Accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-koreaRed/10 rounded-bl-full transform translate-x-10 -translate-y-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
      </div>
    </a>
  );
}

// Alternative Compact Version
export function CardFacilitiesCompact({ gambar, judul, deskripsi, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <a href={"/facilities/" + id} className="group block">
      <div className="relative w-full max-w-[300px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
            alt={judul}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-koreaBlue/0 group-hover:bg-koreaBlue/20 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-center text-base text-koreaBlue min-h-[2.5rem] line-clamp-2 group-hover:text-koreaRed transition-colors duration-300">
            {judul}
          </h3>
          <p className="text-gray-600 text-xs leading-relaxed text-center line-clamp-2">
            {deskripsi}
          </p>
        </div>

        {/* Bottom Border Animation */}
        <div className="h-1 bg-gradient-to-r from-koreaBlue to-koreaRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </a>
  );
}

// Grid Layout Example Component
export function FacilitiesGrid({ facilities }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {facilities.map((facility) => (
          <CardFacilities
            key={facility.id}
            id={facility.id}
            gambar={facility.gambar}
            judul={facility.judul}
            deskripsi={facility.deskripsi}
          />
        ))}
      </div>
    </div>
  );
}