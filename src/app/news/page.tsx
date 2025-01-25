"use client"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import Image from "next/image"
import CardNews from "@/components/card/CardNews";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import axios from "axios";



export default function News() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages =2;

    const truncateText = (text: any, maxWords: any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    useEffect(()=>{
        async function getData(){
            try{
                // const Data = await axios
            }catch(err:any){
                console.log(err.message)
            }
        }
        getData()
    },[])
    return (
        <>
            <Navbar />
            {/* hero section */}
            <div className="w-full flex justify-center mt-14 md:mb-14 mb-7">

                <div className='md:w-[85%] w-[90%] m-auto bg-gradient-to-b from-koreaBlue to-black md:py-20 py-16 rounded-tl-xl rounded-br-xl rounded-tr-[100px] rounded-bl-[100px]'>
                    <div className='md:px-20 px-5 grid md:flex grid-cols-1 justify-items-center items-start w-full m-auto '>
                        <div className='m-auto md:w-[50%] w-[90%] '>
                            <h3 className=" md:text-4xl text-3xl font-bold text-white mb-3">LUPIC NEWS</h3>
                            <p className="text-white md:text-lg text-lg w-full">Stay tuned for the latest updates, breakthroughs, and stories from the forefront of our research endeavors.</p>
                        </div>
                        <div className='m-auto md:w-[35%] w-[90%] flex mt-5'>
                            <input placeholder="Masukan judul..." className="pl-3 w-[100%] rounded-l-lg" type="text" name="las" /> <button className="bg-koreaRed px-3 py-2 rounded-r-lg text-white hover:bg-red-800">Cari</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* latest news */}
            <div className="w-[85%] m-auto">
                <div className="md:block grid grid-cols-1 justify-items-center md:justify-items-start">
                    <h1 className="md:text-5xl text-2xl md:mt-10 font-bold">Latest News</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
                </div>
                {/* News Highlight */}
                <div className="mt-8 w-full">
                    <a className="md:flex m-auto w-full" href="#">
                        <div className="md:w-[50%]">
                            <Image src={"/images/poster.jpg"} alt="" width={500} height={400} className="w-[600px] h-[300px] rounded-lg" />
                        </div>

                        <div className="md:px-5 md:w-[50%]">
                            <h3 className="md:text-4xl mt-3 text-2xl font-bold mb-2 text-koreaBlue md:text-start text-center">
                                {truncateText("Join our Fabrication Laboratory Workshop!", 7)}
                            </h3>
                            <p className="text-sm mb-2 text-koreaBlueMuda md:text-start text-center">18 Januari 2025</p>
                            <p className="text-justify mx-2 md:text-xl text-sm">
                                {truncateText(" Our Workshop will cover a variety of tools and methodologies including:- Digital Design Software (Tinkercad)- 3D Printer Operations - Laser Cutter Operations- 3D Scanner Operations By joining our FabLab workshop, you’ll gain:- Practical skills in digital fabrication.- Access to industry-standard machinery.- A deeper understanding of the entire design-to-production workflow.- E-certificate for 32JP for teacher or lecturer. Workshop Details- Location: Universitas Pendidikan Indonesia, FPMIPA C.- Date: 11 & 18", 45)}

                            </p>
                        </div>
                    </a>
                </div>

            </div>
            {/* other news */}
            <div className="w-[85%] m-auto md:mt-8 mt-1">
                <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center">
                    <h1 className="md:text-5xl text-2xl mt-10 font-bold ">Another News</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
                </div>
                <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-4 mt-2">
                    <CardNews />
                    <CardNews />
                    <CardNews />
                    <CardNews />
                    <CardNews />
                    <CardNews />
                    <CardNews />
                    <CardNews />
                </div>
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