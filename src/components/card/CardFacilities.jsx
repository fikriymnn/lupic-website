import Image from "next/image";

export default function CardFacilities({ gambar, judul, deskripsi, id }) {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + " ...";
    }
    return text;
  };

  return (
    <a className="mx-5 mt-4 hover:bg-gray-200 block" href={"/facilities/" + id}>
      <div className="w-[300px] shadow-xl rounded-xl">
        <img
          src={process.env.NEXT_PUBLIC_API_FILE_URL + gambar}
          alt="foto"
          className="w-[300px] h-[300px] rounded-xl"
        />
        <div className=" p-2">
          <h3 className="font-bold line-clamp-2 text-center text-xl md:mt-2 mt-2 mb-1 text-koreaBlue h-14">
            {judul}
          </h3>
          <p className="m-auto line-clamp-2 w-[90%] text-sm text-justify pb-2 h-16">
            {truncateText(deskripsi, 30)}
          </p>
        </div>
      </div>
    </a>
  );
}
