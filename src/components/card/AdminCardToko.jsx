import axios from "axios";
import Image from "next/image"

export default function AdminCardToko({ gambar, judul, deskripsi, id, harga }) {
    const truncateText = (text, maxWords) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    const onDelete = async (e) => {
        try {
            const message = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/toko/"+id)
            if(message.data=="success"){
                alert("delete success")
                window.location.reload()
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <a className="w-[350px] mx-5 mt-4 block ">
            <div className="w-[350px] shadow-xl rounded-xl">
                <Image src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar} alt="foto" width={1000} height={1000} className="w-[300px] h-[300px] rounded-xl m-auto" />
                <div className=" px-2">
                    <h3 className="font-bold text-center text-xl md:mt-3 mt-2 mb-2 text-koreaBlue w-[95%]">{judul}</h3>
                    <p className="m-auto w-[90%] text-sm text-justify pb-2 w-[95%]">{truncateText(deskripsi, 30)}</p>
                </div>
                <div className="flex justify-end pb-2">
                    <div className="w-20 mr-7">
                        <p className=" font-bold text-lg p-2 rounded-2xl">Rp{harga}</p>
                    </div>
                </div>
                <div className="flex justify-evenly pb-5">
                    <button className="w-20" onClick={(e) => { window.location.href = "/lgndmn/dashboard/services/" + id }}>
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