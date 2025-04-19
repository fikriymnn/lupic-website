"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Pendaftaran() {
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
          <div className=" m-auto bg-white p-3 rounded-lg shadow-lg w-[80%]">
            <div className="bg-white px-6 pb-6 rounded-xl w-full max-w-3xl m-auto">
              {/* Bagian Atas - Jadwal */}
              <div>
              <button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold">edit</button>
              <button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold ml-4">add</button>
              </div>
              <br />
              <div className="mb-6 w-[60%] shadow-lg p-4 border rounded-md">
                <div className="grid grid-cols-3 justify-items-center items-center items-center mb-4">
                  <div className="font-bold ">HARI</div>
                  <div className="font-bold ">TANGGAL</div>
                  <div className="font-bold ">STATUS</div>

                </div>
                <hr />
                <br />
                {dataJadwal.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-3 justify-items-center items-center mb-2">
                    <div className="rounded">{item.hari}</div>
                    <div className="font-semibold">{item.tanggal}</div>
                    <div className="text-sm">{item.status}</div>
                  </div>
                ))}
              </div>
              <br />
              {/* List Peserta */}
              <div className="border shadow-md rounded-md mb-10">
                <div className="text-center bg-koreaBlue rounded-t-md text-white font-semibold border-b border-black py-2">
                  LIST PESERTA
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
        </div>
      </div >

    </div >
  );
}