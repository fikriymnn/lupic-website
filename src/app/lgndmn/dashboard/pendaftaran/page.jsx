"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import axios from "axios";

export default function Pendaftaran() {
  const [onEdit, setOnEdit] = useState(false);
  const [onAdd, setOnAdd] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [hari, setHari] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [listJadwal, setListJadwal] = useState([]);
  const [jadwal, setJadwal] = useState([]);


  const dataJadwal = [
    { hari: 'Senin', tanggal: '14 April 2025', status: 'buka' },
    { hari: 'Rabu', tanggal: '16 April 2025', status: 'tutup' },
    { hari: 'Jumat', tanggal: '18 April 2025', status: 'buka' },
  ];

  const onDelete = async ()=>{
    try{

    }catch(err){

    }
  }

  const submitJadwal = async () => {
    try{
      const data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/jadwal", {
        hari: hari,
        tanggal: tanggal,
        bulan: bulan,
        tahun: tahun,
        status: "Aktif"
      }, { withCredentials: true });
      if (data.data) {
        alert("Berhasil menambah jadwal")
        setOnAdd(false)
        window.location.reload()
        
      }
    }catch(err){
      alert(err.message)
    }
  }

  function getNextDay(hari, fromDate = new Date()) {
    const hariKeIndex = {
      minggu: 0,
      senin: 1,
      selasa: 2,
      rabu: 3,
      kamis: 4,
      jumat: 5,
      sabtu: 6,
    };
  
    const targetDayName = hari.toLowerCase();
    const targetDay = hariKeIndex[targetDayName];
  
    if (targetDay === undefined) {
      throw new Error("Nama hari tidak valid. Gunakan: Senin, Selasa, Rabu, dll.");
    }
  
    const today = new Date(fromDate);
    today.setHours(0, 0, 0, 0);
  
    const currentDay = today.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    let daysToTarget = (7 + targetDay - currentDay) % 7;
    if (daysToTarget === 0) daysToTarget = 7; // Kalau hari ini sama dengan target, ambil minggu depan
  
    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToTarget);
  
    // Format manual tanpa koma
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const parts = new Intl.DateTimeFormat('id-ID', options).formatToParts(nextDate);
  
    const dayName = parts.find(p => p.type === 'weekday')?.value;
    const dateNum = parts.find(p => p.type === 'day')?.value;
    const monthName = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;
  
    return `${dayName} ${dateNum} ${monthName} ${year}`;
  }
  
  

  async function getJadwal() {
    try {
      const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/jadwal", { withCredentials: true });
      if (data.data) {
        let newData = []
        for (let i = 0; i < data.data.length; i++) {
          if(data.data[i].hari=="Senin"&&data.data[i].tanggal=="-"){
            let nextSenin = getNextDay("Senin")
            let arrayTanggal = nextSenin.split(" ")
            newData.push({hari:"Senin",tanggal:arrayTanggal[1],bulan:arrayTanggal[2],tahun:arrayTanggal[3],status:data.data[i].status})
          }else if(data.data[i].hari=="Rabu"&&data.data[i].tanggal=="-"){
            let nextRabu = getNextDay("Rabu")
            let arrayTanggal = nextRabu.split(" ")
            newData.push({hari:"Rabu",tanggal:arrayTanggal[1],bulan:arrayTanggal[2],tahun:arrayTanggal[3],status:data.data[i].status})
          }else if(data.data[i].hari=="Jumat"&&data.data[i].tanggal=="-"){
            let nextJumat = getNextDay("Jumat")
            let arrayTanggal = nextJumat.split(" ")
            newData.push({hari:"Jumat",tanggal:arrayTanggal[1],bulan:arrayTanggal[2],tahun:arrayTanggal[3],status:data.data[i].status})
          }else{
            newData.push({hari:data.data[i].hari,tanggal:data.data[i].tanggal,bulan:data.data[i].bulan,tahun:data.data[i].tahun,status:data.data[i].status})
          }
            
        }
        setJadwal(newData);
        console.log(jadwal)
      }
    } catch (err) {
      alert("Gagal mendapatkan jadwal")
    }
  }

  async function getListJadwal() {
    try {
      const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/category?field=tanggal", { withCredentials: true });
      if (data.data) { 
        console.log(data.data)
        setListJadwal(data.data);
       }

    }catch(err){
      alert("Gagal mendapatkan list jadwal")
    }
  }


  useEffect(() => { 
      getListJadwal();
      getJadwal();
      
  },[]);

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
                {onEdit?<button className="px-3 py-1 shadow-md bg-blue-600 rounded-md text-sm relative right-0 hover:bg-blue-400 text-white font-bold" onClick={(e)=>{setOnEdit(!onEdit)}}>konfirmasi</button>:onAdd?"":<button className="px-3 py-1 shadow-md bg-blue-600 rounded-md text-sm relative right-0 hover:bg-blue-400 text-white font-bold" onClick={(e)=>{setOnEdit(!onEdit)}}>edit</button>
}
                {onAdd?<button className="px-3 py-1 shadow-md bg-blue-600 rounded-md text-sm relative right-0 hover:bg-blue-400 text-white font-bold" onClick={(e)=>{setOnAdd(!onEdit);submitJadwal()}}>konfirmasi</button>:onEdit?"":<button className="px-3 py-1 shadow-md bg-blue-600 rounded-md text-sm relative right-0 hover:bg-blue-400 text-white font-bold ml-4" onClick={(e)=>{setOnAdd(!onAdd)}}>add</button>}
                {onEdit||onAdd?<button className="px-3 py-1 shadow-md bg-blue-600 rounded-md text-sm relative right-0 hover:bg-blue-400 text-white font-bold ml-4" onClick={(e)=>{setOnAdd(false);setOnEdit(false)}}>cancel</button>:""}
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
                    value={hari}
                    onChange={(e)=>{setHari(e.target.value);}}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Sabtu">Sabtu</option>
                    <option value="Minggu">Minggu</option>
                  </select></div>
                  <div className="font-semibold m-auto flex justify-center"><input type="number" className="w-[60%] m-auto border-2 rounded-lg text-center" onChange={(e)=>{setTanggal(e.target.value)}}/></div>
                  <div className="text-sm"><div className="rounded"><select
                    value={bulan}
                    onChange={(e)=>{setBulan(e.target.value);}}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">-- Pilih --</option>
                    <option value="Januari">Januari</option>
                    <option value="Februari">Februari</option>
                    <option value="Maret">Maret</option>
                    <option value="April">April</option>
                    <option value="Mei">Mei</option>
                    <option value="Juni">Juni</option>
                    <option value="Juli">Juli</option>
                    <option value="Agustus">Agustus</option>
                    <option value="September">September</option>
                    <option value="Oktober">Oktober</option>
                    <option value="November">November</option>
                    <option value="Desember">Desember</option>
                  </select></div></div>
                  <div className="font-semibold m-auto flex justify-center"><input type="number" className="w-[80%] m-auto border-2 rounded-lg text-center" onChange={(e)=>{setTahun(e.target.value)}}/></div>
                </div>
              </div>:<div className="mb-6 w-[80%] shadow-lg p-4 border rounded-md">
                <div className={`grid ${onEdit?'grid-cols-6':'grid-cols-5'} justify-items-center items-center items-center mb-4`}>
                  <div className="font-bold ">HARI</div>
                  <div className="font-bold ">TANGGAL</div>
                  <div className="font-bold ">BULAN</div>
                  <div className="font-bold ">TAHUN</div>
                  <div className="font-bold ">STATUS</div>
                  {
                    onEdit?<div className="font-bold ">HAPUS</div>:""
                  }

                </div>
                <hr />
                <br />
                {jadwal.map((item, idx) => (
                  <div key={idx} className={`grid ${onEdit?'grid-cols-6':'grid-cols-5'} justify-items-center items-center mb-2`}>
                    <div className="rounded">{item.hari}</div>
                    <div className="">{item.tanggal}</div>
                    <div className="">{item.bulan}</div>
                    <div className="">{item.tahun}</div>
                    <div className="text-sm">{onEdit?<div className="rounded"><select
                    value={jadwal[idx]}
                    onChange={(e)=>{jadwal[idx].status= e.target.value;}}
                    className="block w-full px-4 py-2 mt-1 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value={"Aktif"}>Aktif</option>
                    <option value={"Non Aktif"}>Non Aktif</option>
                  </select></div>:item.status}</div>
                  {
                    idx>=3&&onEdit?<div><button className="px-2 py-1 shadow-md bg-red-600 rounded-md text-sm relative right-0 hover:bg-red-400 text-white ml-4" onClick={(e)=>{onDelete()}}>Hapus</button></div>:""
                  }
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