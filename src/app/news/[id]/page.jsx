"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import parse from "html-react-parser"
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function detailNews({ params }) {
    const [data, setData] = useState({ judul: "", deskripsi: "", content: "", gambar: "", sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }], author: "", tanggal: "" })
    const {id}= use(params);

    useEffect(() => {
        async function getData() {
            try {
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/news/" + id)
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
            <a href="/news" className="text-koreaRed relative md:top-[40px] md:left-[60px] top-[20px] left-[30px] md:text-xl text-lg">Kembali &rarr;</a>
            <div className="w-full m-auto text-center">
                <div className="md:w-[75%] w-[90%] text-center m-auto md:pt-8 pt-2 text-center">
                    <h3 className="md:text-4xl text-lg mt-10 font-bold text-koreaBlue">{data.judul}</h3>
                </div>
                <p className="my-1 md:text-lg text-sm"> Author : {data.author}</p>
                <p className="mb-4 text-sm text-koreaBlueMuda">{data.tanggal}</p>
                <div className="md:w-full w-[90%] h-[45%] m-auto flex justify-center">
                    <Image src={data?process.env.NEXT_PUBLIC_API_FILE_URL+data.gambar:""} alt="foto" width={600} height={400} className="md:w-[800px] md:h-[500px] w-full rounded-xl" />
                </div>
                <p className="mt-8 m-auto md:text-lg text-sm w-[80%] text-justify">
                    {data.deskripsi}
                </p>
                <div className="mt-6 m-auto md:text-xl text-base w-[80%] text-justify">
                    {parse(data.content)}
                </div>
                {/* looping */}
                {
                    data.sub_content&&data.sub_content.map((v,i)=>{
                        return(
                            <div className="md:mb-14 mb-4" key={i}>
                            <div className="mt-8 m-auto text-xl w-[80%] text-justify">
                                <div className="md:w-[50%] w-[90%]">
                                {v.sub_judul?<h4 className="font-bold text-white md:text-xl text-base text-start bg-koreaBlueMuda px-3 py-2 mb-4 inline-block">{v.sub_judul}</h4>:""}
                                </div>
                                {
                                    v.sub_content? <p className="md:text-xl text-base">{parse(v.sub_content)}</p>:""
                                }
                               
                                <div className="w-full mt-5 flex flex-wrap justify-center">
                                    {
                                        v.sub_gambar&&v.sub_gambar.map((w,u)=>{
                                            if(w!==""){
                                                return(
                                                    <Image key={u} className="w-[60%] mb-4 mx-4" src={process.env.NEXT_PUBLIC_API_FILE_URL+w} alt="foto" width={600} height={600} />
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