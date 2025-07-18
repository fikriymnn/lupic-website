import Image from "next/image";

export default function CardNews({ gambar, judul, deskripsi, tanggal, id }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  return (
    <a
      href={"/news/" + id}
      className="md:w-[350px] md:p-4 w-[90%] md:mx-5 mt-4 "
    >
      <div className="w-[350px]">
        <img
        priority="true"
          src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
          alt="foto"
          width={600}
          height={300}
          className="w-full h-[200px] rounded-xl"
        />
        <h3 className="font-bold line-clamp-2 text-base md:mt-2 mt-2 text-koreaBlue">
          {judul}
        </h3>
        <p className=" text-koreaBlueMuda text-xs">{tanggal}</p>
        <p className="text-justify line-clamp-2 text-sm md:mb-0 mb-8">{deskripsi}</p>
      </div>
    </a>
  );
}
