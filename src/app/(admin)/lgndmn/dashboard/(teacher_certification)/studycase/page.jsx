"use client";
import Sidebar from "@/components/Sidebar";
import { useEffect, useState } from "react";
import { ChevronLeft, Plus, Edit, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Studycase() {
  const router = useRouter()
  const [useCases, setUseCases] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kasus ini?')) {
      try{
        const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/study_case/"+id)
        if(res){
          window.location.href = "/lgndmn/dashboard/studycase"
        }
      }catch(err){
        console.log(err.message)
      }
    }
  };

  const getStudycase = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/study_case?page="+currentPage+"&limit=12")
      if (res.data) {
        setUseCases(res.data.data)
        setTotalPage(res.data.totalPage)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getStudycase()
  }, [currentPage])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="w-64 flex-shrink-0"></div>
      <div className='flex-1 p-6 lg:p-8'>
              {/* Header Section */}
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                  Teacher Study Case
                </h1>
              </div>
              <div className="items-center mb-8">
                <button
                  onClick={() => router.push("/lgndmn/dashboard/studycase/create")}
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
                          <td className="px-6 py-4 text-sm text-gray-800 w-80 line-clamp-2">{useCase.judulKasus}</td>
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
                                onClick={() => router.push("/lgndmn/dashboard/studycase/"+useCase._id)}
                                className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => router.push("/lgndmn/dashboard/studycase/"+useCase._id+"/edit")}
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
                  {totalPage > 1 && (
                    <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                      <ResponsivePagination
                        current={currentPage}
                        total={totalPage}
                        onPageChange={setCurrentPage}
                      />
                    </div>)}
                </div>
              </div>
            </div>
          </div>
  );
};