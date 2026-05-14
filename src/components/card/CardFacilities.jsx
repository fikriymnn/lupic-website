import { useState } from "react";

export default function CardFacilities({ gambar, judul, deskripsi, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (

    <a href={`/facilities/${id}`}
      className="group block w-full"
    >
      <div className="w-full bg-gray-50 p-2 rounded-md overflow-hidden">
        {/* Image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-t-md bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          <img
            src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${gambar}`}
            alt={judul}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="py-4 h-[120px]">
          <h3 className="font-bold text-base text-koreaBlue line-clamp-2 mb-1 group-hover:text-koreaBlue/75 transition-colors duration-200">
            {judul}
          </h3>
          <p className="text-xs text-gray-700 line-clamp-2 leading-relaxed">
            {deskripsi}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-koreaBlue/70 mt-2 group-hover:gap-2 transition-all duration-200">
            Learn More
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}