"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import TableActivities2 from "../../table/TableActivities2"
import axios from "axios"

export default function InformationDropdown3() {
    const [active, setActive] = useState(true)
    const [data, setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            try{
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/activity_goals")
                console.log(Data)
                if(Data.data){
                    setData(Data.data)
                    console.log(data)
                    if(data){
                        setLoading(false)
                    }
                    
                }
            }catch(err){
                console.log(err.message)
            }
        }
        getData()
    }, [])

    return (
        <>
            <div>
                <div className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer" onClick={(e) => { setActive(!active) }}>
                    <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-24 h-20 w-20 flex items-center">
                        <p className="md:text-4xl text-xl font-bold text-white m-auto text-center">03</p>
                    </div>
                    <h3 className="md:text-xl w-[50%] text-xs font-bold text-white text-center">Retraining Program for Incumbent Science Teachers</h3>
                    <button className="md:mr-10 mr-5" onClick={(e) => { setActive(!active) }}>
                        <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/white-up.svg"} width={30} height={30} alt="foto" />
                    </button>
                </div>
                <div className={`w-[85%] m-auto  ${active ? 'hidden' : 'block'}`}>
                    {
                        loading?"":<div className="mt-8">
                        <TableActivities2 point={3} sub_point={1} title_sub_point={"3-1. Improvement of personal Competence in majoring field"}  data={data} />
                        <TableActivities2 point={3} sub_point={2} title_sub_point={"3-2. Development of Integrated Science Education Capabilities"} data={data} />
                         <TableActivities2 point={3} sub_point={3} title_sub_point={"3-3. Operation of National Science Teacher Network"} data={data} />
                    </div>
                    }
                    
                </div>
            </div>
        </>
    )
}