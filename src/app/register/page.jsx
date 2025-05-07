"use client"
import axios from "axios";
import React, { useState } from "react";
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [tglLahir, setTglLahir] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [instansi, setInstansi] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/public/register", {
        email: email, password: password, nama: nama, tgl_lahir: tglLahir, no_wa: whatsapp, instansi: instansi
      }, {
        withCredentials: true
      })
      if (Data.data == "success") {
        alert("Register success")
        window.location.href = "/"
      } else {
        alert("Register failed")
      }
    } catch (err) {
      alert("Register failed")
    }

  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen my-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-4">REGISTER</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Nama</label>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="nama user"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Tanggal Lahir</label>
              <input
                type="text"
                value={tglLahir}
                onChange={(e) => setTglLahir(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="tgl lahir user"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">No Whatsapp</label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="no whatsapp user"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Instansi</label>
              <input
                type="text"
                value={instansi}
                onChange={(e) => setInstansi(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="instansi user"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="user@example.com"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="********"
              />
            </div>
            <p className="text-red-400 text-xs mb-2 cursor-pointer" onClick={(e)=>setShowPassword(!showPassword)}>show password</p>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              submit
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            Sudah punya akun?{' '}
            <a
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
            >
              Klik login
            </a>
          </p>
        </div>
      </div>
      <CustomFooter />
    </>

  );
};

