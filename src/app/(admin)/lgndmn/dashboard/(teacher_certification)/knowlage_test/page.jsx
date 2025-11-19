"use client"
import React, { useState } from 'react';
import {
    Plus, Edit, Trash2, Eye, X, Save, ChevronLeft,
    FileText, Users, Package, Check, Ban, Calendar, History
} from 'lucide-react';
import Sidebar from "@/components/Sidebar";

// Mock Data
const MOCK_PAKETS = [
    {
        _id: '1',
        paket: 'Paket 1',
        deskripsi: 'Simulasi Intensif Premium - 65 Soal',
        status: 'PREMIUM'
    },
    {
        _id: '2',
        paket: 'Paket 2',
        deskripsi: 'Simulasi Intensif Premium - 65 Soal',
        status: 'PREMIUM'
    },
    {
        _id: '3',
        paket: 'Trial Test',
        deskripsi: 'Uji Coba Gratis - 20 Soal',
        status: 'GRATIS'
    },
    {
        _id: '4',
        paket: 'Paket 4',
        deskripsi: 'Paket dalam pengembangan',
        status: 'HIDE'
    }
];

const MOCK_QUESTIONS = [
    {
        _id: 'q1',
        paketId: '1',
        kategori: 'PCK',
        soal: [
            { type: 'TEXT', value: 'Apa yang dimaksud dengan pendekatan saintifik?' }
        ],
        pilihan: ['A', 'B', 'C', 'D', 'E'],
        jawaban: 'B',
        penjelasan: 'Penjelasan lengkap tentang pendekatan saintifik...'
    },
    {
        _id: 'q2',
        paketId: '1',
        kategori: 'SJT',
        soal: [
            { type: 'TEXT', value: 'Jika siswa tertidur di kelas, apa yang Anda lakukan?' }
        ],
        pilihan: ['A', 'B', 'C', 'D', 'E'],
        jawaban: 'C',
        penjelasan: 'Pendekatan empatik adalah yang terbaik...'
    }
];

const MOCK_ACCESS = [
    {
        _id: 'a1',
        paket: 'Paket 1',
        paketId: '1',
        userId: 'u1',
        nama: 'John Doe',
        email: 'john@example.com',
        no_whatsapp: '08123456789',
        provinsi: 'DKI Jakarta',
        jenjang_sekolah: 'SMA',
        nama_instansi: 'SMAN 1 Jakarta',
        mata_pelajaran: 'Matematika',
        status_ppg: 'Belum PPG',
        sumber_informasi: 'Instagram',
        bukti_pembayaran: 'bukti1.jpg',
        status: 'NO ACCESS',
        start_date: null,
        end_date: null,
        createdAt: new Date('2024-11-15').toISOString()
    },
    {
        _id: 'a2',
        paket: 'Paket 1',
        paketId: '1',
        userId: 'u2',
        nama: 'Jane Smith',
        email: 'jane@example.com',
        no_whatsapp: '08234567890',
        provinsi: 'Jawa Barat',
        jenjang_sekolah: 'SMP',
        nama_instansi: 'SMPN 2 Bandung',
        mata_pelajaran: 'Bahasa Inggris',
        status_ppg: 'Sudah PPG',
        sumber_informasi: 'WhatsApp',
        bukti_pembayaran: 'bukti2.jpg',
        status: 'ACCESS',
        start_date: new Date('2024-11-10').toISOString(),
        end_date: new Date('2024-12-10').toISOString(),
        createdAt: new Date('2024-11-09').toISOString()
    }
];

const MOCK_NILAI = [
    {
        _id: 'n1',
        userId: 'u2',
        paketId: '1',
        paket: 'Paket 1',
        nilai: {
            benar: 50,
            salah: 12,
            tidak_terjawab: 3,
            nilai: 76.92
        },
        timeSpent: 5400,
        jumlah_soal: 65,
        nama: 'Jane Smith',
        email: 'jane@example.com',
        no_whatsapp: '08234567890',
        createdAt: new Date('2024-11-16').toISOString()
    },
    {
        _id: 'n2',
        userId: 'u2',
        paketId: '1',
        paket: 'Paket 1',
        nilai: {
            benar: 55,
            salah: 8,
            tidak_terjawab: 2,
            nilai: 84.62
        },
        timeSpent: 4900,
        jumlah_soal: 65,
        nama: 'Jane Smith',
        email: 'jane@example.com',
        no_whatsapp: '08234567890',
        createdAt: new Date('2024-11-18').toISOString()
    }
];

