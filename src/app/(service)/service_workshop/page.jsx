'use client'
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import { useState,useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import { motion } from "framer-motion";
import CardEvent from "../../../components/card/CardEvent";

export default function Services_workshop() {
  const [data,setData] = useState([])
  const [totalPages,setTotalPages] = useState(1)
  const [currentPage,setCurrentPage] = useState(1)
  
  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/event?page=" +
            currentPage +
            "&limit=10"
        );
        
        const Data2 = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/event"
        );
        if (Data.data) {
          setData(Data.data);
          console.log(Data.data)
          setTotalPages(Math.ceil(Data2.data.length / 10));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, [currentPage]);
  return (
    <>
      <Navbar />
      <div className=" text-center m-auto mt-8 mb-4">
        <h3 className="md:text-4xl text-3xl mt-10 font-bold">Workshop</h3>
        <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
      </div>
      <div className="w-[90%] md:w-[80%] m-auto mt-10 mb-10">
        <p className="text-justify md:text-xl text-base ">
          The Leading University Project for International Cooperation (LUPIC)
          regularly organizes various workshops aimed at enhancing the quality
          of education, particularly in the fields of chemistry and Science,
          Technology, Engineering, and Mathematics (STEM).
        </p>
        <p className="text-justify md:text-xl text-base mt-8 font-bold">
          {" "}
          1. Workshop Fabrication Laboratory Education (Fablab Edu)
        </p>
        <p className="text-justify md:text-xl text-base mt-2">
          Fablab Edu is a laboratory facility supported by LUPIC to enhance
          technology-based learning in the fields of chemistry and STEM.
        </p>
        <p className="text-justify md:text-xl text-base mt-8">
          {" "}
          The fablab workshop will run for 32JP through onsite and online
          meeting. The figrure and table below showed the flow of the meeting
          and detail program.
        </p>
      </div>


      <div className="w-[85%] m-auto md:mt-8 mt-1">
        <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center md:ml-10 m-auto">
          <h1 className="md:text-3xl text-xl mt-10 font-bold ">
           Event Workshop
          </h1>
          <div className="h-1 w-48 bg-koreaRed md:mt-3 mt-2 mb-10 "></div>
        </div>
        <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-4 mt-2">
          {data &&
            data.map((v, i) => {

                return (
                  <motion.div
                    className="mx-5"
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardEvent
                      gambar={v.gambar}
                      key={i}
                      judul={v.judul}
                      waktu={v.judul}
                      jam={v.jam} lokasi={v.lokasi}
                      harga={v.harga}
                      id={v._id}
                    />
                  </motion.div>
                );
              
            })}
        </div>
      </div>
      <div className="w-[20%] m-auto mt-10 mb-16">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* <p className="w-[90%] md:w-[80%] m-auto md:text-3xl text-base text-koreaBlue mt-8 font-bold mb-4">
        {" "}
        Workshop Timeline
      </p>
      <Image
        src={"/banner_workshop.png"}
        width={900}
        height={500}
        alt=""
        className="m-auto mb-10 mt-5"
      />

      <div className="w-[90%] md:w-[80%] m-auto">
        <p className="md:text-2xl text-base text-koreaBlue mt-10 font-bold mb-4">
          {" "}
          Fablab Edu UPI Workshop Rundown
        </p>
        <p className="md:text-xl m-auto w-[90%] md:w-[80%] text-base mt-6 font-bold mb-3">
          {" "}
          Offline Workshop 1
        </p>
        <div className="w-[90%] md:w-[80%] m-auto border-2 mb-8 shadow-xl">
          <p className="bg-koreaBlue w-full py-2 text-center font-bold text-lg text-white">
            Activities
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Opening & Welcoming Speech from Fablab Management
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm ">
            - Introduction to Fablab
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm ">
            - Introduction to Tinkercad
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            - Learning Tinkercad Basic
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Lunch Break
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm ">
            - Introduction to 3D Printer
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm ">
            - Introduction to Laser Cutter
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            - Introduction to 3D Scanner
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  ">Closing</p>
        </div>

        <p className="md:text-xl m-auto w-[90%] md:w-[80%] text-base mt-6 font-bold mb-3">
          {" "}
          Online Discussion
        </p>
        <div className="w-[90%] md:w-[80%] m-auto border-2 mb-8 shadow-xl">
          <p className="bg-koreaBlue w-full py-2 text-center font-bold text-lg text-white">
            Activities
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Opening & Welcoming Speech from Fablab Management
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Designs/products Consultation
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm "> Closing</p>
        </div>

        <p className="md:text-xl m-auto w-[90%] md:w-[80%] text-base mt-6 font-bold mb-3">
          {" "}
          Offline Workshop 2
        </p>
        <div className="w-[90%] md:w-[80%] m-auto border-2 mb-14 shadow-xl">
          <p className="bg-koreaBlue w-full py-2 text-center font-bold text-lg text-white">
            Activities
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Opening & Welcoming Speech from Fablab Management
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Hands-on 3D Printer
          </p>

          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Lunch Break
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Hands-on 3D Printer
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm  border-b-2">
            Opening & Welcoming Speech from Fablab Management
          </p>
          <p className="w-full py-2 px-5 md:text-lg text-sm "> Closing</p>
        </div>
        <p className="text-justify md:text-xl text-base mt-8 font-bold">
          {" "}
          2. Small Scale Chemistry (SSC) Workshop
        </p>
        <p className="text-justify md:text-xl text-base mt-2 mb-20">
          The Small Scale Chemistry (SSC) Workshop is part of an initiative
          supported by LUPIC to improve the effectiveness of chemistry learning
          through more environmentally friendly, cost-effective, and efficient
          methods.
        </p>
      </div> */}
      <CustomFooter />
    </>
  );
}
