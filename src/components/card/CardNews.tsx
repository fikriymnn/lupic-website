import Image from "next/image"

export default function CardNews(){
    return(
        <a href="#" className="md:w-[500px] w-[90%] mx-5 mt-4">
        <div className="w-full">
            <Image src={'/images/poster.jpg'} alt="foto" width={1000} height={1000} className="w-[500px] h-[250px] rounded-xl"/>
            <h3 className="font-bold text-lg md:mt-4 mt-2 mb-2 ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, sint?</h3>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam, atque! Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, assumenda.</p>
        </div>
        </a>
    )
}