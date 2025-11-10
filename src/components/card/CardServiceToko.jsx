import Image from "next/image";
import { useState } from "react";

export default function CardServiceToko({ gambar, judul, deskripsi, id, harga }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Format price with thousand separator
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <a
      href={"/service_product/" + id}
      className="group block mx-auto w-full flex flex-col items-center justify-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full max-w-[320px] bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2">
        {/* Best Seller Badge (optional - remove if not needed) */}
        {/* <div className="absolute top-3 left-3 z-10 bg-koreaRed text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          Best Seller
        </div> */}

        {/* Image Container */}
        <div className="relative w-full h-[240px] overflow-hidden rounded-t-2xl bg-gray-50">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
            alt={judul}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Wishlist Button (optional) */}
          <button
            className={`absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center transition-all duration-300 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-90"
            } hover:bg-koreaRed hover:text-white`}
            onClick={(e) => {
              e.preventDefault();
              // Add wishlist logic here
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-2 flex flex-col w-full">
          {/* Title */}
          <h3 className="font-bold text-base leading-snug text-koreaBlue min-h-[2.5rem] line-clamp-2 transition-colors duration-300 group-hover:text-koreaRed">
            {judul}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-xs leading-relaxed min-h-[2.25rem] line-clamp-2 flex-grow">
            {deskripsi}
          </p>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-3" />

          {/* Price & Button Section */}
          <div className="flex items-center justify-between pt-1">
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs">Price</span>
              <span className="text-koreaRed font-bold text-lg">
                Rp{formatPrice(harga)}
              </span>
            </div>

            {/* Detail Button */}
            <button
              className="bg-koreaBlue text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-koreaBlue/90 transition-all duration-300 flex items-center gap-2 shadow-md"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/services/" + id;
              }}
            >
              <span>Detail</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-gradient-to-r from-koreaBlue via-koreaRed to-koreaBlue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </a>
  );
}

// Alternative Compact Version for Grid with Many Items
export function CardServiceTokoCompact({ gambar, judul, deskripsi, id, harga }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <a href={"/services/" + id} className="group block">
      <div className="relative w-full max-w-[280px] bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-[140px] overflow-hidden rounded-t-xl bg-gray-50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
            alt={judul}
            className={`w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } group-hover:scale-110`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          <h3 className="font-bold text-sm text-koreaBlue min-h-[2rem] line-clamp-2 group-hover:text-koreaRed transition-colors duration-300">
            {judul}
          </h3>
          <p className="text-gray-600 text-xs line-clamp-1">{deskripsi}</p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-koreaRed font-bold text-base">
              Rp{formatPrice(harga)}
            </span>
            <button 
              className="bg-koreaBlue text-white px-3 py-2 rounded-lg hover:bg-koreaBlue/90 transition-colors text-xs font-semibold"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/services/" + id;
              }}
            >
              Detail
            </button>
          </div>
        </div>

        {/* Bottom Border */}
        <div className="h-1 bg-gradient-to-r from-koreaBlue to-koreaRed transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </a>
  );
}