"use client"
import axios from "axios"
import Image from "next/image"

export default function AdminCarouselActivities({deskripsi,judul,gambar,id}) {
    const handleDelete = async()=>{
        try{
            const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL+"/api/activity_carousel/"+id)
            if(message.data=="success"){
                alert("delete success")
                window.location.reload()
            }
        }catch(err){
            console.log(err.message)
        }
    }
    return (
        <div className="border-2 w-[90%] m-auto my-2">
            <table className="border-2 w-full m-auto ">
                <tbody >
                    <tr className="text-xl text-center">
                        <td className="font-bold px-5 pt-2 pb-1">
                            {judul}
                        </td>
                        <td rowSpan={2}>
                            <Image className="" src={process.env.NEXT_PUBLIC_API_FILE_URL+gambar} alt="foto" width={200} height={100} />
                        </td>
                    </tr>
                    <tr className="text-sm text-center">
                        <td className="w-[70%] px-5">
                           {deskripsi}
                        </td>
                    </tr>
                    <tr>
                        <td><button className="w-20 p-3" onClick={(e) => { handleDelete() }}>
                            <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                        </button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}