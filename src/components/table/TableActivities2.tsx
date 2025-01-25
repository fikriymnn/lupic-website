"use client"
import { useEffect, useState } from "react";

export default function TableActivities2({ point, sub_point, data, title_sub_point }: any) {
    const [currentYear, setCurrentYear] = useState(0)
    const [rawData,setRawData] = useState([])
    const [filterData, setFilterData] = useState([{}])

    useEffect(() => {


        setRawData(data)
        console.log(rawData)
    }, [])
    // useEffect(() => {


        
    //     if(data.length>0){
    //         setRawData(data)
    //         if(rawData){
    //             console.log(rawData)
    //         }
    //     }
    //     // console.log(data)
    // }, [data])

    return (
        <>
            <div className="w-[100%] shadow">
                <div className="md:grid flex grid-cols-2 align-items-center w-full b-black bg-koreaBlueMuda rounded-t-xl">
                    <p className="w-full md:place-self-start md:p-4 py-3 px-3 md:text-lg text-xs font-bold">{title_sub_point} </p>
                    <div className="md:place-self-end m-auto md:hidden block w-[50%] ">
                        <select className="h-8 w-[90%] bg-koreaBlueMuda border-2 rounded-xl pl-2 md:text-base text-sm text-white bg-koreaBlue" name="year" onChange={(e: any) => {
                            setCurrentYear(e.target.value)
                        }}>
                            <option className="text-xs text-white" value="">year</option>
                            <option className="text-xs text-white" value={1}>1</option>
                            <option className="text-xs text-white" value={2}>2</option>
                            <option className="text-xs text-white" value={3}>3</option>
                            <option className="text-xs text-white" value={4}>4</option>
                            <option className="text-xs text-white" value={5}>5</option>
                            <option className="text-xs text-white" value={6}>6</option>
                        </select>
                    </div>
                    <div className="place-self-end mr-5 m-auto md:block hidden">
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 1 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(1);
                        }}>Year 1</button>
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 2 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(2);
                        }}>Year 2</button>
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 3 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(3);
                        }}>Year 3</button>
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 4 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(4);
                        }}>Year 4</button>
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 5 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(5);
                        }}>Year 5</button>
                        <button className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${currentYear == 6 ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                            setCurrentYear(6);
                        }}>Year 6</button>
                    </div>
                </div>
                <div className="md:flex w-full items-center justify-between">
                    <div className="w-full">
                        <div className="w-full shadow ">
                            {
                                data && data.map((v: any, i: any) => {
                                    if(v.point==point&&v.sub_point==sub_point){
                                    if  ((currentYear == 1 && (v.year_1.upi || v.year_1.unnes || v.year_1.undiksha)) || (currentYear == 2 && (v.year_2.upi || v.year_2.unnes || v.year_2.undiksha)) || (currentYear == 3 && (v.year_3.upi || v.year_3.unnes || v.year_3.undiksha)) || (currentYear == 4 && (v.year_4.upi || v.year_4.unnes || v.year_4.undiksha)) || (currentYear == 5 && (v.year_5.upi || v.year_5.unnes || v.year_5.undiksha)) || (currentYear == 6 && (v.year_6.upi || v.year_6.unnes || v.year_6.undiksha))) {
                                        return (
                                            <p key={i} className="md:text-lg text-xs bg-gray-200 py-4 px-5 border">{v.text}</p>
                                        )
                                    } else{
                                        return (
                                            <p key={i} className="md:text-lg text-xs py-4 px-5 border">{v.text}</p>
                                        )
                                    }}
                                })
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}