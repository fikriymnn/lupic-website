"use client"
import { useEffect, useState } from "react";

export default function TableActivities2({point,sub_point,data}:any) {
    const [currentYear, setCurrentYear] = useState(0)
    const [filterData,setFilterData] = useState([{}])

    useEffect(()=>{
        data.forEach((v:any)=>{
            if(v.point==1,v.sub_point==sub_point){
                setFilterData([...filterData,v])
            }
        })
    },[])

    return (
        <>
            <div className="w-[100%] shadow">
                <div className="md:grid flex grid-cols-2 align-items-center w-full b-black bg-koreaBlueMuda rounded-t-xl">
                    <p className="w-full md:place-self-start md:p-4 py-3 px-3 md:text-lg text-xs font-bold">{point} asad asdasd asdasd safsa </p>
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
                    </div>
                </div>
                <div className="md:flex w-full items-center justify-between">
                    <div className="w-full">
                        <div className="w-full shadow p-4 ">
                            if(point==1&& currentYear==year_1||)
                            <p className="md:text-lg text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, officiis!</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}