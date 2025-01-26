import Image from "next/image"

export default function CardNews({judul,deskripsi,tanggal,id}:any){
    const truncateText = (text: any, maxWords:any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return(
        
        <a href={"/news/"+id} className="md:w-[500px] md:p-4 w-[90%] md:mx-5 mt-4 ">
        <div className="w-full">
            <Image src={'/images/poster.jpg'} alt="foto" width={600} height={300} className="w-[500px] h-[300px] rounded-xl"/>
            <h3 className="font-bold text-lg md:mt-2 mt-2 text-koreaBlue">{truncateText(judul,14)}</h3>
            <p className=" text-koreaBlueMuda text-xs">{tanggal}</p>
            <p className="text-justify text-base h-14">{truncateText(deskripsi,14)}</p>
        </div>
        </a>
    )
}