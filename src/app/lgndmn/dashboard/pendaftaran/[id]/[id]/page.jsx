"use client"
import React, { useEffect, useState,use } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Pendaftaran({params}) {
  const {id} = use(params)
  const dataJadwal = [
    { hari: 'Senin', tanggal: '14 April 2025', status: 'dibuka' },
    { hari: 'Rabu', tanggal: '16 April 2025', status: 'dibuka' },
    { hari: 'Jumat', tanggal: '18 April 2025', status: 'ditutup' },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64 "></div>
      <div className="w-full mb-20">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">PENDAFTARAN PESERTA</h1>
        </div>
        <div className="m-auto w-full">
          <div className=" m-auto bg-white p-3 rounded-lg w-[80%]">
              {/* List Peserta */}
              <div className="border shadow-md rounded-md mb-10">
                <div className="text-center bg-koreaBlue rounded-t-md text-white font-semibold border-b border-black py-2">
                  LIST PESERTA  {id}
                </div>
                <div className="p-5">
                  {['Senin', 'Rabu', 'Jumat'].map((hari, idx) => (
                    <div key={idx} className="shadow-md font-bold hover:bg-gray-200 border-2 mx-2 my-2 px-4 py-2 rounded">
                      {hari}
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </div >

    </div >
  );
}