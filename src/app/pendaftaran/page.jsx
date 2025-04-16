"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";

export default function pendaftaran() {
  const [nama, setNama] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instansi, setInstansi] = useState('');
  const [hari, setHari] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi kirim data (tampilkan ke console)
    console.log('Data Form:');
    console.log('Nama:', nama);
    console.log('No WhatsApp:', whatsapp);
    console.log('Hari:', hari);

    // Reset form (opsional)
    setNama('');
    setWhatsapp('');
    setHari('');
  };


  return (
    <>
      <Navbar />
      <div className="h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-md w-[50%] my-4 ">
          {/* Judul Halaman */}
          <h1 className="text-3xl font-bold text-center mb-10">
            Form pendaftaran pre-service teacher test
          </h1>

          {/* Form */}
          <form className="space-y-4 grid grid-cols-2 items-center justify-items-center" onSubmit={handleSubmit}>
            {/* Nama Lengkap */}
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
              <label className="block text-gray-700 font-medium">no Whatsapp</label>
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
              <label className="block text-gray-700 font-medium">instansi</label>
              <input
                type="text"
                value={instansi}
                onChange={(e) => setInstansi(e.target.value)}
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring focus:ring-blue-300"
                placeholder="instansi user"
              />
            </div>

            {/* Pilih Hari */}
            <div>
              <label className=" text-sm font-medium mb-1">Pilih Hari</label>
              <select
                value={hari}
                onChange={(e) => setHari(e.target.value)}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Pilih Hari --</option>
                <option value="senin">Senin</option>
                <option value="rabu">Rabu</option>
                <option value="jumat">Jumat</option>
              </select>
            </div>

            {/* Tombol Submit */}
            
          </form>
          <div className="flex w-full justify-center mt-8">
          <button
              type="submit"
              className=" bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition w-[50%] m-auto"
            >
              Kirim
            </button>
        </div>
          </div>
          
      </div>
      <CustomFooter />
    </>
  );
}