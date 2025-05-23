import Image from "next/image"

export default function CardServiceToko({ gambar, judul, deskripsi, id,harga }) {
    const truncateText = (text, maxWords) => {
        const words = text.split(" ");
        if (words.length > maxWords) {
            return words.slice(0, maxWords).join(" ") + " ...";
        }
        return text;
    };

    return (
        <a className="mx-5 mt-4 block rounded-xl hover:bg-gray-200" href={"/services/" + id}>
            <div className="w-[300px] shadow-xl rounded-xl">
                <img src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar} alt="foto" width={1000} height={1000} className="w-[270px] h-[270px] rounded-xl m-auto mt-4" />
                <div className="px-4 h-24">
                    <h3 className="font-bold text-start text-lg md:mt-2 mt-2 mb-1 text-koreaBlue line-clamp-2">{judul}</h3>
                    <p className="m-auto text-base pb-1 line-clamp-2">{deskripsi}</p>
                </div>
                <div className="flex justify-end pb-2">
                   
                        <p className="mx-4 mt-2 font-bold text-lg p-3 rounded-2xl">Rp{harga}</p>
                   
                </div>
            </div>
        </a>
    )
}