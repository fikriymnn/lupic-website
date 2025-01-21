import Image from "next/image"

export default function AdminCardNews(){
    const truncateText = (text: any, maxWords:any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return(
        <div className="md:w-[350px] w-[90%] md:mx-5 mt-4">
        <div className="w-full">
            <Image src={'/images/poster.jpg'} alt="foto" width={1000} height={1000} className="w-[500px] h-[250px] rounded-xl"/>
            <h3 className="font-bold text-lg md:mt-2 mt-2 mb-1 text-koreaBlue">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, sint?",11)}</h3>
            <p className=" text-koreaBlueMuda text-xs">19 Januari 2025</p>
            <p className="text-justify text-sm">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, atque! Lorem ipsumasdas asdasd asdsad sad aasdas dolor sit amet consectetur adipisicing elit. Obcaecati, assumenda.",23)}</p>
        </div>
        <div className="flex justify-evenly pb-5 mt-2">
            <button className="w-20" onClick={(e) => { window.location.href = "/lgndmn/dashboard/news/pas" }}>
                    <p className="text-sm text-white bg-koreaBlueMuda p-2 rounded-2xl">Edit</p>
                </button>
                <button className="w-20" onClick={(e) => { alert("hapus") }}>
                    <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                </button>
            </div>
        </div>
        
    )
}