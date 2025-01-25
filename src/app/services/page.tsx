"use client"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CardFacilities from "@/components/card/CardFacilities"
import { useEffect, useState } from "react"
import axios from "axios"
import CardServiceToko from "@/components/card/CardServiceToko"

export default function ServiceToko() {
    const [data,setData] = useState([])

    useEffect(()=>{
        async function getData(){
            try{
                const data = await  axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/toko")
                if(data.data){
                    setData(data.data)
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
            <div className=" text-center m-auto mt-8 mb-4">
                <h3 className="md:text-4xl text-3xl mt-10 font-bold">Service Toko</h3>
                <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
            </div>
            <div className="md:grid md:grid-cols-4 justify-items-center flex flex-wrap m-auto w-[90%] mb-20 md:mt-8 mt-3  justify-evenly items-center">
                {
                    data&&data.map((v:any,i:any)=>{
                        return(
                            <CardServiceToko key={i} judul={v.judul} deskripsi={v.deskripsi} harga={v.harga} gambar={v.gambar} id={v._id}/>
                        )
                    })
                }

            </div>
            <CustomFooter />
        </>
    )
}