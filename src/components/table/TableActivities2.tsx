"use client"
import { useState } from "react";

export default function TableActivities2({ dataYear, dataGoals, dataTitleGoals }: any) {
    const [currentYear, setCurrentYear] = useState(0)
    const [currentYearValue, setCurrentYearValue] = useState(0)
    const [year, setYear] = useState(dataYear)
    const [goals, setGoals] = useState(dataGoals)
    const [title, setTitle] = useState(dataTitleGoals)

    return (
        <>
            <div className="w-[100%] shadow">
                <div className="md:grid flex grid-cols-2 align-items-center w-full b-black bg-koreaBlueMuda rounded-t-xl">
                    <p className="w-full md:place-self-start md:p-4 py-3 px-3 md:text-lg text-xs font-bold">{title} asad asdasd asdasd safsa </p>
                    <div className="md:place-self-end m-auto md:hidden block w-[50%] ">
                    <select className="h-8 w-[90%] bg-koreaBlueMuda border-2 rounded-xl pl-2 md:text-base text-sm text-white bg-koreaBlue" name="year" onChange={(e:any)=>{
                        setCurrentYearValue(e.target.options[e.target.selectedIndex].text)
                        setCurrentYear(e.target.value)
                    }}>
                        <option className="text-xs text-white" value="">year</option>
                        {
                            year && year.map((value: any, i: any) => {
                                console.log(i)
                                return (
                                    <option className="text-xs text-white" key={i} value={value.percent} onClick={(e)=>{
                                        setCurrentYear(value.year);
                                    }}>{value.year}</option>
                                )
                            })
                        }
                    </select>
                    </div>
                    <div className="place-self-end mr-5 m-auto md:block hidden">
                        {
                            year && year.map((value: any, i: any) => {
                                console.log(i)
                                return (
                                    <button key={i} className={`mx-2 border-2 text-xs font-bold rounded-3xl px-2 py-1 ${year[i].year == currentYearValue ? "bg-koreaBlue text-white" : "bg-koreaBlueMuda"}`} onClick={(e) => {
                                        setCurrentYear(value.percent);
                                        setCurrentYearValue(value.year)
                                    }}>Year {value.year}</button>
                                )
                            })
                        }

                    </div>
                </div>
                <div className="md:flex w-full items-center justify-between">
                    <div className="w-[60%] m-auto text-center md:hidden block">
                        <div className="m-auto text-center py-3">
                            <h3 className="md:text-2xl text-lg font-bold md:w-[80%] w-[90%] m-auto ">Achievements (%) / yr ({currentYearValue})</h3>
                            <p className="font-bold md:text-3xl text-xl mt-2 text-koreaRed"> {currentYear}%</p>
                        </div>
                    </div>
                    <div className="w-full">
                        {goals && goals.map((v: any, i: any) => {
                            return (
                                <div key={i} className="w-full shadow p-4 ">
                                    <p className="md:text-lg text-xs">{v}</p>
                                </div>
                            )
                        })}

                    </div>
                    <div className="w-[60%] m-auto text-center md:block hidden">
                        <div className="m-auto text-center py-3">
                            <h3 className="md:text-2xl text-lg font-bold md:w-[80%] w-[90%] m-auto ">Achievements (%) / yr ({currentYearValue})</h3>
                            <p className="font-bold md:text-3xl text-xl mt-2 text-koreaRed"> {currentYear}%</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}