import Image from "next/image"

export default function CardServiceToko({ gambar, judul, deskripsi, id,harga }: any) {
    const truncateText = (text: any, maxWords: any) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return (
        <a className="mx-5 mt-4 block hover:bg-gray-200" href={"/services/" + id}>
            <div className="w-[300px] shadow-xl rounded-xl">
                <Image src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar} alt="foto" width={1000} height={1000} className="w-[300px] h-[300px] rounded-xl" />
                <div className=" px-2">
                    <h3 className="font-bold text-center text-xl md:mt-2 mt-2 mb-1 text-koreaBlue">{judul}</h3>
                    <p className="m-auto w-[90%] text-basee text-justify pb-1">{truncateText(deskripsi, 30)}</p>
                </div>
                <div className="flex justify-end pb-2">
                    <div className="w-20 mr-7">
                        <p className=" font-bold text-lg p-2 rounded-2xl">Rp{harga}</p>
                    </div>
                </div>
            </div>
        </a>
    )
}