export default function AdminKnowledgeTest() {
    const [page, setPage] = useState('pakets'); // pakets, access, paket-detail, access-detail
    const [pakets, setPakets] = useState(MOCK_PAKETS);
    const [questions, setQuestions] = useState(MOCK_QUESTIONS);
    const [accessList, setAccessList] = useState(MOCK_ACCESS);
    const [nilaiList] = useState(MOCK_NILAI);
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

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAddPaket = () => {
        const newPaket = {
            _id: Date.now().toString(),
            ...paketForm
        };
        setPakets([...pakets, newPaket]);
        setShowAddPaketModal(false);
        setPaketForm({ paket: '', deskripsi: '', status: 'PREMIUM' });
    };

    const handleDeletePaket = (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
            setPakets(pakets.filter(p => p._id !== id));
        }
    };

    const handleSavePaketEdit = () => {
        setPakets(pakets.map(p => p._id === selectedPaket._id ? selectedPaket : p));
        setIsEditingPaket(false);
    };

    const handleAddQuestion = () => {
        const newQuestion = {
            _id: Date.now().toString(),
            paketId: selectedPaket._id,
            ...questionForm
        };
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
    };

    const addSoalItem = () => {
        setQuestionForm({
            ...questionForm,
            soal: [...questionForm.soal, { type: 'TEXT', value: '' }]
        });
    };

    const updateSoalItem = (index, field, value) => {
        const newSoal = [...questionForm.soal];
        newSoal[index][field] = value;
        setQuestionForm({ ...questionForm, soal: newSoal });
    };

    const removeSoalItem = (index) => {
        const newSoal = questionForm.soal.filter((_, i) => i !== index);
        setQuestionForm({ ...questionForm, soal: newSoal });
    };

    // Pakets Page
    if (page === 'pakets') {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
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
                <Sidebar />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setPage('pakets')} className="p-2 hover:bg-gray-200 rounded-full">
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Access Test Management</h1>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Nama</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Paket</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Periode</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {accessList.map(access => (
                                            <tr key={access._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-sm text-gray-800">{access.nama}</td>
                                                <td className="px-6 py-4 text-sm text-gray-600">{access.email}</td>
                                                <td className="px-6 py-4 text-sm text-gray-800">{access.paket}</td>
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
        const paketQuestions = questions.filter(q => q.paketId === selectedPaket._id);

        return (
            <div className="flex min-h-screen bg-gray-50">
                <Sidebar />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setPage('pakets')} className="p-2 hover:bg-gray-200 rounded-full">
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
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Soal ({paketQuestions.length})</h2>
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
                                {paketQuestions.map((question, index) => (
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
                                                        <p key={i}>{s.type === 'TEXT' ? s.value : `[IMAGE: ${s.value}]`}</p>
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
                                            <option value="RPC">RPC</option>
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
                                                        onChange={(e) => updateSoalItem(index, 'type', e.target.value)}
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
                                                        onChange={(e) => updateSoalItem(index, 'value', e.target.value)}
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                                        rows="2"
                                                        placeholder="Masukkan teks soal..."
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={item.value}
                                                        onChange={(e) => updateSoalItem(index, 'value', e.target.value)}
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
                <Sidebar />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className=" mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button onClick={() => setPage('access')} className="p-2 hover:bg-gray-200 rounded-full">
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
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t">
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">Informasi Access</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <span className="text-gray-600 text-sm">Paket:</span>
                                        <p className="font-semibold text-gray-800">{selectedAccess.paket}</p>
                                    </div>
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
                                </div>
                            </div>
                        </div>

                        {/* History Nilai */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <History className="w-6 h-6 text-gray-700" />
                                <h2 className="text-2xl font-bold text-gray-800">History Nilai ({userNilai.length})</h2>
                            </div>

                            {userNilai.length === 0 ? (
                                <div className="text-center py-12">
                                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-600">Belum ada riwayat pengerjaan tes</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {userNilai.map((nilai, index) => (
                                        <div key={nilai._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="font-bold text-gray-800">{nilai.paket}</h3>
                                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                                                            Percobaan #{userNilai.length - index}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">
                                                        {new Date(nilai.createdAt).toLocaleString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'long',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-3xl font-bold text-indigo-600">{nilai.nilai.nilai.toFixed(2)}%</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-5 gap-4">
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-1">Benar</p>
                                                    <p className="text-lg font-bold text-green-600">{nilai.nilai.benar}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-1">Salah</p>
                                                    <p className="text-lg font-bold text-red-600">{nilai.nilai.salah}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-1">Tidak Dijawab</p>
                                                    <p className="text-lg font-bold text-gray-600">{nilai.nilai.tidak_terjawab}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-1">Waktu</p>
                                                    <p className="text-lg font-bold text-blue-600">{formatTime(nilai.timeSpent)}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-xs text-gray-600 mb-1">Total Soal</p>
                                                    <p className="text-lg font-bold text-gray-800">{nilai.jumlah_soal}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}