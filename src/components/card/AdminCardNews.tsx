import axios from "axios";
import Image from "next/image"

export default function AdminCardNews({judul,deskripsi,tanggal,id,gambar}:any){
    const truncateText = (text: any, maxWords:any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };


    const onDelete = async (e:any)=>{
        try{
            const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/news/"+id)
            if(message.data=="success"){
                alert("delete success")
                window.location.reload()
            }
        }catch(err:any){
            console.log(err.message)
        }
    }

    return(
        <div className="md:w-[350px] w-[90%] md:mx-5 mt-4">
        <div className="w-full">
            <Image src={process.env.NEXT_PUBLIC_API_FILE_URL+gambar} alt="foto" width={1000} height={1000} className="w-[500px] h-[250px] rounded-xl"/>
            <h3 className="font-bold text-lg md:mt-2 mt-2 mb-1 text-koreaBlue">{truncateText(judul,11)}</h3>
            <p className=" text-koreaBlueMuda text-xs">{tanggal}</p>
            <p className="text-justify text-base h-14">{truncateText(deskripsi,14)}</p>
        </div>
        <div className="flex justify-evenly pb-5 mt-2">
            <button className="w-20" onClick={(e) => { window.location.href = "/lgndmn/dashboard/news/"+id }}>
                    <p className="text-sm text-white bg-koreaBlueMuda p-2 rounded-2xl">Edit</p>
                </button>
                <button className="w-20" onClick={onDelete}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                </button>
            </div>
        </div>
        
    )
}