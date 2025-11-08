"use client";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import CardFacilities from "@/components/card/CardFacilities";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Facilities() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/facility"
        );
        if (response.data) {
          setData(response.data);
        }
      } catch (err) {
        console.error(err.message);
        setError("Failed to load facilities. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 ">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-koreaBlue/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-koreaBlue border-t-transparent rounded-full animate-spin" />
            </div>
            <p className="text-gray-600 mt-4">Loading facilities...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <svg
                className="w-12 h-12 text-red-500 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {/* Title */}
        <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start">
          <h1 className="md:text-5xl text-2xl md:mt-10 font-bold">
            Facilities
          </h1>
          <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
        </div>

        {/* Facilities Grid */}
        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto mt-8 mb-16">
            {data.map((facility, index) => (
              <div
                key={facility._id}
                className="opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: "forwards",
                }}
              >
                <CardFacilities
                  judul={facility.judul}
                  deskripsi={facility.deskripsi}
                  gambar={facility.gambar}
                  id={facility._id}
                />
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && !error && data.length === 0 && (
          <div className="text-center py-20">
            <svg
              className="w-24 h-24 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No facilities found
            </h3>
            <p className="text-gray-500">
              Please check back later
            </p>
          </div>
        )}
      </div>

      <CustomFooter />

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </>
  );
}