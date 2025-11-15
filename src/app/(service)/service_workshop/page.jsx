'use client'
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import CardEvent from "../../../components/card/CardEvent";

export default function Services_workshop() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const [eventsData, totalData] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/event?page=${currentPage}&limit=20`
          ),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event`)
        ]);
        
        if (eventsData.data) {
          setData(eventsData.data);
          setTotalPages(Math.ceil(totalData.data.length / 10));
        }
      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [currentPage]);

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 ">
        <div className=" mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Workshop
          </h1>
          <div className="h-1 w-24 bg-red-600 mt-4"></div>
          
          <div className="mt-8 space-y-6 text-gray-700">
            <p className="text-base md:text-lg lg:text-xl leading-relaxed">
              The Leading University Project for International Cooperation (LUPIC)
              regularly organizes various workshops aimed at enhancing the quality
              of education, particularly in the fields of chemistry and Science,
              Technology, Engineering, and Mathematics (STEM).
            </p>
            
            <div className="text-left mt-10">
              <h2 className="text-lg md:text-xl font-bold text-gray-900">
                1. Workshop Fabrication Laboratory Education (Fablab Edu)
              </h2>
              <p className="text-base md:text-lg mt-3 leading-relaxed">
                Fablab Edu is a laboratory facility supported by LUPIC to enhance
                technology-based learning in the fields of chemistry and STEM.
              </p>
              <p className="text-base md:text-lg mt-4 leading-relaxed">
                The fablab workshop will run for 32JP through onsite and online
                meeting. The figure and table below showed the flow of the meeting
                and detail program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Event Workshop
          </h2>
          <div className="h-1 w-32 bg-red-600 mt-3"></div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-2xl h-[500px]"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {data && data.length > 0 ? (
                data.map((event) => (
                  <div key={event._id} className="h-full">
                    <CardEvent
                      gambar={event.gambar}
                      judul={event.judul}
                      waktu={event.waktu}
                      jam={event.jam}
                      lokasi={event.lokasi}
                      harga={event.harga}
                      id={event._id}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No workshops available at the moment.
                  </p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <div className="w-full max-w-md">
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </section>

      <CustomFooter />
    </>
  );
}