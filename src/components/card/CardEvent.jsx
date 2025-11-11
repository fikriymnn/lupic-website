import React from 'react';

export default function CardEvent({ gambar, judul, waktu, jam, lokasi, harga, id }) {
  return (
    <a
      href={"/service_workshop/" + id}
      className="block w-full max-w-sm mx-auto h-full"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:scale-[1.02]">
        {/* Image Container - 4:5 Aspect Ratio */}
        <div className="relative w-full aspect-[4/5] bg-gray-100 flex-shrink-0">
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
            alt={judul}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Content Container - Fixed Structure */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Title - Fixed Height */}
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 text-gray-900 h-12 mb-3">
            {judul}
          </h3>

          {/* Date - Fixed Height */}
          <div className="flex items-center gap-2 text-sm text-gray-600 h-5 mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-medium truncate">{waktu}</span>
          </div>

          {/* Time - Fixed Height */}
          <div className="flex items-center gap-2 text-sm text-gray-600 h-5 mb-3">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate">{jam}</span>
          </div>

          {/* Location - Fixed Height */}
          <div className="flex items-start gap-2 text-sm text-gray-600 h-10 mb-3">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="line-clamp-2 leading-5">{lokasi}</span>
          </div>

          {/* Spacer to push price to bottom */}
          <div className="flex-grow"></div>

          {/* Price - Fixed at Bottom */}
          <div className="pt-3 border-t border-gray-100 mt-auto">
            {harga ? (
              <p className="text-lg font-bold text-blue-600">
                IDR {parseInt(harga).toLocaleString('id-ID')}
              </p>
            ) : (
              <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}