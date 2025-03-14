"use client";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import parse from "html-react-parser";

export default function EditToko({ params }) {
  const { id } = use(params);
  const [data, setData] = useState({
    judul: "",
    content: "",
    gambar: "",
    harga: "",
    deskripsi: "",
    link_shopee: "",
    link_tokped: "",
    _id: "",
  });

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/toko/" + id
        );
        if (Data.data) {
          setData(Data.data);
        }
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, []);

  return (
    <>
      <Navbar />
      <a
        href="/services"
        className="text-koreaRed relative md:top-[40px] md:left-[60px] top-[20px] left-[30px] md:text-xl text-lg"
      >
        Kembali &rarr;
      </a>
      <div className="w-full m-auto text-center md:mb-16 mb-4">
        <div className="md:w-[75%] w-[90%] text-center m-auto md:pt-8 pt-2 text-center mb-5">
          <h3 className="md:text-4xl text-xl md:mt-10 mt-5 font-bold md:mb-14 mb-3">
            DETAIL
          </h3>
        </div>
        <div className="md:w-[80%] w-[90%]  m-auto grid md:grid-cols-2 grid-cols-1 justify-items-center">
          <img
            src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar}
            alt="foto"
            width={600}
            height={600}
            className="md:w-[500px] md:h-[500px] w-full rounded-xl"
          />
          <div className="block justify-items-start">
            <h3 className="md:text-3xl text-2xl mt-10 font-bold text-koreaBlue text-start">
              {data.judul}
            </h3>
            <p className="md:text-2xl text-xl font-bold md:mt-5 mt-3">
              Rp.{data.harga}
            </p>
            <div className="flex justiy-evenly align-items-center md:mt-8 mt-3">
              {data.link_shopee ? (
                <button
                  onClick={(e) => {
                    window.open(data.link_shopee, "_blank");
                  }}
                  className="md:text-lg text-sm text-white bg-orange-600 md:px-3 px-2 md:py-2 py-1 rounded-lg mr-2"
                >
                  Link Shopee
                </button>
              ) : (
                ""
              )}
              {data.link_tokped ? (
                <button
                  onClick={(e) => {
                    window.open(data.link_tokped, "_blank");
                  }}
                  className="md:text-lg text-sm text-white bg-green-800 md:px-3 px-2 md:py-2 py-1 rounded-lg ml-2"
                >
                  Link Tokopedia
                </button>
              ) : (
                ""
              )}
            </div>
            <p className="md:mt-5 mt-4 md:text-lg text-lg text-justify md:mb-2 mb-2">
              {data.deskripsi}
            </p>
            <div className="md:text-xl text-lg text-justify mb-16">
              {parse(data.content)}
            </div>
          </div>
        </div>
      </div>
      <CustomFooter />
    </>
  );
}
