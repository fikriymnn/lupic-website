import Image from "next/image";

export default function CardEvent({ gambar, judul,  waktu, jam,lokasi,harga, id }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  return (
    <a
      href={"/service_workshop/" + id}
      className="md:w-[420px] md:p-4 w-[95%] md:mx-5 mt-4 "
    >
      <div className="w-full border-2 rounded-3xl p-4 shadow-lg">
        <img
        priority="true"
          src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
          alt="foto"
          width={500}
          height={500}
          className="w-[350px] md:h-[350px] h-[280px] rounded-xl m-auto"
        />
        <h3 className="font-bold line-clamp-2 text-xl md:mt-2 mt-2 text-koreaBlue">
          {judul}
        </h3>
        <p className=" font-bold text-base mt-2">{waktu} - {jam}</p>
        <p className="text-justify line-clamp-2 text-base">{lokasi}</p>
        <p className=" text-base font-bold">{harga?"IDR "+harga:"Coming Soon"}</p>
      </div>
    </a>
  );
}
