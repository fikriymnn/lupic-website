"use client";
import React, { useState, useEffect } from 'react';
import { Play, ChevronRight, Calendar, DollarSign, ArrowLeft, CheckCircle, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CustomFooter from '@/components/CustomFooter';

// Fungsi helper untuk extract YouTube ID
const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
};

// Fungsi untuk format tanggal
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
};

const VideoAccessList = () => {
    const [accessList, setAccessList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAccess, setSelectedAccess] = useState(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        fetchAccessList();
    }, []);

    const fetchAccessList = async () => {
        try {
            setLoading(true);

            // Fetch user data
            const resUser = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", {
                credentials: 'include'
            });

            const userData = await resUser.json();

            if (userData) {
                // Fetch access list
                const res = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + "/api/video_pembelajaran_access?userId=" + userData._id
                );

                const data = await res.json();
                setAccessList(data);
            }
        } catch (error) {
            console.error('Error fetching access list:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowDetail = (access) => {
        setSelectedAccess(access);
        setShowDetail(true);
    };

    const handleBack = () => {
        setShowDetail(false);
        setSelectedAccess(null);
    };

    const handleRedirectToVideo = (videoId) => {
        window.location.href = `/video_training_access/${videoId}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat data akses video...</p>
                </div>
            </div>
        );
    }

    // Tampilan Detail
    if (showDetail && selectedAccess) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <button
                            onClick={handleBack}
                            className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <ArrowLeft size={20} />
                            Kembali ke List
                        </button>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="bg-koreaBlueMuda p-6 text-white">
                                <h1 className="text-2xl font-bold mb-2">Detail Akses Video Training</h1>
                                <p className="opacity-90">{selectedAccess.videoId?.judul || 'Judul tidak tersedia'}</p>
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
                                        <span className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
                                            <XCircle size={20} />
                                            Menunggu Verifikasi
                                        </span>
                                    )}
                                </div>

                                {/* Informasi Video Training */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Informasi Video Training</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Jenjang</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.videoId?.jenjang || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Topik</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.videoId?.topikIPA || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status Video</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.videoId?.status || '-'}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Tujuan Pembelajaran</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.videoId?.tujuanPembelajaran || '-'}</p>
                                        </div>
                                    </div>
                                    {selectedAccess.videoId?.deskripsi && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-600">Deskripsi</p>
                                            <p className="font-semibold text-gray-800">{selectedAccess.videoId.deskripsi}</p>
                                        </div>
                                    )}
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
                                                <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
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
                                                    href={`${process.env.NEXT_PUBLIC_API_FILE_URL || ''}${selectedAccess.bukti_pembayaran}`}
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

    // Tampilan List (Default)
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 py-24 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            Video Training Saya
                        </h1>
                        <p className="text-gray-600">
                            Daftar video training yang sudah Anda beli
                        </p>
                    </div>

                    {/* Video Access List */}
                    {accessList.length === 0 ? (
                        <div className="bg-white rounded-lg shadow p-12 text-center">
                            <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Belum Ada Video Training
                            </h3>
                            <p className="text-gray-600">
                                Anda belum membeli video training apapun
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {accessList.map((access) => (
                                <div
                                    key={access._id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
                                >
                                    {access.videoId && (
                                        <>
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <img
                                                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                                                        access.videoId.linkVideo
                                                    )}/maxresdefault.jpg`}
                                                    alt={access.videoId.judul}
                                                    className="w-full h-full object-cover opacity-80"
                                                />
                                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                                        <Play className="w-8 h-8 text-purple-600 ml-1" />
                                                    </div>
                                                </div>

                                                {/* Status Badge */}
                                                <div className="absolute top-3 right-3">
                                                    {access.status === 'NO ACCESS' &&
                                                        <span
                                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${access.status === 'ACCESS'
                                                                ? 'bg-green-500 text-white'
                                                                : 'bg-yellow-400 text-gray-900'
                                                                }`}
                                                        >
                                                            Menunggu Verifikasi
                                                        </span>
                                                    }
                                                </div>
                                            </div>

                                            <div className="p-5 flex flex-col h-full flex-1">
                                                <div className="flex gap-2 mb-3">
                                                    <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-blue-100 text-blue-700">
                                                        {access.videoId.jenjang}
                                                    </span>
                                                    <span className="px-2 py-1 rounded-xl text-xs font-semibold bg-gray-100 text-gray-700">
                                                        {access.videoId.topikIPA}
                                                    </span>
                                                </div>

                                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                                                    {access.videoId.judul}
                                                </h3>
                                                <p className="text-gray-600 mb-4 line-clamp-2">
                                                    {access.videoId.deskripsi}
                                                </p>
                                                <div className="text-sm text-gray-600 mb-4 space-y-1">
                                                    <div className="">
                                                        <p className="text-base font-medium text-gray-900">
                                                            Rp{access.harga?.toLocaleString('id-ID') || '0'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-2 mt-auto">
                                                    <button
                                                        onClick={() => handleShowDetail(access)}
                                                        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-semibold"
                                                    >
                                                        Detail Access
                                                    </button>

                                                    {access.status === 'ACCESS' && (
                                                        <button
                                                            onClick={() => handleRedirectToVideo(access.videoId._id)}
                                                            className="flex-1 px-4 py-2 bg-koreaBlueMuda text-white rounded-lg transition-colors text-sm font-semibold flex items-center justify-center gap-1"
                                                        >
                                                            Tonton
                                                            <ChevronRight className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <CustomFooter />
        </>
    );
};

export default VideoAccessList;