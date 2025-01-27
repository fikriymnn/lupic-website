"use client"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CardFacilities from "@/components/card/CardFacilities"
import { useEffect, useState } from "react"
import axios from "axios"
import CardServiceToko from "@/components/card/CardServiceToko"
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';

export default function ServiceToko() {
    const [data,setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,setTotalPage] = useState(1)

    useEffect(()=>{
        async function getData(){
            try{
                const data = await  axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/toko")
                if(data.data){
                    setData(data.data)
                }
            }catch(err){
                console.log(err.message)
            }
        }
        getData()
    },[])
    return (
        <>
            <Navbar />
            <div className=" text-center m-auto mt-8 mb-4">
                <h3 className="md:text-4xl text-3xl mt-10 font-bold">Service Toko</h3>
                <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
            </div>
            <div className="md:grid md:grid-cols-4 justify-items-center flex flex-wrap m-auto w-[90%] mb-20 md:mt-8 mt-3  justify-evenly items-center">
                {
                    data&&data.map((v,i)=>{
                        return(
                            <CardServiceToko key={i} judul={v.judul} deskripsi={v.deskripsi} harga={v.harga} gambar={v.gambar} id={v._id}/>
                        )
                    })
                }

            </div>
            <div className="w-[20%] m-auto mt-10 mb-16">
                <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            <CustomFooter />
        </>
    )
}