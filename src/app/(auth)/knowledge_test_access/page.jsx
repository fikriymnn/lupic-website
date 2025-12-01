"use client"
import React, { useEffect, useState } from 'react';
import { Eye, Calendar, User, Package, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import axios from 'axios';

const OrderAccessList = () => {
    // Sample data
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const getData = async () => {
        try {
            const resUser = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true })
            if (resUser.data) {
                const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/access/all/id/" + resUser.data?._id)
                if (res.data) {
                    setOrders(res.data)
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])


    const getStatusBadge = (status) => {
        const statusConfig = {
            'ACCESS': {
                bg: 'bg-green-100',
                text: 'text-green-800',
                icon: <CheckCircle className="w-4 h-4" />,
                label: 'Aktif'
            },
            'NO ACCESS': {
                bg: 'bg-red-100',
                text: 'text-red-800',
                icon: <XCircle className="w-4 h-4" />,
                label: 'Tidak Aktif'
            },
            'EXPIRED': {
                bg: 'bg-orange-100',
                text: 'text-orange-800',
                icon: <AlertCircle className="w-4 h-4" />,
                label: 'Expired'
            }
        };

        const config = statusConfig[status] || statusConfig['NO ACCESS'];

        return (
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    const formatDate = (date) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleDetail = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedOrder(null);
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-6 pt-24">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Knowledge Test Access</h1>
                        <p className="text-gray-600">Riwayat access knowledge test yang telah Anda beli</p>
                    </div>

                    {/* Order List */}
                    <div className="rounded-lg shadow-sm overflow-hidden bg-white">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white">
                                <thead className="bg-white border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Periode
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Instansi
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                {(order.createdAt) ? formatDate(order.createdAt) : '-'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar className="w-4 h-4 text-gray-400" />
                                                    <div>
                                                        <div>{formatDate(order.start_date)}</div>
                                                        <div className="text-gray-400">s/d {formatDate(order.end_date)}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{order.nama_instansi}</div>
                                                <div className="text-xs text-gray-500">{order.jenjang_sekolah} - {order.provinsi}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {getStatusBadge(order.status)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDetail(order)}
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal Detail */}
                {showModal && selectedOrder && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            {/* Modal Header */}
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
                                <h2 className="text-xl font-bold text-white">Detail Order Access</h2>
                                <button
                                    onClick={closeModal}
                                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Body */}
                            <div className="p-6 space-y-6">
                                {/* Status Badge */}
                                <div className="flex justify-center">
                                    {getStatusBadge(selectedOrder.status)}
                                </div>

                                {/* Informasi Paket */}
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-blue-600" />
                                        Informasi 
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-600">User ID</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.userId}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Tanggal Mulai</span>
                                            <p className="font-medium text-gray-900">{formatDate(selectedOrder.start_date)}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Tanggal Berakhir</span>
                                            <p className="font-medium text-gray-900">{formatDate(selectedOrder.end_date)}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Personal */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <User className="w-5 h-5 text-gray-600" />
                                        Informasi Personal
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-600">Nama Lengkap</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.nama}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Email</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.email}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">No. WhatsApp</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.no_whatsapp}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Provinsi</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.provinsi}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Informasi Instansi */}
                                <div className="bg-green-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">Informasi Instansi & Mata Pelajaran</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-600">Jenjang Sekolah</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.jenjang_sekolah}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Nama Instansi</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.nama_instansi}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Mata Pelajaran</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.mata_pelajaran}</p>
                                        </div>
                                        <div>
                                            <span className="text-sm text-gray-600">Status PPG</span>
                                            <p className="font-medium text-gray-900">{selectedOrder.status_ppg}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Sumber Informasi */}
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">Sumber Informasi</h3>
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-sm text-gray-600">Sumber</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {selectedOrder.sumber_informasi.map((sumber, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-purple-200 text-purple-800 rounded-full text-sm">
                                                        {sumber}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        {selectedOrder.sumber_informasi_lainnya && (
                                            <div>
                                                <span className="text-sm text-gray-600">Lainnya</span>
                                                <p className="font-medium text-gray-900">{selectedOrder.sumber_informasi_lainnya}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Informasi Tambahan */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-gray-600" />
                                        Informasi Tambahan
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <span className="text-sm text-gray-600">Tanggal Pengisian</span>
                                            <p className="font-medium text-gray-900">{formatDate(selectedOrder.tanggal_pengisi)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Bukti Pembayaran</p>
                                            <a href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${selectedOrder.bukti_pembayaran}`}  terget="_blank" className="font-medium text-blue-600 hover:underline cursor-pointer">
                                                {selectedOrder.bukti_pembayaran}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <CustomFooter />
        </>
    );
};

export default OrderAccessList;