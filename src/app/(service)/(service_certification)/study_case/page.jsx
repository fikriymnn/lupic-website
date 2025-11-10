"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Send, Trash2, Edit, Plus, Search, Filter } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { useRouter } from 'next/navigation';
// Mock data
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

export default function CaseStudy() {
const router = useRouter()
  const [useCases, setUseCases] = useState(mockUseCases);
  const [filteredCases, setFilteredCases] = useState(mockUseCases);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    jenjang: '',
    topikIPA: '',
    kompetensiGuru: ''
  });
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = useCases;
    
    if (filters.jenjang) {
      filtered = filtered.filter(uc => uc.jenjang === filters.jenjang);
    }
    if (filters.topikIPA) {
      filtered = filtered.filter(uc => uc.topikIPA === filters.topikIPA);
    }
    if (filters.kompetensiGuru) {
      filtered = filtered.filter(uc => uc.kompetensiGuru === filters.kompetensiGuru);
    }
    
    setFilteredCases(filtered);
    setCurrentPage(1);
  }, [filters, useCases]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredCases.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Kasus Pembelajaran IPA</h1>
          <p className='text-gray-800'>Video Pembelajaran merupakan bagian dari website layanan Inspira PPG yang berfungsi sebagai media latihan dan observasi pembelajaran bagi calon guru. Fitur ini menyediakan kumpulan video berbasis praktik mengajar yang disusun sesuai Kurikulum Merdeka untuk jenjang SD dan SMP pada bidang IPA</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="text-indigo-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filter Kasus</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={filters.jenjang}
              onChange={(e) => setFilters({...filters, jenjang: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Semua Jenjang</option>
              <option value="SD">SD</option>
              <option value="SMP">SMP</option>
            </select>
            
            <select
              value={filters.topikIPA}
              onChange={(e) => setFilters({...filters, topikIPA: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Semua Topik</option>
              <option value="Fisika">Fisika</option>
              <option value="Biologi">Biologi</option>
              <option value="IPA Terpadu">IPA Terpadu</option>
            </select>
            
            <select
              value={filters.kompetensiGuru}
              onChange={(e) => setFilters({...filters, kompetensiGuru: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="">Semua Kompetensi</option>
              <option value="Pedagogik">Pedagogik</option>
              <option value="Profesional">Profesional</option>
            </select>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentItems.map((useCase) => (
            <div key={useCase._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    {useCase.jenjang}
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                    {useCase.topikIPA}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                    {useCase.kompetensiGuru}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {useCase.judulKasus}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {useCase.deskripsi}
                </p>
                
                <button
                  onClick={() => router.push(`/case_study/${useCase._id}`)}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Pelajari Kasus
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft />
            </button>
            
            <span className="text-gray-700 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white shadow disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
     </>
  );
};
