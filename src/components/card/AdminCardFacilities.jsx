"use client"
import axios from "axios";
import Image from "next/image"
import parse from "html-react-parser"

export default function CardFacilities({gambar,judul,deskripsi,content,_id}){
    const truncateText = (text, maxWords) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    const onDelete = async (e)=>{
        try{
            const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/facility/"+_id)
            if(message.data=="success"){
                alert("delete success")
                window.location.reload()
            }
        }catch(err){
            console.log(err.message)
        }
    }
 
    return(
        <a className="mx-5 mt-4 block">
        <div className="w-[300px] shadow-xl rounded-xl">
            <Image src={process.env.NEXT_PUBLIC_API_FILE_URL+gambar} alt="foto" width={1000} height={1000} className="w-[300px] h-[300px] rounded-xl"/>
            <div className=" p-2"> 
            <h3 className="font-bold text-center text-xl md:mt-2 mt-2 mb-1 text-koreaBlue">{judul}</h3>
            <p className="m-auto w-[90%] text-sm text-justify pb-2">{truncateText(deskripsi,30)}</p>
            </div>
            <div className="flex justify-evenly pb-5">
            <button className="w-20" onClick={(e) => { window.location.href = "/lgndmn/dashboard/facilities/"+_id }}>
                    <p className="text-sm text-white bg-koreaBlueMuda p-2 rounded-2xl">Edit</p>
                </button>
                <button className="w-20" onClick={onDelete}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                </button>
            </div>
        </div>
        </a>
    )
}