"use client"
import { useEffect, useState } from 'react';
import { Eye, Download, CheckCircle, XCircle } from 'lucide-react';
import Sidebar from "@/components/SidebarAdmin";
import axios from 'axios';
import { useParams } from 'next/navigation';

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

export default function AdminDashboardStudycase() {
  const {id} = useParams()
  const [currentPage, setCurrentPage] = useState('list'); // 'list' atau 'detail'
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setCurrentPage('detail');
  };

  const handleToggleStatus = async (userId,status) => {
    try {
      const res = await axios.put(process.env.NEXT_PUBLIC_API_URL+"/api/study_case_access/"+userId,{status:(status=="ACCESS"?"NO ACCESS":"ACCESS")})
      setUsers(users.map(user => {
        if (user._id === userId) {
          return {
            ...user,
            status: user.status === "ACCESS" ? "NO ACCESS" : "ACCESS"
          };
        }
        return user;
      }));

      // Update selected user jika sedang di halaman detail
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser({
          ...selectedUser,
          status: selectedUser.status === "ACCESS" ? "NO ACCESS" : "ACCESS"
        });
      }
    } catch (err) {
      console.log(err)
    }

  };

  const handleBackToList = () => {
    setCurrentPage('list');
    setSelectedUser(null);
  };

  async function getData() {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/study_case_access/" + id)
      if (res.data) {
        setUsers(res.data)
      }
    } catch (err) {
      console.log(err.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

function formatNumberID(num) {
  return num?.toLocaleString("id-ID");
}

  // LIST PAGE
  if (currentPage === 'list') {
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

                {/* Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Nama
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Tanggal
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            No. WhatsApp
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Instansi
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Bukti TF
                          </th>
                          <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user,i) => (
                          <tr key={i} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="font-medium text-gray-900">{user.nama}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 text-xs text-gray-700">
                              {formatDate(user.createdAt)}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.no_whatsapp}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              {user.nama_instansi}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${user.status === "ACCESS"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <a
                                href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${user.bukti_pembayaran}`}
                                target="_blank"
                                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </a>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleViewDetail(user)}
                                  className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  Detail
                                </button>
                                <button
                                  onClick={() => handleToggleStatus(user._id,user.status)}
                                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${user.status === "ACCESS"
                                    ? "bg-red-600 hover:bg-red-700 text-white"
                                    : "bg-green-600 hover:bg-green-700 text-white"
                                    }`}
                                >
                                  {user.status === "ACCESS" ? "Revoke" : "Grant"}
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
  }

  // DETAIL PAGE
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
              {/* Header */}
              <div className="mb-6">
                <button
                  onClick={handleBackToList}
                  className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-flex items-center gap-2"
                >
                  ← Kembali ke List
                </button>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h1 className="text-3xl font-bold text-gray-900">Detail Data Pendaftar</h1>
                  <p className="text-gray-600 mt-2">Informasi lengkap pendaftar</p>
                </div>
              </div>

              {/* Detail Content */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nama */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Nama</label>
                    <p className="text-lg font-medium text-gray-900 mt-1">{selectedUser.nama}</p>
                  </div>

                  {/* Email */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Email</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.email}</p>
                  </div>

                  {/* No. WhatsApp */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">No. WhatsApp</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.no_whatsapp}</p>
                  </div>

                  {/* Provinsi */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Provinsi</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.provinsi}</p>
                  </div>

                  {/* Jenjang */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Jenjang</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.jenjang_sekolah}</p>
                  </div>

                  {/* Instansi */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Instansi</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.nama_instansi}</p>
                  </div>

                  {/* Mata Pelajaran */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Mata Pelajaran</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.mata_pelajaran}</p>
                  </div>

                  {/* Status PPG */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status PPG</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.status_ppg}</p>
                  </div>

                  {/* Sumber Informasi */}
                  <div className="border-b border-gray-200 pb-4 md:col-span-2">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Sumber Informasi</label>
                    <p className="text-lg text-gray-900 mt-1">{selectedUser.sumber_informasi}</p>
                  </div>

                  {/* Status */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</label>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${selectedUser.status === "ACCESS"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}>
                        {selectedUser.status}
                      </span>
                    </div>
                  </div>
                   <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Harga</label>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold`}>
                       {formatNumberID(selectedUser.harga)}
                      </span>
                    </div>
                  </div>
                   <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Jenis Pembayaran</label>
                    <div className="mt-2">
                      <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold`}>
                        {selectedUser.jenis_pembayaran}
                      </span>
                    </div>
                  </div>

                  {/* Bukti Pembayaran */}
                  <div className="border-b border-gray-200 pb-4">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Bukti Pembayaran</label>
                    <div className="mt-2">
                      <a
                        href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${selectedUser.bukti_pembayaran}`}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download Bukti
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}