"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CarouselActivities from "@/components/carousel/CarouselActivities"
import Image from "next/image"
import InformationDropdown from "@/components/dropdown/InformationDropdown"

export default function Activities() {
    const [active, setActive] = useState(true)
    const [active2, setActive2] = useState(true)
    const [active3, setActive3] = useState(true)
    const [active4, setActive4] = useState(true)

    return (
        <>
            <Navbar />
            <div className="w-full flex justify-center mt-14 mb-14">
                <CarouselActivities />
            </div>
            <div className=" text-center m-auto mb-4">
                <h3 className="md:text-4xl text-3xl mt-10 font-bold">Our Gallery</h3>
                <div className="h-1 w-36 bg-koreaRed mt-5 m-auto"></div>
            </div>
            <div>
                <div className="mt-5 m-auto w-[80%] pb-16">
                    <div className="mt-10">
                        <InformationDropdown />
                    </div>
                    <div className="mt-10">
                        <InformationDropdown />
                    </div>
                    <div className="mt-10">
                        <InformationDropdown />
                    </div>
                    <div className="mt-10">
                        <InformationDropdown />
                    </div>
                </div>
                <div className="mb-20">
                    <div className="w-[80%] m-auto ">
                        <h3 className="text-koreaRed text-xl font-bold">First year</h3>
                        <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive(!active) }}>
                            <h1 className="md:text-3xl text-3xl mt-2 font-bold">Greetings from coordinator LUPIC</h1>
                            <button className="" onClick={(e) => { setActive(!active) }}>
                                <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                            </button>
                        </div>
                        <div className="h-1 w-full bg-koreaRed mt-3"></div>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}