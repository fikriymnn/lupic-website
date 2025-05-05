"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";
import axios from "axios";

export default function pendaftaran() {
  const [nama, setNama] = useState('');
  const [tglLahir, setTglLahir] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [instansi, setInstansi] = useState('');
  const [jadwal, setJadwal] = useState('');
  const [listJadwal, setListJadwal] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(!jadwal){
        alert("Pilih jadwal terlebih dahulu!");
      }else{
        let arry = jadwal.split(" ")
        const data = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/peserta", {
          nama, tgl_lahir: tglLahir, no_wa: whatsapp, email, instansi, hari: arry[0],tanggal:arry[1],bulan:arry[2],tahun:arry[3]
        }, { withCredentials: true })
        if (data.data) {
          alert("Berhasil mendaftar");
          window.location.href = "/personal"
        }
      }
      
    } catch (err) {
      alert(err.message)
      alert("Gagal mendaftar")
    }
  };


  async function checkLogin() {
    try {
      const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true });
      console.log(data)
      if (data.data) {
        setNama(data.data.nama);
        setEmail(data.data.email);
        setTglLahir(data.data.tgl_lahir);
        setWhatsapp(data.data.no_wa);
        setInstansi(data.data.instansi);

      } else {
        window.location.href = "/login"
      }
    } catch (err) {
      alert("Gagal mendapatkan data user")
    }
  }

  function getNextDay(hari, fromDate = new Date()) {
    const hariKeIndex = {
      minggu: 0,
      senin: 1,
      selasa: 2,
      rabu: 3,
      kamis: 4,
      jumat: 5,
      sabtu: 6,
    };

    const targetDayName = hari.toLowerCase();
    const targetDay = hariKeIndex[targetDayName];

    if (targetDay === undefined) {
      throw new Error("Nama hari tidak valid. Gunakan: Senin, Selasa, Rabu, dll.");
    }

    const today = new Date(fromDate);
    today.setHours(0, 0, 0, 0);

    const currentDay = today.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    let daysToTarget = (7 + targetDay - currentDay) % 7;
    if (daysToTarget === 0) daysToTarget = 7; // Kalau hari ini sama dengan target, ambil minggu depan

    const nextDate = new Date(today);
    nextDate.setDate(today.getDate() + daysToTarget);

    // Format manual tanpa koma
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const parts = new Intl.DateTimeFormat('id-ID', options).formatToParts(nextDate);

    const dayName = parts.find(p => p.type === 'weekday')?.value;
    const dateNum = parts.find(p => p.type === 'day')?.value;
    const monthName = parts.find(p => p.type === 'month')?.value;
    const year = parts.find(p => p.type === 'year')?.value;

    return `${dayName} ${dateNum} ${monthName} ${year}`;
  }

  async function getListJadwal() {
    try {
      const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/jadwal?status=Aktif", { withCredentials: true });
      if (data.data) {
        console.log(data.data)
        let newData = []
        for (let i = 0; i < data.data.length; i++) {
          if (data.data[i].hari == "Senin" && data.data[i].tanggal == "-") {
            let nextSenin = getNextDay("Senin")
            let arrayTanggal = nextSenin.split(" ")
            newData.push(`${data.data[i].hari} ${arrayTanggal[1]} ${arrayTanggal[2]} ${arrayTanggal[3]}`)
          } else if (data.data[i].hari == "Rabu" && data.data[i].tanggal == "-") {
            let nextRabu = getNextDay("Rabu")
            let arrayTanggal = nextRabu.split(" ")
            newData.push(`${data.data[i].hari} ${arrayTanggal[1]} ${arrayTanggal[2]} ${arrayTanggal[3]}`)
          } else if (data.data[i].hari == "Jumat" && data.data[i].tanggal == "-") {
            let nextJumat = getNextDay("Jumat")
            let arrayTanggal = nextJumat.split(" ")
            newData.push(`${data.data[i].hari} ${arrayTanggal[1]} ${arrayTanggal[2]} ${arrayTanggal[3]}`)
          } else {
            newData.push(`${data.data[i].hari} ${data.data[i].tanggal} ${data.data[i].bulan} ${data.data[i].tahun}`)
          }
        }
        setListJadwal(newData)
      }
    }
    catch (err) {
      alert("Gagal mendapatkan jadwal")
    }
  }

  useEffect(() => {

    checkLogin();
    getListJadwal();
  }, []);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-10 rounded-2xl shadow-md md:w-[60%] sm:w-[80%] w-[95%] my-4 ">
          {/* Judul Halaman */}
          <h1 className="text-2xl font-bold text-center mb-4">
            FORM PENDAFTARAN PRE-SERVICE TEACHER TEST
          </h1>
          <div className="h-1 w-36 bg-koreaRed mt-4 mb-6 m-auto"></div>
          {/* Form */}
          <form className="space-y-4 grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 items-center justify-items-center" onSubmit={handleSubmit}>
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

            {/* Pilih Hari */}
            <div>
              <label className=" text-sm font-medium mb-1">Pilih Jadwal</label>
              <select
                value={jadwal}
                onChange={(e) => setJadwal(e.target.value)}
                className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">-- Pilih Jadwal --</option>
                {
                  listJadwal.map((v, i) => {
                    return <option key={i} value={v}>{v}</option>
                  })
                }
              </select>
            </div>

            {/* Tombol Submit */}

          </form>
          <div className="flex w-full justify-center mt-10">
            <button
            onClick={handleSubmit}
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