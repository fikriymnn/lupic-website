"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CarouselActivities from "@/components/carousel/CarouselActivities"
import Image from "next/image"
import InformationDropdown from "@/components/dropdown/InformationDropdown"
import TableDataActivities from "@/components/table/TableDataActivities"

export default function Activities() {
    const [active, setActive] = useState(true)

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center mt-14 mb-14">
                <CarouselActivities />
            </div>
            <div className=" text-center m-auto mb-4">
                <h3 className="md:text-4xl text-3xl md:mt-10 mt-4 font-bold">Our Goals</h3>
                <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-3 m-auto"></div>
            </div>
            <div>
                <div className="mt-5 m-auto md:w-[80%] w-[90%] pb-16">
                    <div className="md:mt-10 mt-7">
                        <InformationDropdown />
                    </div>
                    <div className="md:mt-10 mt-7">
                        <InformationDropdown />
                    </div>
                    <div className="md:mt-10 mt-7">
                        <InformationDropdown />
                    </div>
                    <div className="md:mt-10 mt-7">
                        <InformationDropdown />
                    </div>
                </div>
                <div className="mb-20">
                    <div className="w-[80%] m-auto ">
                        <h3 className="text-koreaRed text-xl font-bold">First year</h3>
                        <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive(!active) }}>
                            <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                            <button className="" onClick={(e) => { setActive(!active) }}>
                                <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                            </button>
                        </div>
                        <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                        </div>
                        <div className={active?"hidden":"block"}>
                            <table className="w-full text-center align-center mt-5 md:block hidden">
                                <thead className="">
                                    <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                        <th className="py-4 w-[10%]">NO</th>
                                        <th className="py-4 w-[30%]">GOALS</th>
                                        <th className="py-4 w-[20%]">UPI</th>
                                        <th className="py-4 w-[20%]">UNNES</th>
                                        <th className="py-4 w-[20%]">UNDIKSHA</th>
                                    </tr>
                                </thead>
                                    <TableDataActivities />
                            </table>
                            <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                            <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                <thead className="rounded-xl">
                                    <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                        <th className="py-4 text-sm w-[10%]">NO</th>
                                        <th className="py-4 text-sm w-[30%]">GOALS</th>
                                        <th className="py-4 text-sm w-[20%]">UPI</th>
                                        <th className="py-4 text-sm w-[20%]">UNNES</th>
                                        <th className="py-4 text-sm w-[20%]">UNDIKSHA</th>
                                    </tr>
                                </thead>
                                    <TableDataActivities />
                            </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}