import React, { useState } from 'react';

export default function CardEvent({ gambar, judul, waktu, jam, lokasi, harga, id }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <a href={`/service_workshop/${id}`} className="group block w-full">
      <div className="w-full bg-gray-50 p-2 rounded-md overflow-hidden">

        {/* Image */}
        <div className="relative w-full aspect-[4/6] overflow-hidden rounded-t-md bg-gray-200">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
          )}
          <img
            src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${gambar}`}
            alt={judul}
            className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Content */}
        <div className="py-4 space-y-2">
          <h3 className="font-bold text-base text-koreaBlue line-clamp-2 group-hover:text-koreaBlue/75 transition-colors duration-200">
            {judul}
          </h3>

          <div className="space-y-1.5">
            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="truncate">{waktu}</span>
            </div>

            {/* Time */}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="truncate">{jam}</span>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="line-clamp-2 leading-relaxed">{lokasi}</span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-2 border-t border-gray-200">
            {harga ? (
              <p className="text-sm font-bold text-koreaRed">
                IDR {parseInt(harga).toLocaleString('id-ID')}
              </p>
            ) : (
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        </div>

      </div>
    </a>
  );
}