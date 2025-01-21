"use client"
import React, {useState} from "react";
import Sidebar from "@/components/Sidebar";
import Editor from "react-simple-wysiwyg";
import AdminCardFacilities from "@/components/card/AdminCardFacilities";
import AdminCardNews from "@/components/card/AdminCardNews";

export default  function News() {
  const [file, setFile] = useState({ name: "" });
      const [html, setHtml] = useState('my <b>HTML</b>');
    
      function onChange(e: any) {
        setHtml(e.target.value);
      }
    
      const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
      };
    
      const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!file) {
          alert("Pilih file terlebih dahulu!");
          return;
        }
        console.log("File uploaded:", file);
      };
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="w-full">
        <div className="p-6 mt-8 text-center">
          <h1 className="text-3xl font-bold text-koreaBlue">FACILITIES CONTENT</h1>
        </div>
        <div className="m-auto w-full">

          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <button
               onClick={(e)=>{window.location.href = "/lgndmn/dashboard/news/add_news"}}
                className="mt-4 mb-5 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 my-5 w-[80%]"

              >
                Tambahkan News
              </button>
            <div className="flex flex-wrap justify-evenly">
              <AdminCardNews/> <AdminCardNews/>
              <AdminCardNews/> <AdminCardNews/>
            </div>


          </div>
        </div>
      </div >
    </div>
  );
}

