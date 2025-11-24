"use client"
import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/SidebarAdmin";
import { Trash2, Edit2, Plus, Save, X, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FormSetting() {
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [isEditingWA, setIsEditingWA] = useState(false);
    const [tempWA, setTempWA] = useState('');

    const [paymentTypes, setPaymentTypes] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [newPaymentType, setNewPaymentType] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const [selectedPayment, setSelectedPayment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch data saat komponen dimuat
    useEffect(() => {
        fetchAdminSetting();
    }, []);

    const fetchAdminSetting = async () => {
        try {
            setLoading(true);
            const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-setting`);

            if (result.data.success) {
                setWhatsappNumber(result.data.data.no_whatsapp || '');
                setPaymentTypes(result.data.data.jenis_pembayaran || []);
            } else {
                setError('Gagal memuat data setting');
            }
        } catch (err) {
            setError('Terjadi kesalahan saat memuat data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Handler untuk WhatsApp
    const handleEditWA = () => {
        setTempWA(whatsappNumber);
        setIsEditingWA(true);
    };

    const handleSaveWA = async () => {
        try {
            const result = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-setting/whatsapp`, { no_whatsapp: tempWA });

            if (result.data.success) {
                setWhatsappNumber(tempWA);
                setIsEditingWA(false);
                alert('Nomor WhatsApp berhasil diupdate!');
            } else {
                alert(result.data.message || 'Gagal mengupdate nomor WhatsApp');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengupdate nomor WhatsApp');
            console.error(err);
        }
    };

    const handleCancelWA = () => {
        setTempWA('');
        setIsEditingWA(false);
    };

    // Handler untuk Jenis Pembayaran
    const handleEdit = (index, name) => {
        setEditingIndex(index);
        setEditValue(name);
    };

    const handleSaveEdit = async (index) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-setting/jenis-pembayaran/${index}`, { jenis_pembayaran: editValue });

            if (response.data.success) {
                setPaymentTypes(response.data.data.jenis_pembayaran);
                setEditingIndex(null);
                setEditValue('');
                alert('Jenis pembayaran berhasil diupdate!');
            } else {
                alert(response.data.message || 'Gagal mengupdate jenis pembayaran');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat mengupdate jenis pembayaran');
            console.error(err);
        }
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditValue('');
    };

    const handleDelete = async (index) => {
        if (!confirm('Apakah Anda yakin ingin menghapus jenis pembayaran ini?')) {
            return;
        }

        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-setting/jenis-pembayaran/${index}`);

            if (response.data.success) {
                setPaymentTypes(response.data.data.jenis_pembayaran);
                alert('Jenis pembayaran berhasil dihapus!');
            } else {
                alert(response.data.message || 'Gagal menghapus jenis pembayaran');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat menghapus jenis pembayaran');
            console.error(err);
        }
    };

    const handleAddPaymentType = async () => {
        if (!newPaymentType.trim()) {
            alert('Nama jenis pembayaran tidak boleh kosong');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-setting/jenis-pembayaran`, { jenis_pembayaran: newPaymentType.trim() });

            if (response.data.success) {
                setPaymentTypes(response.data.data.jenis_pembayaran);
                setNewPaymentType('');
                setShowAddForm(false);
                alert('Jenis pembayaran berhasil ditambahkan!');
            } else {
                alert(response.data.message || 'Gagal menambahkan jenis pembayaran');
            }
        } catch (err) {
            alert('Terjadi kesalahan saat menambahkan jenis pembayaran');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8 flex items-center justify-center'>
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                        <p className="text-gray-600">Memuat data...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    {/* Title */}
                    <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-6">
                        Master Admin
                    </h1>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600">{error}</p>
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        {/* Section WhatsApp */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nomor WhatsApp</h2>

                            {!isEditingWA ? (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500 mb-1">Nomor aktif:</p>
                                        <p className="text-lg font-medium text-gray-800">
                                            {whatsappNumber || 'Belum ada nomor'}
                                        </p>
                                    </div>
                                    <button
                                        onClick={handleEditWA}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={tempWA}
                                        onChange={(e) => setTempWA(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Masukkan nomor WhatsApp"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSaveWA}
                                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                        >
                                            <Save size={16} />
                                            Simpan
                                        </button>
                                        <button
                                            onClick={handleCancelWA}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                        >
                                            <X size={16} />
                                            Batal
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Demo Form dengan Dropdown */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">Demo Form Pembayaran</h2>
                            <p className="text-sm text-gray-500 mb-3">Contoh penggunaan dropdown jenis pembayaran:</p>

                            <select
                                value={selectedPayment}
                                onChange={(e) => setSelectedPayment(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Pilih Jenis Pembayaran</option>
                                {paymentTypes.map((payment, index) => (
                                    <option key={index} value={index}>
                                        {payment}
                                    </option>
                                ))}
                            </select>

                            {selectedPayment !== '' && (
                                <p className="mt-3 text-sm text-green-600">
                                    ✓ Terpilih: {paymentTypes[parseInt(selectedPayment)]}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Section Jenis Pembayaran */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-700">Jenis Pembayaran</h2>
                            <button
                                onClick={() => setShowAddForm(!showAddForm)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                <Plus size={16} />
                                Tambah Jenis Pembayaran
                            </button>
                        </div>

                        {/* Form Tambah */}
                        {showAddForm && (
                            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                <h3 className="font-medium text-gray-700 mb-3">Tambah Jenis Pembayaran Baru</h3>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={newPaymentType}
                                        onChange={(e) => setNewPaymentType(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleAddPaymentType()}
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        placeholder="Nama jenis pembayaran"
                                    />
                                    <button
                                        onClick={handleAddPaymentType}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                    >
                                        Simpan
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowAddForm(false);
                                            setNewPaymentType('');
                                        }}
                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Tabel Jenis Pembayaran */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama Jenis Pembayaran</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentTypes.map((payment, index) => (
                                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                                            <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                                            <td className="px-4 py-3">
                                                {editingIndex === index ? (
                                                    <input
                                                        type="text"
                                                        value={editValue}
                                                        onChange={(e) => setEditValue(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit(index)}
                                                        className="w-full px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <span className="text-sm text-gray-800">{payment}</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center justify-center gap-2">
                                                    {editingIndex === index ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleSaveEdit(index)}
                                                                className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                                                                title="Simpan"
                                                            >
                                                                <Save size={18} />
                                                            </button>
                                                            <button
                                                                onClick={handleCancelEdit}
                                                                className="p-2 text-gray-600 hover:bg-gray-50 rounded transition"
                                                                title="Batal"
                                                            >
                                                                <X size={18} />
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(index, payment)}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                                                title="Edit"
                                                            >
                                                                <Edit2 size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(index)}
                                                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                                                title="Hapus"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {paymentTypes.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                Belum ada jenis pembayaran. Klik tombol "Tambah Jenis Pembayaran" untuk menambahkan.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}