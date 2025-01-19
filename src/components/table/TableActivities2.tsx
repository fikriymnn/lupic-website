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
                <div className="grid grid-cols-2 align-items-center w-full b-black bg-koreaBlueMuda rounded-t-xl">
                    <p className="place-self-start p-4 text-lg font-bold">{title}</p>
                    <div className="place-self-end mr-5 m-auto ">
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
                <div className="flex w-full items-center justify-between">
                    <div className="w-full">
                        {goals && goals.map((v: any, i: any) => {
                            return (
                                <div key={i} className="w-full shadow p-4 ">
                                    <p className="text-lg">{v}</p>
                                </div>
                            )
                        })}

                    </div>
                    <div className="w-[45%] m-auto text-center">
                        <div className="m-auto text-center">
                            <h3 className="text-2xl font-bold w-[80%] m-auto ">Achievements (%) / yr ({currentYearValue})</h3>
                            <p className="font-bold text-3xl mt-2 text-koreaRed"> {currentYear}%</p>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}