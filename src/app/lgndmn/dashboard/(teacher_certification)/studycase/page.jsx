"use client";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import { ChevronLeft, Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const mockUseCases = [
  {
    _id: '1',
    judulKasus: 'Penerapan Hukum Newton dalam Kehidupan Sehari-hari',
    deskripsi: 'Kasus tentang bagaimana guru menjelaskan konsep hukum Newton dengan pendekatan kontekstual',
    jenjang: 'SMP',
    topikIPA: 'Fisika',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: 'Seorang guru IPA SMP mengajarkan materi Hukum Newton dengan menggunakan berbagai contoh nyata dari kehidupan sehari-hari. Guru tersebut memulai pembelajaran dengan menanyakan pengalaman siswa saat naik sepeda, bermain bola, dan aktivitas lainnya. Kemudian guru menghubungkan pengalaman tersebut dengan konsep Hukum Newton I, II, dan III.',
    pertanyaanAnalisis: [
      'Bagaimana pendekatan kontekstual dapat meningkatkan pemahaman siswa terhadap Hukum Newton?',
      'Metode apa yang dapat digunakan untuk mengukur efektivitas pembelajaran ini?',
      'Apa tantangan yang mungkin dihadapi guru dalam implementasi pembelajaran kontekstual?'
    ],
    pembahasan: 'Pendekatan kontekstual sangat efektif karena menghubungkan materi dengan pengalaman nyata siswa. Guru dapat mengukur efektivitas melalui observasi partisipasi siswa, hasil evaluasi, dan kemampuan siswa menjelaskan konsep dengan kata-kata sendiri. Tantangan yang mungkin muncul adalah kebutuhan waktu lebih banyak dan persiapan yang matang.'
  },
  {
    _id: '2',
    judulKasus: 'Pembelajaran Fotosintesis dengan Model Inquiry',
    deskripsi: 'Implementasi model pembelajaran inquiry dalam mengajarkan proses fotosintesis',
    jenjang: 'SD',
    topikIPA: 'Biologi',
    kompetensiGuru: 'Profesional',
    narasiLengkap: 'Guru menggunakan model inquiry learning untuk mengajarkan fotosintesis. Siswa diminta mengamati tanaman yang diletakkan di tempat gelap dan terang selama beberapa hari, kemudian membandingkan hasilnya. Melalui pengamatan ini, siswa dibimbing untuk menemukan sendiri konsep fotosintesis.',
    pertanyaanAnalisis: [
      'Mengapa model inquiry cocok untuk materi fotosintesis?',
      'Bagaimana peran guru dalam pembelajaran berbasis inquiry?'
    ],
    pembahasan: 'Model inquiry cocok karena fotosintesis dapat diamati langsung melalui eksperimen sederhana. Guru berperan sebagai fasilitator yang membimbing siswa menemukan konsep sendiri melalui pertanyaan-pertanyaan pengarah.'
  },
  {
    _id: '3',
    judulKasus: 'Integrasi Materi IPA: Siklus Air dan Perubahan Wujud',
    deskripsi: 'Pembelajaran IPA terpadu mengenai siklus air dengan konsep perubahan wujud zat',
    jenjang: 'SD',
    topikIPA: 'IPA Terpadu',
    kompetensiGuru: 'Pedagogik',
    narasiLengkap: 'Guru SD mengintegrasikan pembelajaran tentang siklus air dengan materi perubahan wujud zat. Melalui demonstrasi sederhana dan video animasi, siswa memahami bagaimana air menguap, mengembun, dan turun kembali sebagai hujan. Pembelajaran ini menggabungkan aspek fisika dan biologi.',
    pertanyaanAnalisis: [
      'Apa keuntungan pembelajaran IPA terpadu untuk siswa SD?',
      'Media apa saja yang efektif untuk materi ini?'
    ],
    pembahasan: 'Pembelajaran IPA terpadu membantu siswa melihat keterkaitan antar konsep sehingga lebih bermakna. Media seperti video animasi, demonstrasi langsung, dan model 3D sangat efektif untuk memvisualisasikan proses yang abstrak.'
  }
];

export default function Studycase() {
  const router = useRouter()
  const [useCases, setUseCases] = useState(mockUseCases);

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kasus ini?')) {
      setUseCases(useCases.filter(uc => uc._id !== id));
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-64 bg-gray-100"></div>
      <div className="w-full">
        <div className="m-auto w-full">
          <div className="min-h-screen p-4 w-[90%] m-auto">

            <div className="max-w-7xl">
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  Teacher Study Case
                </h1>
              </div>
              <div className="items-center mb-8">
                <button
                  onClick={()=>router.push("/lgndmn/dashboard/studycase/create")}
                  className="px-4 py-2 bg-indigo-600 text-sm text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 font-medium"
                >
                  <Plus size={20} />
                  Tambah Kasus
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Judul Kasus</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Jenjang</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Topik</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Kompetensi</th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {useCases.map((useCase) => (
                        <tr key={useCase._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-800">{useCase.judulKasus}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] text-center font-semibold rounded-full">
                              {useCase.jenjang}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] text-center font-semibold rounded-full">
                              {useCase.topikIPA}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-[10px] text-center font-semibold rounded-full">
                              {useCase.kompetensiGuru}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <button
                                onClick={()=>router.push("/lgndmn/dashboard/studycase/1/edit")}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(useCase._id)}
                                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};