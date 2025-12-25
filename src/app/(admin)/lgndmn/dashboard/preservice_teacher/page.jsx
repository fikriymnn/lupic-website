"use client"
import React, { useEffect, useState, useMemo, useRef } from 'react';
import {
    Plus, Edit, Trash2, Eye, X, Save, ChevronLeft,
    FileText, Users, Package, Check, Ban, Calendar, History,
    Download,
    DownloadIcon, DollarSign, Loader2, CheckCircle, AlertCircle,
    Bold, Italic, Underline, List, Link as LinkIcon, Image as ImageIcon
} from 'lucide-react';
import SidebarAdmin from "@/components/Sidebar";
import axios from 'axios';
import { BiMoney } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Simple Rich Text Editor Component
const SimpleRichTextEditor = ({ value, onChange, placeholder, minHeight = '200px' }) => {
    const editorRef = useRef(null);

    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    return (
        <div className="border rounded-lg overflow-hidden bg-white">
            {/* Toolbar */}
            <div className="border-b bg-gray-50 p-2 flex gap-1 flex-wrap">
                <button
                    type="button"
                    onClick={() => applyFormat('bold')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => applyFormat('italic')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => applyFormat('underline')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Underline"
                >
                    <Underline className="w-4 h-4" />
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                    type="button"
                    onClick={() => applyFormat('insertUnorderedList')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => applyFormat('insertOrderedList')}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Numbered List"
                >
                    <List className="w-4 h-4" />
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <button
                    type="button"
                    onClick={() => {
                        const url = prompt('Enter URL:');
                        if (url) applyFormat('createLink', url);
                    }}
                    className="p-2 hover:bg-gray-200 rounded"
                    title="Insert Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
                <div className="w-px bg-gray-300 mx-1"></div>
                <select
                    onChange={(e) => {
                        applyFormat('formatBlock', e.target.value);
                        e.target.value = '';
                    }}
                    className="px-2 py-1 text-sm border-0 bg-transparent hover:bg-gray-200 rounded"
                    defaultValue=""
                >
                    <option value="">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                </select>
            </div>
            {/* Editor */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                className="p-4 outline-none prose prose-sm max-w-none"
                style={{ minHeight }}
                placeholder={placeholder}
            />
        </div>
    );
};


export default function AdminPreServiceTeacherTest() {
    const router = useRouter();
    const [page, setPage] = useState('pakets');
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
    const [uploadingImage, setUploadingImage] = useState(false);
    const [paketForm, setPaketForm] = useState({ paket: '', deskripsi: '', status: 'PREMIUM' });
    const [questionForm, setQuestionForm] = useState({
        kategori: 'Pedagogik',
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

    const getPaket = async () => {
        try {
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/paket")
            if (res.data) {
                setPakets(res.data)
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const createPaket = async () => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/paket", paketForm)
            if (res.data) {
                alert("Sukses menambahkan paket!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const updatePaket = async (id) => {
        try {
            const res = await axios.put(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/paket/" + id, selectedPaket)
            if (res.data) {
                alert("Sukses mengupdate paket!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    const deletePaket = async (id) => {
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/paket/" + id, selectedPaket)
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
            const res = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/soal/paketid/" + selectedPaket._id)
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
            const soalData = {
                kategori: questionForm.kategori,
                paketId: selectedPaket._id,
                soal: questionForm.soal, // Already in array format
                pilihan: questionForm.pilihan,
                jawaban: questionForm.jawaban,
                penjelasan: questionForm.penjelasan
            };
            
            const res = await axios.post(
                process.env.NEXT_PUBLIC_API_URL + "/api/preservice/soal", 
                soalData
            );
            
            if (res.data) {
                alert("Soal berhasil ditambahkan!");
                return res.data;
            }
        } catch (err) {
            console.log("Error creating soal:", err.response?.data || err.message);
            throw err;
        }
    }

    const editSoal = async () => {
        try {
            const soalData = {
                kategori: questionForm.kategori,
                soal: questionForm.soal, // Already in array format
                pilihan: questionForm.pilihan,
                jawaban: questionForm.jawaban,
                penjelasan: questionForm.penjelasan
            };
            
            const res = await axios.put(
                process.env.NEXT_PUBLIC_API_URL + "/api/preservice/soal/" + questionForm._id, 
                soalData
            );
            
            if (res.data) {
                alert("Soal berhasil di update!");
                return res.data;
            }
        } catch (err) {
            console.log("Error updating soal:", err.response?.data || err.message);
            throw err;
        }
    }

    const deleteSoal = async (id) => {
        try {
            const res = await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/api/preservice/soal/" + id)
            if (res.data) {
                alert("Soal berhasil dihapus!")
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (selectedPaket && selectedPaket._id) {
            getSoal()
        }
    }, [selectedPaket])

    // Sort pakets: GRATIS first, then others
    const sortedPakets = useMemo(() => {
        return [...pakets].sort((a, b) => {
            if (a.status === 'GRATIS' && b.status !== 'GRATIS') return -1;
            if (a.status !== 'GRATIS' && b.status === 'GRATIS') return 1;
            return 0;
        });
    }, [pakets]);

    const handleAddPaket = async () => {
        try {
            await createPaket();
            // Refresh the pakets list from server
            await getPaket();
            setShowAddPaketModal(false);
            setPaketForm({ paket: '', deskripsi: '', status: 'PREMIUM' });
        } catch (error) {
            console.error('Error adding paket:', error);
            alert('Gagal menambahkan paket. Silakan coba lagi.');
        }
    };

    const handleDeletePaket = async (id, status) => {
        if (status === 'GRATIS') {
            alert('Paket GRATIS tidak dapat dihapus!');
            return;
        }
        
        if (window.confirm('Apakah Anda yakin ingin menghapus paket ini?')) {
            try {
                await deletePaket(id);
                // Refresh the pakets list from server
                await getPaket();
            } catch (error) {
                console.error('Error deleting paket:', error);
                alert('Gagal menghapus paket. Silakan coba lagi.');
            }
        }
    };

    const handleSavePaketEdit = async () => {
        try {
            await updatePaket(selectedPaket._id);
            // Refresh the pakets list from server
            await getPaket();
            setIsEditingPaket(false);
        } catch (error) {
            console.error('Error updating paket:', error);
            alert('Gagal mengupdate paket. Silakan coba lagi.');
        }
    };

    const handleAddQuestion = async () => {
        try {
            await createSoal();
            // Refresh the questions list from server
            await getSoal();
            setShowQuestionModal(false);
            setEditingQuestion(null);
            setQuestionForm({
                kategori: 'Pedagogik',
                soal: [{ type: 'TEXT', value: '' }],
                pilihan: ['', '', '', '', ''],
                jawaban: '',
                penjelasan: ''
            });
        } catch (error) {
            console.error('Error adding question:', error);
            alert('Gagal menambahkan soal. Silakan coba lagi.');
        }
    };

    const handleEditQuestion = async () => {
        try {
            await editSoal();
            // Refresh the questions list from server
            await getSoal();
            setShowQuestionModal(false);
            setEditingQuestion(null);
            setQuestionForm({
                kategori: 'Pedagogik',
                soal: [{ type: 'TEXT', value: '' }],
                pilihan: ['', '', '', '', ''],
                jawaban: '',
                penjelasan: ''
            });
        } catch (error) {
            console.error('Error editing question:', error);
            alert('Gagal mengupdate soal. Silakan coba lagi.');
        }
    };

    const handleDeleteQuestion = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
            try {
                await deleteSoal(id);
                // Refresh the questions list from server
                await getSoal();
            } catch (error) {
                console.error('Error deleting question:', error);
                alert('Gagal menghapus soal. Silakan coba lagi.');
            }
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

    const updateSoalItem = async (index, field, value) => {
        const newSoal = [...questionForm.soal];
        
        if (field === 'type') {
            // When changing type, reset value
            newSoal[index] = { type: value, value: '' };
            setQuestionForm({ ...questionForm, soal: newSoal });
        } else if (field === 'value') {
            if (newSoal[index].type === 'IMAGE' && value instanceof File) {
                // Handle image upload
                setUploadingImage(true);
                const formData = new FormData();
                try {
                    formData.append('file', value);
                    console.log('Uploading image to:', process.env.NEXT_PUBLIC_API_STORAGE + "/api/file");
                    const getData = await axios.post(
                        process.env.NEXT_PUBLIC_API_STORAGE + "/api/file", 
                        formData, 
                        {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        }
                    );
                    console.log('Upload response:', getData.data);
                    if (getData.data) {
                        newSoal[index].value = getData.data;
                        setQuestionForm({ ...questionForm, soal: newSoal });
                        alert('Gambar berhasil diupload!');
                    }
                } catch (err) {
                    console.error("Error uploading image:", err);
                    alert("Gagal mengupload gambar. Silakan coba lagi.");
                } finally {
                    setUploadingImage(false);
                }
            } else {
                // Handle text value (HTML from rich text editor)
                newSoal[index].value = value;
                setQuestionForm({ ...questionForm, soal: newSoal });
            }
        }
    };

    const removeSoalItem = (index) => {
        const newSoal = questionForm.soal.filter((_, i) => i !== index);
        setQuestionForm({ ...questionForm, soal: newSoal });
    };

    function formatNumberID(num) {
        return num?.toLocaleString("id-ID");
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
                                Pre-Service Teacher Test Management
                            </h1>
                            <p className="text-gray-600 mb-6">Kelola paket dan soal Pre-Service Teacher Test</p>
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAddPaketModal(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Paket
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {sortedPakets.map(paket => (
                                    <div key={paket._id} className={`bg-white rounded-md shadow-md p-6 border-2 ${
                                        paket.status === 'GRATIS' ? 'border-green-400 bg-green-50' : 'border-gray-100'
                                    }`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-bold text-gray-800">{paket.paket}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                paket.status === 'PREMIUM' ? 'bg-yellow-400 text-yellow-900' :
                                                paket.status === 'GRATIS' ? 'bg-green-400 text-green-900' :
                                                'bg-gray-400 text-gray-900'
                                            }`}>
                                                {paket.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-sm min-h-16">{paket.deskripsi}</p>
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
                                            {paket.status !== 'GRATIS' && (
                                                <button
                                                    onClick={() => handleDeletePaket(paket._id, paket.status)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
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

    // Access Test Page (unchanged, keeping for completeness)
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

    // Paket Detail Page with Simple Rich Text Editor
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
                                        <span className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${
                                            selectedPaket.status === 'PREMIUM' ? 'bg-yellow-400 text-yellow-900' :
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
                                            kategori: 'Pedagogik',
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
                                                <div className="text-sm text-gray-700 mb-2 prose prose-sm max-w-none">
                                                    {question.soal?.map((s, i) => (
                                                        <div key={i} className="mb-2">
                                                            {s.type === 'TEXT' ? (
                                                                <div dangerouslySetInnerHTML={{ __html: s.value }} />
                                                            ) : (
                                                                <img 
                                                                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${s.value}`} 
                                                                    className='max-h-40 rounded border' 
                                                                    alt="soal" 
                                                                />
                                                            )}
                                                        </div>
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

                    {/* Question Modal with Simple Rich Text Editor */}
                    {showQuestionModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                            <div className="bg-white rounded-lg p-8 max-w-4xl w-full my-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingQuestion ? 'Edit Soal' : 'Tambah Soal Baru'}
                                    </h2>
                                    <button onClick={() => setShowQuestionModal(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>

                                <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                                        <select
                                            value={questionForm.kategori}
                                            onChange={(e) => setQuestionForm({ ...questionForm, kategori: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="Pedagogik">Pedagogik</option>
                                            <option value="Kimia_Sekolah">Kimia Sekolah</option>
                                            <option value="Profesional">Profesional</option>
                                        </select>
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-sm font-semibold text-gray-700">Soal</label>
                                            <button
                                                type="button"
                                                onClick={addSoalItem}
                                                className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Tambah Item
                                            </button>
                                        </div>
                                        
                                        {questionForm.soal.map((item, index) => (
                                            <div key={index} className="mb-4 p-4 border-2 border-gray-200 rounded-lg bg-gray-50">
                                                <div className="flex gap-2 mb-3 items-center">
                                                    <span className="text-sm font-semibold text-gray-600">Item {index + 1}:</span>
                                                    <select
                                                        value={item.type}
                                                        onChange={(e) => updateSoalItem(index, 'type', e.target.value)}
                                                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                                                    >
                                                        <option value="TEXT">TEXT</option>
                                                        <option value="IMAGE">IMAGE</option>
                                                    </select>
                                                    {questionForm.soal.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeSoalItem(index)}
                                                            className="ml-auto px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                                                        >
                                                            <X className="w-4 h-4" />
                                                            Hapus
                                                        </button>
                                                    )}
                                                </div>
                                                
                                                {item.type === 'TEXT' ? (
                                                    <SimpleRichTextEditor
                                                        value={item.value}
                                                        onChange={(value) => updateSoalItem(index, 'value', value)}
                                                        placeholder="Masukkan teks soal..."
                                                        minHeight="150px"
                                                    />
                                                ) : (
                                                    <div className="space-y-3">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                Upload Gambar
                                                            </label>
                                                            <input
                                                                type="file"
                                                                accept="image/*"
                                                                disabled={uploadingImage}
                                                                onChange={(e) => {
                                                                    const file = e.target.files?.[0];
                                                                    if (file) {
                                                                        console.log('File selected:', file.name);
                                                                        updateSoalItem(index, 'value', file);
                                                                    }
                                                                }}
                                                                className="block w-full text-sm text-gray-500
                                                                    file:mr-4 file:py-2 file:px-4
                                                                    file:rounded-lg file:border-0
                                                                    file:text-sm file:font-semibold
                                                                    file:bg-indigo-50 file:text-indigo-700
                                                                    hover:file:bg-indigo-100
                                                                    cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                                            />
                                                            {uploadingImage && (
                                                                <p className="text-sm text-indigo-600 mt-2 flex items-center gap-2">
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                    Mengupload gambar...
                                                                </p>
                                                            )}
                                                        </div>
                                                        {item.value && !uploadingImage && (
                                                            <div className="mt-3">
                                                                <p className="text-sm text-gray-600 mb-2">Preview:</p>
                                                                <img 
                                                                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${item.value}`}
                                                                    alt="Preview"
                                                                    className="max-h-60 rounded-lg border-2 border-gray-300 shadow-sm"
                                                                    onError={(e) => {
                                                                        console.error('Image load error');
                                                                        e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" text-anchor="middle" dy=".3em">No Image</text></svg>';
                                                                    }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Pilihan Jawaban</label>
                                        {questionForm.pilihan.map((pilihan, index) => (
                                            <div key={index} className="mb-3">
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
                                        <SimpleRichTextEditor
                                            value={questionForm.penjelasan}
                                            onChange={(value) => setQuestionForm({ ...questionForm, penjelasan: value })}
                                            placeholder="Masukkan penjelasan jawaban..."
                                            minHeight="150px"
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

    // Access Detail Page (unchanged)
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
                                            <span className="text-gray-600">Harga:</span>
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