"use client"
import { useState } from "react"
import Image from "next/image"
import TableActivities2 from "../table/TableActivities2"

export default function InformationDropdown() {
    const [active, setActive] = useState(true)
    const [dataGoals,setDataGoals] = useState([{
        title_goals:"1-1. Enhancement of Education Capability",
        goals:[
            {
            text: "1-1-1. Holding chemistry education expert consulting meetings (once a year)",
            year:1
            }   
        ]
    },{
        title_goals:"1-2. Enhancement of Education Capability",
        goals:[
            {
                text: "1-1-1. Holding chemistry education expert consulting meetings (once a year)",
                year:1
            } 
        ],
    }])

    return (
        <>
            <div>
                <div className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer" onClick={(e) => { setActive(!active) }}>
                    <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-24 h-20 w-20 flex items-center">
                        <p className="md:text-4xl text-xl font-bold text-white m-auto text-center">01</p>
                    </div>
                    <h3 className="md:text-xl w-[50%] text-xs font-bold text-white text-center">National University's Chemistry Education and Capacity Building Program</h3>
                    <button className="md:mr-10 mr-5" onClick={(e) => { setActive(!active) }}>
                        <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/white-up.svg"} width={30} height={30} alt="foto" />
                    </button>
                </div>
                <div className={`w-[85%] m-auto  ${active ? 'hidden' : 'block'}`}>
                    <div className="mt-8">
                                <TableActivities2 />
                   </div>
                </div>
            </div>
        </>
    )
}