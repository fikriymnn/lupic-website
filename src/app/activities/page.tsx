"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CarouselActivities from "@/components/carousel/CarouselActivities"
import Image from "next/image"
import InformationDropdown from "@/components/dropdown/InformationDropdown"
import TableDataActivities from "@/components/table/TableDataActivities"
// import TableActivities2 from "@/components/table/TableActivities2"
import InformationDropdown1 from "@/components/dropdown/information/InformationDropdown1"
import InformationDropdown2 from "@/components/dropdown/information/InformationDropdown2"
import InformationDropdown3 from "@/components/dropdown/information/InformationDropdown3"
import InformationDropdown4 from "@/components/dropdown/information/InformationDropdown4"
import axios from "axios"

export default function Activities() {
    const [active, setActive] = useState(true)
    const [active2, setActive2] = useState(true)
    const [active3, setActive3] = useState(true)
    const [active4, setActive4] = useState(true)
    const [active5, setActive5] = useState(true)
    const [active6, setActive6] = useState(true)
    const [data, setData] = useState([])

    useEffect(() => {
        async function getData() {
            try {
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/activity_goals")
                if (Data.data) {
                    setData(Data.data)

                }
            } catch (err: any) {
                console.log(err.message)
            }
        }
        getData()
    }, [])

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
                        <div className="my-10">
                            <InformationDropdown1 />
                        </div>
                        <div className="my-10">
                            <InformationDropdown2 />
                        </div>
                        <div className="my-10">
                            <InformationDropdown3 />
                        </div>
                        <div className="my-10">
                            <InformationDropdown4 />
                        </div>

                    </div>
                </div>
                <div className="mb-20 w-full">
                    <div className="w-[80%] m-auto ">
                        <div className="w-full">
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">First year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive(!active) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive(!active) }}>
                                    <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={`${active ? "hidden" : "block"} w-full`}>
                                <table className="w-full b0 text-center align-center mt-5 md:block hidden">

                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda  ">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                console.log(v)
                                                console.log("first")
                                                if (v.year_1.upi || v.year_1.unnes || v.year_1.undiksha) {

                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_1.upi || ""} unnes={v.year_1.unnes} undiksha={v.year_1.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block ">
                                    <table className="w-[550px] text-center align-center mt-5 ">
                                        <thead className="">
                                            <tr className="text-lg bg-koreaBlueMuda  shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_1.upi || v.year_1.unnes || v.year_1.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_1.upi || ""} unnes={v.year_1.unnes} undiksha={v.year_1.undiksha} />
                                                        )
                                                    }
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">Second year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive2(!active2) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive2(!active2) }}>
                                    <Image className={active2 ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={active2 ? "hidden" : "block"}>
                                <table className="w-full text-center align-center mt-5 md:block hidden">
                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                if (v.year_2.upi || v.year_2.unnes || v.year_2.undiksha) {
                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_2.upi || ""} unnes={v.year_2.unnes} undiksha={v.year_2.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                                    <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                        <thead className="rounded-xl">
                                            <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_2.upi || v.year_2.unnes || v.year_2.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_2.upi || ""} unnes={v.year_2.unnes} undiksha={v.year_2.undiksha} />
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">Third year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive3(!active3) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive3(!active3) }}>
                                    <Image className={active3 ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={active3 ? "hidden" : "block"}>
                                <table className="w-full text-center align-center mt-5 md:block hidden">
                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                if (v.year_3.upi || v.year_3.unnes || v.year_3.undiksha) {
                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_3.upi || ""} unnes={v.year_3.unnes} undiksha={v.year_3.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                                    <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                        <thead className="rounded-xl">
                                            <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_3.upi || v.year_3.unnes || v.year_3.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_3.upi || ""} unnes={v.year_3.unnes} undiksha={v.year_3.undiksha} />
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">Fourth year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive4(!active4) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive4(!active4) }}>
                                    <Image className={active4 ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={active4 ? "hidden" : "block"}>
                                <table className="w-full text-center align-center mt-5 md:block hidden">
                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                if (v.year_4.upi || v.year_4.unnes || v.year_4.undiksha) {
                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_4.upi || ""} unnes={v.year_4.unnes} undiksha={v.year_4.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                                    <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                        <thead className="rounded-xl">
                                            <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_4.upi || v.year_4.unnes || v.year_4.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_4.upi || ""} unnes={v.year_4.unnes} undiksha={v.year_4.undiksha} />
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">Fifth year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive5(!active5) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive5(!active5) }}>
                                    <Image className={active5 ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={active5 ? "hidden" : "block"}>
                                <table className="w-full text-center align-center mt-5 md:block hidden">
                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                if (v.year_5.upi || v.year_5.unnes || v.year_5.undiksha) {
                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_5.upi || ""} unnes={v.year_5.unnes} undiksha={v.year_5.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                                    <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                        <thead className="rounded-xl">
                                            <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_5.upi || v.year_5.unnes || v.year_5.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_5.upi || ""} unnes={v.year_5.unnes} undiksha={v.year_5.undiksha} />
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="md:mt-7 mt-2 text-koreaRed text-xl font-bold">Sixth  year</h3>
                            <div className="flex justify-between cursor-pointer" onClick={(e) => { setActive6(!active6) }}>
                                <h1 className="md:text-3xl text-2xl mt-2 font-bold">Activities</h1>
                                <button className="" onClick={(e) => { setActive6(!active6) }}>
                                    <Image className={active6 ? "" : "rotate-180"} src={"/images/logoAbout/up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className="h-1 w-full mt-3 bg-koreaRed mb-2">

                            </div>
                            <div className={active6 ? "hidden" : "block"}>
                                <table className="w-full text-center align-center mt-5 md:block hidden">
                                    <thead className="">
                                        <tr className="text-lg bg-koreaBlueMuda rounded-xl">
                                            <th className="py-4 w-[30rem]">NO</th>
                                            <th className="py-4 w-[200rem]">GOALS</th>
                                            <th className="py-4 w-[100rem]">UPI</th>
                                            <th className="py-4 w-[100rem]">UNNES</th>
                                            <th className="py-4 w-[100rem]">UNDIKSHA</th>
                                        </tr>
                                    </thead>
                                    <tbody className="md:text-base text-xs">
                                        {
                                            data && data.map((v: any, i: any) => {
                                                if (v.year_6.upi || v.year_6.unnes || v.year_6.undiksha) {
                                                    return (
                                                        <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_6.upi || ""} unnes={v.year_6.unnes} undiksha={v.year_6.undiksha} />
                                                    )
                                                }
                                            })
                                        }

                                    </tbody>
                                </table>
                                <div className="md:w-[80%] w-full overflow-x-auto md:hidden block rounded-xl">
                                    <table className="w-[550px] text-center align-center mt-5 rounded-xl">
                                        <thead className="rounded-xl">
                                            <tr className="text-lg bg-koreaBlueMuda rounded-xl shadow-lg">
                                                <th className="py-4 text-sm w-[30rem]">NO</th>
                                                <th className="py-4 text-sm w-[200rem]">GOALS</th>
                                                <th className="py-4 text-sm w-[100rem]">UPI</th>
                                                <th className="py-4 text-sm w-[100rem]">UNNES</th>
                                                <th className="py-4 text-sm w-[100rem]">UNDIKSHA</th>
                                            </tr>
                                        </thead>
                                        <tbody className="md:text-base text-xs">
                                            {
                                                data && data.map((v: any, i: any) => {
                                                    if (v.year_6.upi || v.year_6.unnes || v.year_6.undiksha) {
                                                        return (
                                                            <TableDataActivities key={i} point={v.point} sub_point={v.sub_point} sub_sub_point={v.sub_sub_point} text={v.text} upi={v.year_6.upi || ""} unnes={v.year_6.unnes} undiksha={v.year_6.undiksha} />
                                                        )
                                                    }
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}