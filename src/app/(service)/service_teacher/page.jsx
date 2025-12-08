"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Services_workshop() {
  const router = useRouter()
  const [login, setLogin] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    async function checkLogin() {
      try {
        const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true });
        if (data.data) {
          setLogin(true)
          setUser(data.data)
        } else {
          setLogin(false)
        }
      } catch (err) {
        setLogin(false)
      }
    }
    checkLogin()

  }, [])
  return (
    <>
      <Navbar />
      <section className="max-w-7xl mx-auto md:px-8 px-4 md:pt-16 pt-16">
        <div className="mb-4">
          <h3 className="md:text-5xl text-3xl mt-10 font-bold">
            Pre-Service Teacher <br /> Evaluation Test
          </h3>
          <div className="h-1 w-36 bg-koreaRed mt-4"></div>
        </div>


        <div className="text-justify md:mt-10 text-lg">
          <p>
            Selamat datang di platform resmi Uji Kompetensi Calon Guru Kimia yang diselenggarakan oleh Program Studi Pendidikan Kimia UPI dan didukung oleh Leading University Project for International Cooperation (LUPIC), Sogang University, Korea Selatan. Ujian ini bertujuan untuk mengukur kompetensi dan kesiapan calon guru dalam mengajar mata pelajaran kimia di tingkat sekolah menengah. Ujian ini mencakup kompetensi konten kimia sekolah, pedagogik, serta profesional dalam pembelajaran.
          </p>
          <br />
          <p>
            Apabila Anda ingin melakukan Uji Kompetensi, silakan melakukan registrasi dan menentukan jadwal tes Anda. Kemudian, Anda dapat hadir di waktu dan tempat yang telah ditentukan untuk melakukan Uji kompetensi. Jika Anda berhasil menyelesaikan Uji Kompetensi dan berhasil memenuhi skor yang telah ditentukan, Anda berhak memperoleh sertifikat sebagai bukti kompetensi Anda sebagai Guru Kimia.
            Anda dapat mencoba Uji Kompetensi ini dengan mengerjakan soal uji coba melalui tombol “Mulai Tes”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-16">
          {/* Left - Trial */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Uji Coba Awal (Gratis)</h2>
              <p className="text-gray-600 mb-8">
                Mulai perjalanan Uji Kompetensi dengan sesi latihan awal! Fitur gratis ini menyediakan soal uji coba yang mencakup dasar-dasar konten kimia, pedagogik, dan profesional. <br/><br/>Sehingga Anda dapat memahami tipe soal serta alur pengerjaan sebelum mengikuti tes utama. Cocok sebagai pemanasan singkat untuk melihat gambaran kemampuan awal Anda. Akses langsung tanpa registrasi.
              </p>

              {/* <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                <li>10 PCK + 10 SJT</li>
                <li>Akses instan, tanpa login</li>
                <li>Waktu fleksibel (non-simulasi)</li>
                <li>Ringkasan hasil singkat setelah selesai</li>
              </ul> */}
            </div>

            <div>
              <button
                onClick={() => router.push("/service_teacher/gratis")}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Mulai Tes
              </button>
            </div>
          </div>

          {/* Right - Premium */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulasi Intensif (Premium)</h2>
              <p className="text-gray-600 mb-8">
                Latihan lengkap untuk mempersiapkan Uji Kompetensi Calon Guru Kimia! Paket ini berisi simulasi komprehensif mencakup kompetensi konten kimia sekolah, pedagogik, dan profesional.<br/><br/> Dirancang menyerupai kondisi ujian sebenarnya. Anda akan mengerjakan rangkaian soal dengan batas waktu tertentu, ideal untuk mengukur kesiapan sebelum mengikuti Uji Kompetensi resmi
              </p>

              {/* <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                <li>Paket lengkap: 35 PCK + 30 SJT</li>
                <li>Waktu uji: 120 menit (simulasi ketat)</li>
                <li>Analisis hasil mendalam dan review soal</li>

              </ul> */}
            </div>

            <div>

              {/* Access logic: show different CTA based on user state */}
              {login ? (
                <>
                  <button
                    onClick={() => router.push("/service_teacher/premium?userId=" + user._id)
                    }
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Mulai Simulasi
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-3 text-sm text-yellow-700 font-medium">Silakan masuk untuk melanjutkan</div>
                  <button
                    onClick={() => {
                      router.push("/login?prev=service_teacher")
                    }}
                    className="w-full bg-yellow-400 text-yellow-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                  >
                    Masuk / Daftar
                  </button>
                </>
              )}


            </div>
          </div>
        </div>


        <div className="m-auto w-full">
          <table className="w-full border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Jumlah Soal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">KONTEN KIMIA SEKOLAH</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Struktur Atom</td>
                <td className="border border-gray-300 px-4 py-2 text-center">7</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Klasifikasi Unsur dan Sifat Periodik Unsur</td>
                <td className="border border-gray-300 px-4 py-2 text-center">2</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Ikatan Kimia dan Struktur Molekul</td>
                <td className="border border-gray-300 px-4 py-2 text-center">11</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Konsep Dasar Larutan</td>
                <td className="border border-gray-300 px-4 py-2 text-center">37</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Termokimia</td>
                <td className="border border-gray-300 px-4 py-2 text-center">8</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Kinetika Reaksi</td>
                <td className="border border-gray-300 px-4 py-2 text-center">6</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Hidrokarbon dan Turunannya</td>
                <td className="border border-gray-300 px-4 py-2 text-center">5</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Elektrokimia</td>
                <td className="border border-gray-300 px-4 py-2 text-center">15</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="w-full m-auto mb-8">
          <table className="w-full border border-gray-300 bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Kategori</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Jumlah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">PAEDAGOGI</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Lingkungan pembelajaran yang aman dan nyaman bagi peserta didik</td>
                <td className="border border-gray-300 px-4 py-2 text-center">3</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Pembelajaran efektif yang berpusat pada peserta didik</td>
                <td className="border border-gray-300 px-4 py-2 text-center">5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Asesmen, umpan balik, dan pelaporan yang berpusat pada peserta didik</td>
                <td className="border border-gray-300 px-4 py-2 text-center">5</td>
              </tr>
              <tr className="bg-gray-100 font-semibold">
                <td colSpan="2" className="border border-gray-300 px-4 py-2 text-center">PROFESIONAL</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Pengetahuan konten pembelajaran dan cara mengajarkannya</td>
                <td className="border border-gray-300 px-4 py-2 text-center">3</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Karakteristik dan cara belajar peserta didik</td>
                <td className="border border-gray-300 px-4 py-2 text-center">5</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Kurikulum dan cara menggunakannya</td>
                <td className="border border-gray-300 px-4 py-2 text-center">4</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-center">
          <div onClick={(e) => { window.location.href = `${login ? "pendaftaran" : "login"}` }} className="cursor-pointer px-6 text-lg py-2 hover:bg-blue-800 bg-blue-400 text-white rounded-lg mb-14 mt-10">
            Klik untuk daftar test
          </div>
        </div>
      </section>
      <CustomFooter />
    </>
  );
}
