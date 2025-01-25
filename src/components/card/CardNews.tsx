import Image from "next/image"

export default function CardNews(){
    const truncateText = (text: any, maxWords:any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
          return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return(
        <a href="/news/1" className="md:w-[350px] md:p-4 w-[90%] md:mx-5 mt-4 hover:bg-gray-200">
        <div className="w-full">
            <Image src={'/images/poster.jpg'} alt="foto" width={1000} height={1000} className="w-[500px] h-[250px] rounded-xl"/>
            <h3 className="font-bold text-lg md:mt-2 mt-2 mb-1 text-koreaBlue h-16">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, sint?",11)}</h3>
            <p className=" text-koreaBlueMuda text-xs">19 Januari 2025</p>
            <p className="text-justify text-base h-14">{truncateText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, atque! Lorem ipsumasdas asdasd asdsad sad aasdas dolor sit amet consectetur adipisicing elit. Obcaecati, assumenda.",14)}</p>
        </div>
        </a>
    )
}