"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Pendaftaran() {
  const [onEdit, setOnEdit] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
                {onEdit?<button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold" onClick={(e)=>{setOnEdit(!onEdit)}}>konfirmasi</button>:onAdd?"":<button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold" onClick={(e)=>{setOnEdit(!onEdit)}}>edit</button>
}
                {onAdd?<button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold" onClick={(e)=>{setOnAdd(!onEdit)}}>konfirmasi</button>:onEdit?"":<button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold ml-4" onClick={(e)=>{setOnAdd(!onAdd)}}>add</button>}
                {onEdit||onAdd?<button className="px-3 py-1 shadow-md hover:bg-blue-600 rounded-md text-sm relative right-0 bg-blue-400 text-white font-bold ml-4" onClick={(e)=>{setOnAdd(false);setOnEdit(false)}}>cancel</button>:""}
              </div>
              <br />
              {
                onAdd ?<div className="mb-6 w-[90%] shadow-lg p-4 border rounded-md">
                <div className="grid grid-cols-4 justify-items-center items-center items-center mb-4">
                  <div className="font-bold ">HARI</div>
                  <div className="font-bold ">TANGGAL</div>
                  <div className="font-bold ">BULAN</div>
                  <div className="font-bold ">TAHUN</div>

                </div>
                <hr />
                <br />

                <div  className="grid grid-cols-4 justify-items-center items-center mb-2">
                  <div className="rounded"><select
                    value={selectedOption}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                    <option value="elektronik">Elektronik</option>
                  </select></div>
                  <div className="font-semibold m-auto flex justify-center"><input type="number" className="w-[50%] m-auto border-2 rounded-lg text-center"/></div>
                  <div className="text-sm"><div className="rounded"><select
                    value={selectedOption}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                    <option value="elektronik">Elektronik</option>
                  </select></div></div>
                  <div className="font-semibold m-auto flex justify-center"><input type="number" className="w-[80%] m-auto border-2 rounded-lg text-center"/></div>
                </div>
              </div>:<div className="mb-6 w-[60%] shadow-lg p-4 border rounded-md">
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
                    <div className="text-sm">{onEdit?<div className="rounded"><select
                    value={selectedOption}
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={true}>Aktif</option>
                    <option value={false}>Non aktif</option>
                  </select></div>:item.status}</div>
                  </div>
                ))}
              </div>

              }
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