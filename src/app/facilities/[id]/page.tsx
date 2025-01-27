"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import parse from "html-react-parser"

export default function detailFacility({ params }: { params: Promise<{ id: string }> }) {
    const {id}= use(params);
    const [data,setData] = useState({judul:"",deskripsi:"",content:"",gambar:""})

    useEffect(()=>{
        async function getData(){
            try{
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/facility/"+id)
                if(Data.data){
                    setData(Data.data)
                }
            }catch(err:any){
                console.log(err.message)
            }
        }
        getData()
    },[])

    return (
        <>
            <Navbar />
            <a href="/facilities" className="text-koreaRed relative md:top-[40px] md:left-[60px] top-[20px] left-[30px] md:text-xl text-lg">Kembali &rarr;</a>
            <div className="w-full m-auto text-center">
                <div className="md:w-[75%] w-[90%] text-center m-auto md:pt-8 pt-2 text-center mb-5">
                    <h3 className="md:text-4xl text-xl mt-10 font-bold text-koreaBlue">{data.judul}</h3>
                </div>
                <div className="md:w-full w-[90%] h-[45%] m-auto flex justify-center">
                    <Image src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar} alt="foto" width={600} height={600} className="md:w-[500px] md:h-[500px] w-full" />
                </div>
                <p className="mt-8 m-auto md:text-xl text-lg w-[70%] text-justify md:mb-8 mb-4">
                    {data.deskripsi}
                </p>
                <div className=" m-auto md:text-xl text-lg w-[70%] text-justify mb-16">
                   {parse(data.content)}
                </div>

            </div>
            <CustomFooter />
        </>
    )
}