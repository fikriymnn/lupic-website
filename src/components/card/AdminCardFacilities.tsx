import Image from "next/image"

export default function CardFacilities(){
    const truncateText = (text: any, maxWords:any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return(
        <a className="mx-5 mt-4 block">
        <div className="w-[300px] shadow-xl rounded-xl">
            <Image src={'/images/poster.jpg'} alt="foto" width={1000} height={1000} className="w-[300px] h-[300px] rounded-xl"/>
            <div className=" p-2"> 
            <h3 className="font-bold text-center text-xl md:mt-2 mt-2 mb-1 text-koreaBlue">3D Printer Anycubic Photon D2 Big Size DLP</h3>
            <p className="m-auto w-[90%] text-sm text-justify pb-2">3D Printer Anycubic Photon D2 Big Size DLP sppaspd asdpasd asdpaspd asdpapsdasd asdas dasd asd</p>
            </div>
            <div className="flex justify-evenly pb-5">
            <button className="w-20" onClick={(e) => { window.location.href = "/lgndmn/dashboard/facilities/pas" }}>
                    <p className="text-sm text-white bg-koreaBlueMuda p-2 rounded-2xl">Edit</p>
                </button>
                <button className="w-20" onClick={(e) => { alert("hapus") }}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                </button>
            </div>
        </div>
        </a>
    )
}