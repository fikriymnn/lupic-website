"use client"
import React, { useEffect, useState,use } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Pendaftarann({params}) {
  const {data} = use(params)
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
                <div className="text-center bg-koreaBlue rounded-t-md text-white font-semibold border-b border-black py-4 grid grid-cols-6 justify-items-center px-5">
                <p>No</p>
                <p>Nama</p>
                <p>Tgl Lahir</p>
                <p>No Whatsapp</p>
                <p>Email</p>
                <p>Instansi</p>
                </div>
                <div className="p-2">
                  {['Senin', 'Rabu', 'Jumat'].map((hari, idx) => (
                    <div key={idx} className="shadow-md hover:bg-gray-200 border-2 mx-2 my-2 px-2 py-2 rounded grid grid-cols-6 justify-items-center">
                      <p>1</p>
                      <p>Luthfi Khaeri ihsan</p>
                      <p>asdsa</p>
                      <p>asdsa</p>
                      <p>asdsa</p>
                      <p>asdsa</p>
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