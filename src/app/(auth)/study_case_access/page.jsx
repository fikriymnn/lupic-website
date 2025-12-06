"use client";
import React, { useState, useEffect } from 'react';
import { Eye, FileText, Calendar, DollarSign, CheckCircle, XCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useRouter } from 'next/navigation';

export default function StudyCaseList() {
    const router = useRouter();
    const [studyCaseAccess, setStudyCaseAccess] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccess, setSelectedAccess] = useState(null);
    const [view, setView] = useState('list'); // 'list' or 'detail'

    useEffect(() => {
        fetchStudyCaseAccess();
    }, []);

    const fetchStudyCaseAccess = async () => {
        try {
            setLoading(true);
            const resUser = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", {
                credentials: 'include'
            });

            const userData = await resUser.json();

            if (userData) {
                const res = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + "/api/study_case_access?userId=" + userData._id
                );

                const data = await res.json();
                console.log(data)
                
                setStudyCaseAccess(data);

            }

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDetailAccess = (access) => {
        setSelectedAccess(access);
        setView('detail');
    };

    const handleBack = () => {
        setView('list');
        setSelectedAccess(null);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
            </div>
        );
    }

    if (view === 'detail' && selectedAccess) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen bg-gray-50 py-24 px-4">
                    <div className="max-w-6xl mx-auto md:px-8 px-4">
                        <button
                            onClick={handleBack}
                            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <ArrowLeft size={20} />
                            Kembali ke List
                        </button>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
                                <h1 className="text-2xl font-bold mb-2">Detail Akses Study Case</h1>
                                <p className="opacity-90">{selectedAccess.studyCaseId?.judulKasus || 'Judul tidak tersedia'}</p>
                            </div>

                            <div className="p-6">
                                {/* Status */}
                                <div className="mb-6 flex items-center gap-2">
                                    {selectedAccess.status === 'ACCESS' ? (
                                        <span className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                                            <CheckCircle size={20} />
                                            Akses Aktif
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
                                            <XCircle size={20} />
                                            {selectedAccess.status}
                                        </span>
                                    )}
                                </div>

                                {/* Informasi Study Case */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Study Case</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Jenjang</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.studyCaseId?.jenjang || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Topik</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.studyCaseId?.topikIPA || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Kompetensi Guru</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.studyCaseId?.kompetensiGuru || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.studyCaseId?.status || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Data Pembeli */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Data Pembeli</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Nama</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.nama || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Email</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.email || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">No. WhatsApp</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.no_whatsapp || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Provinsi</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.provinsi || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Jenjang Sekolah</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.jenjang_sekolah || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Nama Instansi</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.nama_instansi || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Mata Pelajaran</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.mata_pelajaran || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status PPG</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.status_ppg || '-'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sumber Informasi */}
                                {selectedAccess.sumber_informasi && selectedAccess.sumber_informasi.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Sumber Informasi</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedAccess.sumber_informasi.map((sumber, index) => (
                                                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                                    {sumber}
                                                </span>
                                            ))}
                                        </div>
                                        {selectedAccess.sumber_informasi_lainnya && (
                                            <p className="mt-2 text-sm text-gray-600">
                                                Lainnya: {selectedAccess.sumber_informasi_lainnya}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Informasi Pembayaran */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Pembayaran</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Jenis Pembayaran</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.jenis_pembayaran || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Harga</p>
                                            <p className="font-semibold text-gray-800 text-green-600">
                                                {selectedAccess.harga ? formatCurrency(selectedAccess.harga) : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Tanggal Pengisian</p>
                                            <p className="font-semibold text-gray-800">
                                                {selectedAccess.tanggal_pengisi ? formatDate(selectedAccess.tanggal_pengisi) : '-'}
                                            </p>
                                        </div>
                                        {selectedAccess.bukti_pembayaran && (
                                            <div>
                                                <p className="text-sm text-gray-600">Bukti Pembayaran</p>
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${selectedAccess.bukti_pembayaran}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:underline font-semibold"
                                                >
                                                    Lihat Bukti
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Timestamps */}
                                <div className="text-sm text-gray-500 pt-4 border-t">
                                    <p>Dibuat: {selectedAccess.createdAt ? formatDate(selectedAccess.createdAt) : '-'}</p>
                                    <p>Diperbarui: {selectedAccess.updatedAt ? formatDate(selectedAccess.updatedAt) : '-'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomFooter />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-50 py-24 px-4">
                <div className="max-w-6xl mx-auto md:px-8 px-4">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Study Case Saya</h1>
                        <p className="text-gray-600">Daftar study case yang telah Anda beli</p>
                    </div>

                    {studyCaseAccess.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-md p-12 text-center">
                            <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">Belum ada study case</h2>
                            <p className="text-gray-600">Anda belum membeli study case apapun</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {studyCaseAccess.map((access) => (
                                <div key={access._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="bg-gradient-to-r pt-4 px-4 text-white">

                                        <div className="flex gap-2 text-sm">
                                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full flex items-center">
                                                {access.studyCaseId?.jenjang}
                                            </span>

                                            <span className="px-2 py-1 bg-gray-100 text-green-800 text-xs font-semibold rounded-full flex items-center">
                                                {access.studyCaseId?.topikIPA}
                                            </span>
                                            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-semibold text-xs flex items-center">
                                                {access.studyCaseId?.kompetensiGuru}
                                            </span>
                                            {access?.status === 'NO ACCESS' && (
     
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400 text-gray-900`}
                                                    >
                                                        Menunggu Verifikasi
                                                    </span>
               
                                            )}
                                        </div>
                                        <h3 className="font-bold text-black text-lg mb-1 line-clamp-2 mt-2">
                                            {access.studyCaseId?.judulKasus || 'Judul tidak tersedia'}
                                        </h3>

                                    </div>

                                    <div className="p-4">
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                                            {access.studyCaseId?.deskripsi || 'Tidak ada deskripsi'}
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                    <div className="">
                                                        <p className="text-base font-medium text-gray-900">
                                                            Rp{access.harga?.toLocaleString('id-ID') || '0'}
                                                        </p>
                                                    </div>
                                                </div>
                                        </div>
                                        <div className="flex gap-2 mt-auto">
                                            <button
                                                onClick={() => handleDetailAccess(access)}
                                                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                                            >
                                                Detail Access
                                            </button>

                                            {access.status === 'ACCESS' && (
                                                <button
                                                    onClick={() => router.push(`/study_case_access/${access.studyCaseId?._id}`)}
                                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center gap-1"
                                                >
                                                    Lihat
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <CustomFooter />
        </>
    );
}