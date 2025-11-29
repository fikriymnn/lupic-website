"use client"
import React, { useEffect, useState } from 'react';
import {
    Plus, Edit, Trash2, Eye, X, Save, ChevronLeft,
    FileText, Users, Package, Check, Ban, Calendar, History,
    Download,
    DownloadIcon, DollarSign, Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import SidebarAdmin from "@/components/SidebarAdmin";
import axios from 'axios';
import { BiMoney } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
const API_URL = process.env.NEXT_PUBLIC_API_URL;


export default function AdminKnowledgeTest() {
    const router = useRouter();
    const [page, setPage] = useState('pakets'); // pakets, access, paket-detail, access-detail
    const [pakets, setPakets] = useState([]);
    const [apiPaket, setApiPaket] = useState(false)
    const [questions, setQuestions] = useState([]);
    const [accessList, setAccessList] = useState([]);
    const [nilaiList] = useState([]);
    const [selectedPaket, setSelectedPaket] = useState(null);
    const [selectedAccess, setSelectedAccess] = useState(null);
    const [isEditingPaket, setIsEditingPaket] = useState(false);
    const [showAddPaketModal, setShowAddPaketModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [paketForm, setPaketForm] = useState({ paket: '', deskripsi: '', status: 'PREMIUM' });
    const [questionForm, setQuestionForm] = useState({
        kategori: 'PCK',
        soal: [{ type: 'TEXT', value: '' }],
        pilihan: ['', '', '', '', ''],
        jawaban: '',
        penjelasan: ''
    });

    function formatDateTime(dateString) {
        const date = new Date(dateString);

        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const getAccess = async () => {
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/access")
            if (res.data) {
                console.log(res.data)
                setAccessList(res.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getAccess()
    }, [])

    const updateAccess = async (access) => {
        try {
            const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/access/" + access._id, access)
            if (res.data) {
                alert("Sukses mengupdate access!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }


    const getPaket = async () => {
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/paket")
            if (res.data) {
                setPakets(res.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const createPaket = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/paket", paketForm)
            if (res.data) {
                alert("Sukses menambahkan paket!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const updatePaket = async (id) => {
        try {
            const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/paket/" + id, selectedPaket)
            if (res.data) {
                alert("Sukses mengupdate paket!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const deletePaket = async (id) => {
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/paket/" + id, selectedPaket)
            if (res.data) {
                alert("Sukses menghapus paket!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getPaket()
    }, [])

    const getSoal = async () => {
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/soal/paketid/" + selectedPaket._id)
            if (res.data) {
                console.log(res.data)
                setQuestions(res.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const createSoal = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/soal", { ...questionForm, paketId: selectedPaket._id })
            if (res.data) {
                alert("Soal berhasil ditambahkan!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const editSoal = async () => {
        try {
            const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/soal/" + questionForm._id, { ...questionForm })
            if (res.data) {
                alert("Soal berhasil di update!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const deleteSoal = async (id) => {
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/soal/" + id)
            if (res.data) {
                alert("Soal berhasil dihapus!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getSoal()
    }, [selectedPaket])

    // const formatTime = (seconds) => {
    //     const hours = Math.floor(seconds / 3600);
    //     const minutes = Math.floor((seconds % 3600) / 60);
    //     const secs = seconds % 60;
    //     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    // };

    const handleAddPaket = () => {
        const newPaket = {
            _id: Date.now().toString(),
            ...paketForm
        };
        createPaket()
        setPakets([...pakets, newPaket]);
        setShowAddPaketModal(false);
        setPaketForm({ paket: '', deskripsi: '', status: 'PREMIUM' });
    };

    const handleDeletePaket = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
            deletePaket(id)
            setPakets(pakets.filter(p => p._id !== id));
        }
    };

    const handleSavePaketEdit = () => {
        updatePaket(selectedPaket._id)
        setPakets(pakets.map(p => p._id === selectedPaket._id ? selectedPaket : p));
        setIsEditingPaket(false);

    };

    const handleAddQuestion = async () => {
        const newQuestion = {
            _id: Date.now().toString(),
            paketId: selectedPaket._id,
            ...questionForm
        };
        await createSoal()
        setQuestions([...questions, newQuestion]);
        setShowQuestionModal(false);
        setEditingQuestion(null);
        setQuestionForm({
            kategori: 'PCK',
            soal: [{ type: 'TEXT', value: '' }],
            pilihan: ['', '', '', '', ''],
            jawaban: '',
            penjelasan: ''
        });
    };

    const handleEditQuestion = () => {
        setQuestions(questions.map(q => q._id === editingQuestion._id ? { ...editingQuestion, ...questionForm } : q));
        editSoal()
        setShowQuestionModal(false);
        setEditingQuestion(null);
        setQuestionForm({
            kategori: 'PCK',
            soal: [{ type: 'TEXT', value: '' }],
            pilihan: ['', '', '', '', ''],
            jawaban: '',
            penjelasan: ''
        });
    };

    const handleDeleteQuestion = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            deleteSoal(id)
            setQuestions(questions.filter(q => q._id !== id));
        }
    };

    const handleToggleAccess = (access) => {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(endDate.getDate() + 30);

        const updatedAccess = {
            ...access,
            status: access.status === 'ACCESS' ? 'NO ACCESS' : 'ACCESS',
            start_date: access.status === 'NO ACCESS' ? now.toISOString() : access.start_date,
            end_date: access.status === 'NO ACCESS' ? endDate.toISOString() : access.end_date
        };

        setAccessList(accessList.map(a => a._id === access._id ? updatedAccess : a));
        if (window.confirm('Apakah Anda yakin ingin membari akses permintaan ini?')) {
            updateAccess(updatedAccess)
        }
    };

    const addSoalItem = () => {
        setQuestionForm({
            ...questionForm,
            soal: [...questionForm.soal, { type: 'TEXT', value: '' }]
        });
    };

    const updateSoalItem = async (index, field, type, e) => {
        e.preventDefault()
        if (type == 'IMAGE') {
            const file = e.target.files[0];
            const formData = new FormData();
            try {
                formData.append('file', file);
                const getData = await axios.post(process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (getData.data) {
                    const newSoal = [...questionForm.soal];
                    newSoal[index][field] = getData.data;
                    setQuestionForm({ ...questionForm, soal: newSoal });
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            const newSoal = [...questionForm.soal];
            newSoal[index][field] = e.target.value;
            setQuestionForm({ ...questionForm, soal: newSoal });
        }
    };

    const removeSoalItem = (index) => {
        const newSoal = questionForm.soal.filter((_, i) => i !== index);
        setQuestionForm({ ...questionForm, soal: newSoal });
    };

    function formatNumberID(num) {
        return num?.toLocaleString("id-ID");
    }



    const [harga, setHarga] = useState('');
    const [hargaId, setHargaId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });



    const fetchHarga = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/api/harga`);

            if (!response.ok) {
                throw new Error('Failed to fetch harga');
            }

            const data = await response.json();

            if (data && data.harga !== undefined) {
                setHarga(data.harga.toString());
                setHargaId(data._id);
            }
        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Gagal memuat data harga: ' + error.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateHarga = async () => {
        if (!harga || harga.trim() === '') {
            setMessage({ type: 'error', text: 'Harga tidak boleh kosong' });
            return;
        }

        if (!hargaId) {
            setMessage({ type: 'error', text: 'ID harga tidak ditemukan' });
            return;
        }

        try {
            setSaving(true);
            setMessage({ type: '', text: '' });

            const response = await fetch(`${API_URL}/api/harga/${hargaId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ harga: parseFloat(harga) }),
            });

            if (!response.ok) {
                throw new Error('Failed to update harga');
            }

            const data = await response.json();

            setMessage({
                type: 'success',
                text: 'Harga berhasil diperbarui!'
            });

            // Refresh data after update
            setTimeout(() => {
                fetchHarga();
            }, 1000);

        } catch (error) {
            setMessage({
                type: 'error',
                text: 'Gagal memperbarui harga: ' + error.message
            });
        } finally {
            setSaving(false);
        }
    };

    const handleHargaChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and decimal point
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setHarga(value);
        }
    };

    // Fetch harga data on component mount
    useEffect(() => {
        fetchHarga();
    }, []);

    // Pakets Page
    if (page === 'harga') {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                                Harga Access Knowledge Test
                            </h1>
                            <p className="text-gray-600 mb-6">Kelola paket dan soal knowledge test</p>
                        </div>

                        {/* Main Content */}
                        <div className="bg-white rounded-b-2xl shadow-lg p-8">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                                    <p className="text-gray-600">Memuat data...</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {/* Harga Input */}
                                    <div>
                                        <label
                                            htmlFor="harga"
                                            className="block text-sm font-semibold text-gray-700 mb-2"
                                        >
                                            Harga Access Test
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-semibold">
                                                Rp
                                            </span>
                                            <input
                                                type="text"
                                                id="harga"
                                                value={harga}
                                                onChange={handleHargaChange}
                                                className="w-full pl-14 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                                placeholder="0"
                                                disabled={saving}
                                            />
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Masukkan harga dalam format angka (contoh: 50000)
                                        </p>
                                    </div>

                                    {/* Message Alert */}
                                    {message.text && (
                                        <div
                                            className={`flex items-center gap-3 p-4 rounded-xl ${message.type === 'success'
                                                ? 'bg-green-50 text-green-800 border border-green-200'
                                                : 'bg-red-50 text-red-800 border border-red-200'
                                                }`}
                                        >
                                            {message.type === 'success' ? (
                                                <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                            )}
                                            <span className="text-sm font-medium">{message.text}</span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleUpdateHarga}
                                        disabled={saving || !harga}
                                        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Menyimpan...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Update Harga
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Info Box */}
                            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-4">
                                <h3 className="font-semibold text-blue-900 mb-2">Informasi:</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Harga akan diterapkan untuk semua access test</li>
                                    <li>• Gunakan format angka tanpa titik atau koma sebagai pemisah</li>
                                    <li>• Perubahan akan tersimpan secara otomatis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Pakets Page
    if (page === 'pakets') {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                                Knowledge Test Management
                            </h1>
                            <p className="text-gray-600 mb-6">Kelola paket dan soal knowledge test</p>
                        </div>
                        <div className="flex justify-between items-center mb-8">

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setPage('harga')}
                                    className="flex items-center gap-2 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                                >
                                    <BiMoney className="w-5 h-5" />
                                    Harga Access
                                </button>
                                <button
                                    onClick={() => setPage('access')}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <Users className="w-5 h-5" />
                                    Access Test
                                </button>
                                <button
                                    onClick={() => setShowAddPaketModal(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Paket
                                </button>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pakets.map(paket => (
                                <div key={paket._id} className="bg-white rounded-lg shadow-lg p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-gray-800">{paket.paket}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${paket.status === 'PREMIUM' ? 'bg-yellow-400 text-yellow-900' :
                                            paket.status === 'GRATIS' ? 'bg-green-400 text-green-900' :
                                                'bg-gray-400 text-gray-900'
                                            }`}>
                                            {paket.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 mb-4 text-sm">{paket.deskripsi}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedPaket(paket);
                                                setPage('paket-detail');
                                            }}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                        >
                                            <Eye className="w-4 h-4" />
                                            Detail
                                        </button>
                                        <button
                                            onClick={() => handleDeletePaket(paket._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Paket Modal */}
                    {showAddPaketModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Tambah Paket Baru</h2>
                                    <button onClick={() => setShowAddPaketModal(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Paket</label>
                                        <input
                                            type="text"
                                            value={paketForm.paket}
                                            onChange={(e) => setPaketForm({ ...paketForm, paket: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Paket 1"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                                        <textarea
                                            value={paketForm.deskripsi}
                                            onChange={(e) => setPaketForm({ ...paketForm, deskripsi: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                            placeholder="Deskripsi paket..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                        <select
                                            value={paketForm.status}
                                            onChange={(e) => setPaketForm({ ...paketForm, status: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="GRATIS">GRATIS</option>
                                            <option value="HIDE">HIDE</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddPaket}
                                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                                >
                                    Simpan Paket
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Access Test Page
    if (page === 'access') {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => {
                                setSelectedPaket({})
                                setSelectedAccess({})
                                setQuestions({})
                                setPage('pakets')
                            }} className="p-2 hover:bg-gray-200 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Access Test Management</h1>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Tanggal</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Bukti Pembayaran</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Periode</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {accessList.map(access => (
                                            <tr key={access._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-xs text-gray-800">{formatDateTime(access.createdAt)}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{access.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{access.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800"><a className='text-koreaBlueMuda flex items-center' target='_blank' href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${access.bukti_pembayaran}`}><Download size={14} /><p className='ml-1'>download</p></a></td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${access.status === 'ACCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                        }`}>
                                                        {access.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {access.start_date ? (
                                                        <div>
                                                            <div>{new Date(access.start_date).toLocaleDateString('id-ID')}</div>
                                                            <div className="text-xs">s/d {new Date(access.end_date).toLocaleDateString('id-ID')}</div>
                                                        </div>
                                                    ) : '-'}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => handleToggleAccess(access)}
                                                            className={`px-3 py-1 rounded text-sm font-semibold ${access.status === 'ACCESS'
                                                                ? 'bg-red-600 text-white hover:bg-red-700'
                                                                : 'bg-green-600 text-white hover:bg-green-700'
                                                                }`}
                                                        >
                                                            {access.status === 'ACCESS' ? 'Revoke' : 'Grant'}
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAccess(access);
                                                                setPage('access-detail');
                                                            }}
                                                            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm font-semibold hover:bg-indigo-700"
                                                        >
                                                            Detail
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
        );
    }

    // Paket Detail Page
    if (page === 'paket-detail' && selectedPaket) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => {
                                setSelectedPaket({})
                                setQuestions([])
                                setPage('pakets')
                            }} className="p-2 hover:bg-gray-200 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Detail Paket</h1>
                        </div>

                        {/* Paket Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Informasi Paket</h2>
                                <button
                                    onClick={() => setIsEditingPaket(!isEditingPaket)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    {isEditingPaket ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    {isEditingPaket ? 'Simpan' : 'Edit'}
                                </button>
                            </div>

                            {isEditingPaket ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Paket</label>
                                        <input
                                            type="text"
                                            value={selectedPaket.paket}
                                            onChange={(e) => setSelectedPaket({ ...selectedPaket, paket: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                                        <textarea
                                            value={selectedPaket.deskripsi}
                                            onChange={(e) => setSelectedPaket({ ...selectedPaket, deskripsi: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                        <select
                                            value={selectedPaket.status}
                                            onChange={(e) => setSelectedPaket({ ...selectedPaket, status: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="PREMIUM">PREMIUM</option>
                                            <option value="GRATIS">GRATIS</option>
                                            <option value="HIDE">HIDE</option>
                                        </select>
                                    </div>
                                    <button
                                        onClick={handleSavePaketEdit}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Nama Paket:</span>
                                        <p className="text-gray-800">{selectedPaket.paket}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Deskripsi:</span>
                                        <p className="text-gray-800">{selectedPaket.deskripsi}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Status:</span>
                                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${selectedPaket.status === 'PREMIUM' ? 'bg-yellow-400 text-yellow-900' :
                                            selectedPaket.status === 'GRATIS' ? 'bg-green-400 text-green-900' :
                                                'bg-gray-400 text-gray-900'
                                            }`}>
                                            {selectedPaket.status}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Questions List */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Soal ({questions.length})</h2>
                                <button
                                    onClick={() => {
                                        setEditingQuestion(null);
                                        setQuestionForm({
                                            kategori: 'PCK',
                                            soal: [{ type: 'TEXT', value: '' }],
                                            pilihan: ['', '', '', '', ''],
                                            jawaban: '',
                                            penjelasan: ''
                                        });
                                        setShowQuestionModal(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Soal
                                </button>
                            </div>

                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <div key={question._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="font-bold text-gray-800">Soal #{index + 1}</span>
                                                    <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-semibold">
                                                        {question.kategori}
                                                    </span>
                                                </div>
                                                <div className="text-sm text-gray-700 mb-2">
                                                    {question.soal.map((s, i) => (
                                                        s.type === 'TEXT' ? <p key={i}>{s.value}</p> : <img key={i} src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${s.value}`} className='h-20' />
                                                    ))}
                                                </div>
                                                <p className="text-xs text-gray-600">Jawaban: {question.jawaban}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingQuestion(question);
                                                        setQuestionForm(question);
                                                        setShowQuestionModal(true);
                                                    }}
                                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteQuestion(question._id)}
                                                    className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Question Modal */}
                    {showQuestionModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                            <div className="bg-white rounded-lg p-8 max-w-3xl w-full my-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}
                                    </h2>
                                    <button onClick={() => setShowQuestionModal(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                                        <select
                                            value={questionForm.kategori}
                                            onChange={(e) => setQuestionForm({ ...questionForm, kategori: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="PCK">PCK</option>
                                            <option value="SJT">SJT</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">Soal</label>
                                            <button
                                                onClick={addSoalItem}
                                                className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                            >
                                                + Item
                                            </button>
                                        </div>
                                        {questionForm.soal.map((item, index) => (
                                            <div key={index} className="mb-3 p-3 border rounded-lg">
                                                <div className="flex gap-2 mb-2">
                                                    <select
                                                        value={item.type}
                                                        onChange={(e) => updateSoalItem(index, 'type', item.type, e)}
                                                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                    >
                                                        <option value="TEXT">TEXT</option>
                                                        <option value="IMAGE">IMAGE</option>
                                                    </select>
                                                    {questionForm.soal.length > 1 && (
                                                        <button
                                                            onClick={() => removeSoalItem(index)}
                                                            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                                {item.type === 'TEXT' ? (
                                                    <textarea
                                                        value={item.value}
                                                        onChange={(e) => updateSoalItem(index, 'value', item.type, e)}
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        rows="2"
                                                        placeholder="Masukkan teks soal..."
                                                    />
                                                ) : (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => updateSoalItem(index, 'value', item.type, e)}
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        placeholder="URL gambar..."
                                                    />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pilihan Jawaban</label>
                                        {questionForm.pilihan.map((pilihan, index) => (
                                            <div key={index} className="mb-2">
                                                <label className="text-xs text-gray-600 mb-1 block">
                                                    Pilihan {String.fromCharCode(65 + index)}
                                                </label>
                                                <input
                                                    type="text"
                                                    value={pilihan}
                                                    onChange={(e) => {
                                                        const newPilihan = [...questionForm.pilihan];
                                                        newPilihan[index] = e.target.value;
                                                        setQuestionForm({ ...questionForm, pilihan: newPilihan });
                                                    }}
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                    placeholder={`Pilihan ${String.fromCharCode(65 + index)}`}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Jawaban Benar</label>
                                        <input
                                            type="text"
                                            value={questionForm.jawaban}
                                            onChange={(e) => setQuestionForm({ ...questionForm, jawaban: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Masukkan teks jawaban yang benar (sesuai pilihan)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Penjelasan</label>
                                        <textarea
                                            value={questionForm.penjelasan}
                                            onChange={(e) => setQuestionForm({ ...questionForm, penjelasan: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="4"
                                            placeholder="Penjelasan lengkap tentang jawaban yang benar..."
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={editingQuestion ? handleEditQuestion : handleAddQuestion}
                                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                                >
                                    {editingQuestion ? 'Update Soal' : 'Simpan Soal'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Access Detail Page
    if (page === 'access-detail' && selectedAccess) {
        const userNilai = nilaiList.filter(n => n.userId === selectedAccess.userId);

        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => {
                                setSelectedAccess({})
                                setPage('access')
                            }} className="p-2 hover:bg-gray-200 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Detail Peserta</h1>
                        </div>

                        {/* Access Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Peserta</h2>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Pribadi</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Nama:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.nama}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Email:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.email}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">WhatsApp:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.no_whatsapp}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Provinsi:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.provinsi}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Data Pendidikan</h3>
                                    <div className="space-y-2 text-sm">
                                        <div>
                                            <span className="text-gray-600">Jenjang:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.jenjang_sekolah}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Instansi:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.nama_instansi}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Mata Pelajaran:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.mata_pelajaran}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Status PPG:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{selectedAccess.status_ppg}</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-600">Status PPG:</span>
                                            <span className="ml-2 font-semibold text-gray-800">{formatNumberID(selectedAccess.harga)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">Informasi Access</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    <div>
                                        <span className="text-gray-600 text-sm">Status:</span>
                                        <div className="mt-1">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedAccess.status === 'ACCESS' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                }`}>
                                                {selectedAccess.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-sm">Periode:</span>
                                        <p className="font-semibold text-gray-800 text-sm">
                                            {selectedAccess.start_date ? (
                                                <>
                                                    {new Date(selectedAccess.start_date).toLocaleDateString('id-ID')}
                                                    <br />
                                                    s/d {new Date(selectedAccess.end_date).toLocaleDateString('id-ID')}
                                                </>
                                            ) : '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 text-sm">Bukti Pembayaran:</span>
                                        <div className="mt-1">
                                            {selectedAccess?.jenis_pembayaran}
                                        </div>
                                        <div className="mt-1">{
                                            selectedAccess?.bukti_pembayaran ? <a className={`px-3 py-1 rounded-full text-sm text-koreaBlueMuda font-semibold flex items-center`} target="_blank" href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${selectedAccess?.bukti_pembayaran}`}>
                                                <DownloadIcon size={14} /> <p className='ml-2'>download</p>
                                            </a> : ""
                                        }

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

    return null;
}