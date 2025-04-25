"use client";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import CardNews from "@/components/card/CardNews";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import axios from "axios";
import { motion } from "framer-motion";

export default function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [data3,setData3] = useState({ judul: "", deskripsi: "", tanggal: "", _id: "", gambar: "" })
  const [data, setData] = useState([
    { judul: "", deskripsi: "", tanggal: "", _id: "", gambar: "" },
  ]);
  const [dataSearch, setDataSearch] = useState([
    { judul: "", deskripsi: "", tanggal: "", _id: "", gambar: "" },
  ]);
  const [totalPages, setTotalPage] = useState(1);
  const [totalPagesSearch, setTotalPageSearch] = useState(1);
  const [currentPageSearch, setCurrentPageSearch] = useState(1);
  const [search, setSearch] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const onSearch = async () => {
    try {
      const Data = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/news?page=" +
          currentPageSearch +
          "&limit=6" +
          (search ? `&search=${search}` : "")
      );
      const Data2 = await axios.get(
        process.env.NEXT_PUBLIC_API_URL +
          "/api/news?search=" +
          search +
          "&count=asd"
      );
      if (Data.data) {
        setDataSearch(Data.data);
        setSearchActive(true);
      }
      if (Data2.data) {
        setTotalPageSearch(Math.ceil(Data2.data / 6));
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/news?page=" +
            currentPage +
            "&limit=10"
        );
        
        const Data2 = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/news"
        );
        const Data3 = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/news?page=" +
            1 +
            "&limit=1"
        );
        if (Data.data) {
          setData(Data.data);
          setTotalPage(Math.ceil(Data2.data.length / 10));
          setData3(Data3.data[0])
          console.log(totalPages);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, [currentPage]);

  return (
    <>
      <Navbar />
      {/* hero section */}
      <div className="w-full flex justify-center mt-14 md:mb-14 mb-7">
        <div className="md:w-[85%] w-[90%] m-auto bg-gradient-to-b from-koreaBlue to-black md:py-20 py-16 rounded-tl-xl rounded-br-xl rounded-tr-[100px] rounded-bl-[100px]">
          <div className="md:px-20 px-5 grid md:flex grid-cols-1 justify-items-center items-start w-full m-auto ">
            <div className="m-auto md:w-[50%] w-[90%] ">
              <h3 className=" md:text-4xl text-3xl font-bold text-white mb-3">
                LUPIC NEWS
              </h3>
              <p className="text-white md:text-lg text-lg w-full">
                Stay tuned for the latest updates, breakthroughs, and stories
                from the forefront of our research endeavors.
              </p>
            </div>
            <div className="m-auto md:w-[35%] w-[90%] flex mt-5">
              <input
                placeholder="Masukan judul..."
                className="pl-3 w-[100%] rounded-l-lg"
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
              />{" "}
              <button
                className="bg-koreaRed px-3 py-2 rounded-r-lg text-white hover:bg-red-800"
                onClick={(e) => onSearch()}
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
      {searchActive ? (
        <div>
          <div className="w-[85%] m-auto md:mt-8 mt-1">
            <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center"></div>
            <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-4 mt-2">
              {dataSearch &&
                dataSearch.map((v, i) => {
                  if (i !== 0) {
                    return (
                      <CardNews
                        gambar={v.gambar}
                        key={i}
                        judul={v.judul}
                        deskripsi={v.deskripsi}
                        tanggal={v.tanggal}
                        id={v._id}
                      />
                    );
                  }
                })}
            </div>
          </div>
          <div className="w-[20%] m-auto mt-10 mb-10">
            <ResponsivePagination
              current={currentPageSearch}
              total={totalPagesSearch}
              onPageChange={setCurrentPageSearch}
            />
          </div>
        </div>
      ) : (
        ""
      )}
      {/* latest news */}
      <div className="w-[85%] m-auto">
        <div className="md:block grid grid-cols-1 justify-items-center md:justify-items-start">
          <h1 className="md:text-5xl text-2xl md:mt-10 font-bold">
            Latest News
          </h1>
          <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
        </div>
        {/* News Highlight */}
        <div className="mt-8 w-full">
          <a className="md:flex m-auto w-full" href={"/news/" + data3._id}>
            <div className="md:w-[50%]">
              <img
                src={process.env.NEXT_PUBLIC_API_FILE_URL + data3.gambar}
                alt=""
                className="md:w-[600px] md:h-[400px] w-full h-[250px] rounded-lg"
              />
            </div>

            <div className="md:px-5 md:w-[50%]">
              <h3 className="md:text-4xl mt-3 line-clamp-2 text-2xl font-bold mb-2 text-koreaBlue md:text-start ">
                {data3.judul}
              </h3>
              <p className="text-sm mb-2 text-koreaBlueMuda md:text-start">
                {data3.tanggal}
              </p>
              <p className="text-justify md:text-xl text-sm line-clamp-6">
                {data3.deskripsi}
              </p>
            </div>
          </a>
        </div>
      </div>
      {/* other news */}
      <div className="md:w-[85%] w-[95%] m-auto md:mt-8 mt-1">
        <div className="md:block md:justify-items-start grid grid-cols-1 justify-items-center">
          <h1 className="md:text-5xl text-2xl mt-10 font-bold ">
            Another News
          </h1>
          <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
        </div>
        <div className="grid md:grid-cols-3 justify-items-center grid-cols-1 md:mt-4 mt-2">
          {data &&
            data.map((v, i) => {

                return (
                  <motion.div
                    className="mx-5"
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CardNews
                      gambar={v.gambar}
                      key={i}
                      judul={v.judul}
                      deskripsi={v.deskripsi}
                      tanggal={v.tanggal}
                      id={v._id}
                    />
                  </motion.div>
                );
  
            })}
        </div>
      </div>
      <div className="w-[20%] m-auto mt-10 mb-16">
        <ResponsivePagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <CustomFooter />
    </>
  );
}
