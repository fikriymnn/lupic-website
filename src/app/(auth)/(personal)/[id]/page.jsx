"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState,use } from "react";
import axios from "axios";

export default function detailPersonal({params}) {
    const {id} = use(params)
    const [jadwal,setJadwal] = useState({})

    useEffect(()=>{
        async function getDetail(){
            try{
                const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/peserta/" + id, { withCredentials: true });
                if (data.data) {
                    setJadwal(data.data)
                    console.log(data.data)
                }
            }catch(err){
                alert(err.message)
            }
        }
        getDetail()
    },[])

    return (
        <>
        <Navbar/>
        <div className="min-h-screen ">
        <div className="m-auto flex">
            <div className="shadow-md border-2 rounded-lg md:w-[50%] w-[95%] md:my-10 my-5 pb-16 m-auto">
                <h1 className="md:text-2xl text-xl mt-10 text-center font-bold">BUKTI PENDAFTARAN</h1>
                <div className="h-1 w-36 bg-koreaRed mt-4 md:mb-6 mb-4 m-auto"></div>
                <br/>
                <table className="md:w-[70%] w-[90%] m-auto">
                    <tbody className="m-auto md:text-lg text-sm">
                    <tr><td className="md:py-3 py-1 font-bold">Nama lengkap</td><td className="md:py-3 py-1">: {jadwal.nama}</td></tr>
                    <tr><td className="md:py-3 py-1 font-bold">Tanggal lahir</td><td className="md:py-3 py-1">: {jadwal.tgl_lahir}</td></tr>
                    <tr><td className="md:py-3 py-1 font-bold">No whatsapp</td><td className="md:py-3 py-1">: {jadwal.no_wa}</td></tr>
                    <tr><td className="md:py-3 py-1 font-bold">Email</td><td className="md:py-3 py-1">: {jadwal.email}</td></tr>
                    <tr><td className="md:py-3 py-1 font-bold">Instansi</td><td className="md:py-3 py-1">: {jadwal.instansi}</td></tr>
                    <tr><td className="md:py-3 py-1 font-bold">Tanggal test</td><td className="md:py-3 py-1">:  {jadwal.hari} {jadwal.tanggal} {jadwal.bulan} {jadwal.tahun}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>
        <CustomFooter/>
        </>
    );
}