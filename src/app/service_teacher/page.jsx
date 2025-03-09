import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";

export default function Services_workshop() {
  return (
    <>
      <Navbar />
      <div className=" text-center m-auto mt-8 mb-4">
        <h3 className="md:text-4xl text-3xl mt-10 font-bold">
          Pre-Service Teacher Evaluation Test
        </h3>
        <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
      </div>
      <div className="m-auto w-[85%] text-justify md:mt-10 text-lg">
        <p>
          Selamat datang di platform resmi Uji Kompetensi Calon Guru Kimia yang diselenggarakan oleh Program Studi Pendidikan Kimia UPI dan didukung oleh Leading University Project for International Cooperation (LUPIC), Sogang University, Korea Selatan. Ujian ini bertujuan untuk mengukur kompetensi dan kesiapan calon guru dalam mengajar mata pelajaran kimia di tingkat sekolah menengah. Ujian ini mencakup kompetensi konten kimia sekolah, pedagogik, serta profesional dalam pembelajaran.
        </p>
        <br />
        <p>
          Apabila Anda ingin melakukan Uji Kompetensi, silakan melakukan registrasi dan menentukan jadwal tes Anda. Kemudian, Anda dapat hadir di waktu dan tempat yang telah ditentukan untuk melakukan Uji kompetensi. Jika Anda berhasil menyelesaikan Uji Kompetensi dan berhasil memenuhi skor yang telah ditentukan, Anda berhak memperoleh sertifikat sebagai bukti kompetensi Anda sebagai Guru Kimia.
          Anda dapat mencoba Uji Kompetensi ini dengan mengerjakan soal uji coba melalui tombol “Mulai Tes”
        </p>
      </div>
      <div className="w-[90%] md:w-[80%] m-auto mb-16">
        <div className="flex items-center justify-center mt-16">
          <button className="bg-red-700 text-white py-2 px-4 md:px-6 rounded-lg hover:bg-blue-700 hover:text-white">Click here to join the test</button>
        </div>
      </div>
      <div className="m-auto w-[80%]">
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
      <br/>
      <div className=" w-[80%] m-auto">
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

      <CustomFooter />
    </>
  );
}
