"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import parse from "html-react-parser"
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function detailEvent({ params }) {
    const [data, setData] = useState({
        tanggal: "", judul: "", gambar: "", lokasi: "", waktu: "",
        jam: "", kategori: "", peserta: "", harga: "", content: "", sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }]
    })
    const {id}= use(params);

    useEffect(() => {
        async function getData() {
            try {
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/event/" + id)
                if (Data.data) {
                    setData(Data.data)
                    console.log(data)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
        getData()
    }, [])
    return (
        <>
            <Navbar />
            <a href="/service_workshop" className="text-koreaRed relative md:top-[40px] md:left-[60px] top-[20px] left-[30px] md:text-xl text-lg">Kembali &rarr;</a>
            <div className="md:w-[70%] w-[95%] m-auto text-center shadow-lg p-4 mb-5">
                
                <div className="md:w-[70%] w-[95%] text-center m-auto md:pt-8 pt-2 text-center">
                    <h3 className="md:text-4xl text-lg mt-10 font-bold text-koreaBlue">{data.judul}</h3>
                </div>
                <p className="mb-4 text-sm text-koreaBlueMuda">{data.tanggal}</p>
                <div className="md:w-full w-[90%] h-[45%] m-auto flex justify-center">
                    <img src={data?process.env.NEXT_PUBLIC_API_FILE_URL+data.gambar:""} alt="foto" className="md:w-[700px] md:h-[700px] w-full rounded-xl" />
                </div>
                <div className="grid grid-cols-2 md:w-[70%] justify-items-start ">
                <div className="mt-3 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Lokasi  
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.lokasi}
                </p>
                <div className="mt-1 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Waktu  
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.waktu}
                </p>
                <div className="mt-1 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Jam  
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.jam}
                </p>
                <div className="mt-1 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Kategori  
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.kategori}
                </p>
                <div className="mt-1 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Peserta  
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.peserta}
                </p>
                <div className="mt-1 m-auto font-bold md:text-lg text-sm w-[70%] text-justify">
                    Fee 
                </div>
                <p className="mt-3 m-auto font-bold md:text-lg text-sm w-full text-justify">
                : {data.harga?"IDR "+data.harga:"Coming Soon"}
                </p>
                </div>
                <hr className="border-[1px] md:w-full w-[70%] m-auto mt-4" />
                <div className="mt-2 m-auto md:text-lg text-base w-[90%] text-justify">
                    {parse(data.content)}
                </div>
                {/* looping */}
                {
                    data.sub_content&&data.sub_content.map((v,i)=>{
                        return(
                            <div className="md:mb-14 mb-4" key={i}>
                            <div className="mt-8 m-auto text-xl md:w-full w-[90%] text-justify">
                                <hr className="border-[1px]" />
                                <div className="md:w-[60%] w-[90%]">
                                {v.sub_judul?<h4 className="font-bold text-white md:text-xl text-base text-start bg-koreaBlueMuda px-3 py-2 mb-4 inline-block">{v.sub_judul}</h4>:""}
                                </div>
                                {
                                    v.sub_content? <p className="md:text-lg text-base">{parse(v.sub_content)}</p>:""
                                }
                               
                                <div className="w-full mt-5 flex flex-wrap justify-center">
                                    {
                                        v.sub_gambar&&v.sub_gambar.map((w,u)=>{
                                            if(w!==""){
                                                return(
                                                    <img key={u} className="md:w-full w-[90%] mb-4 mx-4" src={process.env.NEXT_PUBLIC_API_FILE_URL+w} alt="foto" />
                                                )
                                            }
                                           
                                        })
                                    }
                                   
                                </div>
                            </div>
        
                        </div>
                        )
                    })
                }


            </div>
            <CustomFooter />
        </>
    )
}