"use client"
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Editor from 'react-simple-wysiwyg';
import AdminCarouselActivities from "@/components/carousel/AdminCarouselActivities";
import axios from "axios";

export default function Activities() {
  const [file, setFile] = useState("");
  const [data, setData] = useState([])
  const [data2, setData2] = useState([{ year_1: {upi:"",unnes:"",undiksha:""}, year_2: {upi:"",unnes:"",undiksha:""}, year_3: {upi:"",unnes:"",undiksha:""}, year_4: {upi:"",unnes:"",undiksha:""}, year_5: {upi:"",unnes:"",undiksha:""}, year_6: {upi:"",unnes:"",undiksha:""}}])
  const [form, setForm] = useState({ judul: "", gambar: "", deskripsi: "" })
  const [year, setYear] = useState(1)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const handleChangeGoals = async (v: any, e: any, year: any) => {
  //   console.log(v)
  //   try {
  //     let obj = {
  //       point: v.point,
  //       sub_point: v.sub_point,
  //       sub_sub_point: v.sub_sub_point,
  //       text: v.text,
  //       year_1: v.year_1,
  //       year_2: v.year_2,
  //       year_3: v.year_3,
  //       year_4: v.year_4,
  //       year_5: v.year_5,
  //       year_6: v.year_6,
  //     }
  //     switch (year) {
  //       case 1: obj.year_1 = e.target.checked; break;
  //       case 2: obj.year_2 = e.target.checked; break;
  //       case 3: obj.year_3 = e.target.checked; break;
  //       case 4: obj.year_4 = e.target.checked; break;
  //       case 5: obj.year_5 = e.target.checked; break;
  //       case 6: obj.year_6 = e.target.checked; break;
  //       default: ""
  //     }
  //     const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/activity_goals/" + v._id, obj)
  //   } catch (err: any) {
  //     console.log(err.message)
  //   }
  // };

  const handleSubmit2 = async ( v: any,i:any) => {
    try {
       const message = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/activity_goals/" + v._id, {
        point: v.point,
        sub_point: v.sub_point,
        sub_sub_point: v.sub_sub_point,
        text: v.text,
        year_1: data2[i].year_1,
        year_2: data2[i].year_2,
        year_3: data2[i].year_3,
        year_4: data2[i].year_4,
        year_5: data2[i].year_5,
        year_6: data2[i].year_6,
      })
      if(message.data=="success"){
        alert("save success")
      }
    } catch (err: any) {
      console.log(err.message)
    }
  };

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Pilih file terlebih dahulu!");
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const getData = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/file", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (getData.data) {
        const message = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/activity_carousel", {
          gambar: getData.data,
          judul: form.judul,
          deskripsi: form.deskripsi,
        })
        if (message.data == "success") {
          window.location.reload()
        }
      }
    } catch (err: any) {
      console.log(err.message)
    }

  };

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/activity_carousel/")
        if (Data.data) {
          setData(Data.data)
        }
        const Data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/activity_goals/")
        if (Data2.data) {
          setData2(Data2.data)
        }
      } catch (err: any) {
        console.log(err.message)
      }
    }
    getData();
  }, [])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64"></div>
      <div className="w-full mb-14">
        <div className="p-6 mt-8 text-center ">
          <h1 className="text-3xl font-bold text-koreaBlue">ABOUT CONTENT</h1>
        </div>
        <div className="m-auto w-full">
          <div className=" m-auto bg-white p-6 rounded-lg shadow-lg w-[80%] border-2">
            <form onSubmit={handleSubmit}>
              <h2 className="text-3xl pt-4 font-semibold text-start mb-4">Carousel</h2>

              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Foto
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className=""
                  id="fileInput"
                  name="file"
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Judul
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="judul"
                  onChange={handleChange}
                  value={form.judul}
                />
                <label className="block text-gray-700 font-medium mb-2 text-xl mt-3">
                  Deskripsi
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama..."
                  className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  name="deskripsi"
                  onChange={handleChange}
                  value={form.deskripsi}
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Tambahkan
              </button>
            </form>
            <p className="mt-8 text-2xl text-center font-bold">LIST CAROUSEL</p>
            <div className="mt-5">
              {
                data && data.map((v: any, i: any) => {
                  return (
                    <AdminCarouselActivities id={v._id} deskripsi={v.deskripsi} judul={v.judul} gambar={v.gambar} key={i} />
                  )
                })
              }

            </div>


            <h2 className="text-3xl pt-14 font-semibold text-start mb-4 w-full">Goals</h2>
            <div className="w-full flex justify-end">
              <div className=" grid grid-cols-6 justify-items-center align-items-center items-center w-[50%] mb-3">
                <button className={`${year==1?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(1) }}>Year 1</button>
                <button className={`${year==2?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(2) }}>Year 2</button>
                <button className={`${year==3?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(3) }}>Year 3</button>
                <button className={`${year==4?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(4) }}>Year 4</button>
                <button className={`${year==5?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(5) }}>Year 5</button>
                <button className={`${year==6?"bg-gray-200":""} text-base px-4 py-2 rounded-lg border-2 mx-2`} onClick={(e) => { setYear(6) }}>Year 6</button>
              </div>

            </div>

            <div className="mb-14">
              <div className="w-full flex justify-evenly border-2 p-2 mb-2">
                <p className="text-lg w-[50%] text-center">Goals</p>
                <div className="w-[35%] grid grid-cols-3 j align-items-center">
                  <p className="text-lg text-center">UPI</p>
                  <p className="text-lg text-center">UNNES</p>
                  <p className="text-lg text-center">UNDIKSHA</p>
                </div>
                <p className="text-lg w-[15%] text-center">Action</p>
              </div>
              {/* list */}
              {
                data2 && data2.map((v: any, i: any) => {
                  return (
                    <div key={i} className="w-full p-6 border rounded-lg shadow-md bg-white">
                      <div className="grid grid-cols-2 gap-4 items-center">
                        <div className="font-semibold text-gray-700">{v.text}</div>
                        <form onSubmit={(e:any)=>{
                          e.preventDefault();
                           handleSubmit2(v,i);
                           }} className="grid grid-cols-4 gap-2 ">

                          
                          <input
                            type="text"
                            placeholder="UPI..."
                            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="upi"
                            onChange={(e: any) => {
                              let newData2 = [...data2]
                                switch (year) {
                                  case 1:
                                    newData2[i].year_1.upi = e.target.value
                                    break;
                                  case 2:
                                    newData2[i].year_2.upi = e.target.value
                                    break;
                                  case 3:
                                    newData2[i].year_3.upi = e.target.value
                                    break;
                                  case 4:
                                    newData2[i].year_4.upi = e.target.value
                                    break;
                                  case 5:
                                    newData2[i].year_5.upi = e.target.value
                                    break;
                                  case 6:
                                    newData2[i].year_6.upi = e.target.value
                                    break;

                                  default:
                                    false
                                    break;
                                }
                              setData2(newData2)
                            }}
                            value={(year == 1 ? data2[i].year_1.upi : year == 2 ? data2[i].year_2.upi : year == 3 ? data2[i].year_3.upi : year == 4 ? data2[i].year_4.upi : year == 5 ? data2[i].year_5.upi : year == 6 ? data2[i].year_6.upi : "")||""}
                          />
                          <input
                            type="text"
                            placeholder="UNNES..."
                            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="judul"
                            onChange={(e: any) => {
                              let newData2 = [...data2]
                              switch (year) {
                                case 1:
                                  newData2[i].year_1.unnes = e.target.value
                                  break;
                                case 2:
                                  newData2[i].year_2.unnes = e.target.value
                                  break;
                                case 3:
                                  newData2[i].year_3.unnes = e.target.value
                                  break;
                                case 4:
                                  newData2[i].year_4.unnes = e.target.value
                                  break;
                                case 5:
                                  newData2[i].year_5.unnes = e.target.value
                                  break;
                                case 6:
                                  newData2[i].year_6.unnes = e.target.value
                                  break;

                                default:
                                  false
                                  break;
                              }

                              setData2(newData2)
                            }}
                            value={(year == 1 ? data2[i].year_1.unnes : year == 2 ? data2[i].year_2.unnes : year == 3 ? data2[i].year_3.unnes : year == 4 ? data2[i].year_4.unnes : year == 5 ? data2[i].year_5.unnes : year == 6 ? data2[i].year_6.unnes : "")||""}
                          />
                          <input
                            type="text"
                            placeholder="UNDIKSHA..."
                            className="mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="undhiksha"
                            onChange={(e: any) => {
                              let newData2 = [...data2]
                              switch (year) {
                                case 1:
                                  newData2[i].year_1.undiksha = e.target.value
                                  break;
                                case 2:
                                  newData2[i].year_2.undiksha = e.target.value
                                  break;
                                case 3:
                                  newData2[i].year_3.undiksha = e.target.value
                                  break;
                                case 4:
                                  newData2[i].year_4.undiksha = e.target.value
                                  break;
                                case 5:
                                  newData2[i].year_5.undiksha = e.target.value
                                  break;
                                case 6:
                                  newData2[i].year_6.undiksha = e.target.value
                                  break;

                                default:
                                  false
                                  break;
                              }
                              setData2(newData2)
                            }}
                            value={(year == 1 ? data2[i].year_1.undiksha : year == 2 ? data2[i].year_2.undiksha : year == 3 ? data2[i].year_3.undiksha : year == 4 ? data2[i].year_4.undiksha : year == 5 ? data2[i].year_5.undiksha : year == 6 ? data2[i].year_6.undiksha : "")||""}
                          />
<button className={`text-white bg-koreaBlue text-lg px-2 py-1 rounded-lg border-2 mx-3`} type="submit">save</button>
                        </form>
                      </div>
                    </div>
                  )
                })
              }


            </div>

          </div>


        </div>
      </div >

    </div >
  );
}





