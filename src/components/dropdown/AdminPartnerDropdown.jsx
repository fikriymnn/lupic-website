"use client"
import Image from "next/image"
import { useState } from "react"

export default function AdminPartnerDropdown({ nama, deskripsi,logo }) {
    const [active, setActive] = useState(true)
    return (
        <div className="mt-10">
            <div className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer" onClick={(e) => { setActive(!active) }}>
                <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-20 md:w-28 h-20 w-20 flex items-center">
                    <Image className="rounded-full m-auto md:h-20 md:w-24 h-20 w-20" src={logo} width={95} height={95} alt="foto" />
                </div>
                <h3 className="md:w-full w-[50%] md:text-xl text-xs font-bold text-white text-center">{nama}</h3>
                <button className="md:mr-10 mr-5" onClick={(e) => { setActive(!active) }}>
                    <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/white-up.svg"} width={30} height={30} alt="foto" />
                </button>
                <button className="md:mr-10 mr-5" onClick={(e) => { alert("hapus") }}>
                    <p className="text-xl text-white bg-koreaRed p-3 rounded-2xl">Delete</p>
                </button>
            </div>
            <div className={`w-[85%] m-auto ${active ? 'hidden' : 'block'}`}>
                {deskripsi}
            </div>
        </div>
    )
}