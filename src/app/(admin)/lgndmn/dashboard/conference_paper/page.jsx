"use client"
import React, { useEffect, useState } from 'react';
import {
    Plus, Edit, Trash2, Eye, X, Save, ChevronLeft,
    FileText, Package, Loader2, CheckCircle, AlertCircle,
    Image, Upload
} from 'lucide-react';
import SidebarAdmin from "@/components/SidebarAdmin";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminConferencePapper() {
    const router = useRouter();
    const [page, setPage] = useState('list'); // list, detail
    const [conferencePappers, setConferencePappers] = useState([]);
    const [selectedConference, setSelectedConference] = useState(null);
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditingConference, setIsEditingConference] = useState(false);
    const [showAddConferenceModal, setShowAddConferenceModal] = useState(false);
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [editingModule, setEditingModule] = useState(null);
    
    const [conferenceForm, setConferenceForm] = useState({
        title: '',
        description: '',
        cover: ''
    });

    const [moduleForm, setModuleForm] = useState({
        title: '',
        description: '',
        file: '',
        cover: ''
    });

    // Format date
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

    // Get all conference pappers
    const getConferencePappers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_URL}/api/conference-papper`);
            if (res.data) {
                setConferencePappers(res.data);
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getConferencePappers();
    }, []);

    // Get modules when conference selected
    useEffect(() => {
        if (selectedConference) {
            setModules(selectedConference.module || []);
        }
    }, [selectedConference]);

    // Create conference papper
    const createConferencePapper = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/conference-papper`, conferenceForm);
            if (res.data) {
                alert("Sukses menambahkan conference papper!");
                getConferencePappers();
                setShowAddConferenceModal(false);
                setConferenceForm({ title: '', description: '', cover: '' });
            }
        } catch (err) {
            console.log(err.message);
            alert("Gagal menambahkan conference papper!");
        }
    };

    // Update conference papper
    const updateConferencePapper = async () => {
        try {
            const res = await axios.put(`${API_URL}/api/conference-papper/${selectedConference._id}`, selectedConference);
            if (res.data) {
                alert("Sukses mengupdate conference papper!");
                getConferencePappers();
                setIsEditingConference(false);
            }
        } catch (err) {
            console.log(err.message);
            alert("Gagal mengupdate conference papper!");
        }
    };

    // Delete conference papper
    const deleteConferencePapper = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus conference papper ini? Semua modul di dalamnya juga akan terhapus.')) {
            try {
                const res = await axios.delete(`${API_URL}/api/conference-papper/${id}`);
                if (res.data) {
                    alert("Sukses menghapus conference papper!");
                    getConferencePappers();
                }
            } catch (err) {
                console.log(err.message);
                alert("Gagal menghapus conference papper!");
            }
        }
    };

    // Add module
    const addModule = async () => {
        try {
            const res = await axios.post(`${API_URL}/api/conference-papper/${selectedConference._id}/module`, moduleForm);
            if (res.data) {
                alert("Modul berhasil ditambahkan!");
                // Refresh conference data
                const updatedRes = await axios.get(`${API_URL}/api/conference-papper/${selectedConference._id}`);
                setSelectedConference(updatedRes.data);
                setShowModuleModal(false);
                setModuleForm({ title: '', description: '', file: '', cover: '' });
            }
        } catch (err) {
            console.log(err.message);
            alert("Gagal menambahkan modul!");
        }
    };

    // Update module
    const updateModule = async () => {
        try {
            const res = await axios.put(`${API_URL}/api/conference-papper/${selectedConference._id}/module/${editingModule._id}`, moduleForm);
            if (res.data) {
                alert("Modul berhasil diupdate!");
                // Refresh conference data
                const updatedRes = await axios.get(`${API_URL}/api/conference-papper/${selectedConference._id}`);
                setSelectedConference(updatedRes.data);
                setShowModuleModal(false);
                setEditingModule(null);
                setModuleForm({ title: '', description: '', file: '', cover: '' });
            }
        } catch (err) {
            console.log(err.message);
            alert("Gagal mengupdate modul!");
        }
    };

    // Delete module
    const deleteModule = async (moduleId) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus modul ini?')) {
            try {
                const res = await axios.delete(`${API_URL}/api/conference-papper/${selectedConference._id}/module/${moduleId}`);
                if (res.data) {
                    alert("Modul berhasil dihapus!");
                    // Refresh conference data
                    const updatedRes = await axios.get(`${API_URL}/api/conference-papper/${selectedConference._id}`);
                    setSelectedConference(updatedRes.data);
                }
            } catch (err) {
                console.log(err.message);
                alert("Gagal menghapus modul!");
            }
        }
    };

    // Handle file upload
    const handleFileUpload = async (e, field, isModule = false) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_STORAGE}/api/file`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            if (res.data) {
                if (isModule) {
                    setModuleForm({ ...moduleForm, [field]: res.data });
                } else {
                    setConferenceForm({ ...conferenceForm, [field]: res.data });
                }
            }
        } catch (err) {
            console.log(err);
            alert("Gagal mengupload file!");
        }
    };

    // List Page
    if (page === 'list') {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className="mx-auto">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold text-blue-600 mb-1">
                                Conference Papper Management
                            </h1>
                            <p className="text-gray-600 mb-6">Kelola conference papper dan modul</p>
                        </div>

                        <div className="flex justify-between items-center mb-8">
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowAddConferenceModal(true)}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add Conference Papper
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                                </div>
                            ) : (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {conferencePappers.map(conference => (
                                        <div key={conference._id} className="bg-white rounded-md shadow-md p-6 border border-gray-100">
                                            {conference.cover && (
                                                <div className="mb-4 h-40 bg-gray-200 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${conference.cover}`} 
                                                        alt={conference.title}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-xl font-bold text-gray-800">{conference.title}</h3>
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900">
                                                    {conference.module?.length || 0} Modul
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4 text-sm line-clamp-3">{conference.description}</p>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedConference(conference);
                                                        setPage('detail');
                                                    }}
                                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    Detail
                                                </button>
                                                <button
                                                    onClick={() => deleteConferencePapper(conference._id)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Add Conference Modal */}
                    {showAddConferenceModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                            <div className="bg-white rounded-lg p-8 max-w-md w-full">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">Tambah Conference Papper</h2>
                                    <button onClick={() => setShowAddConferenceModal(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={conferenceForm.title}
                                            onChange={(e) => setConferenceForm({ ...conferenceForm, title: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Conference Title"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={conferenceForm.description}
                                            onChange={(e) => setConferenceForm({ ...conferenceForm, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                            placeholder="Description..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, 'cover', false)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            accept="image/*"
                                        />
                                        {conferenceForm.cover && (
                                            <div className="mt-2">
                                                <img 
                                                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${conferenceForm.cover}`}
                                                    alt="Preview"
                                                    className="h-20 rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={createConferencePapper}
                                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                                >
                                    Simpan Conference Papper
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Detail Page
    if (page === 'detail' && selectedConference) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <SidebarAdmin />
                <div className="w-64 flex-shrink-0"></div>
                <div className='flex-1 p-6 lg:p-8'>
                    <div className="mx-auto">
                        <div className="flex items-center gap-4 mb-8">
                            <button 
                                onClick={() => {
                                    setSelectedConference(null);
                                    setModules([]);
                                    setPage('list');
                                }} 
                                className="p-2 hover:bg-gray-200 rounded-full"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-3xl font-bold text-gray-800">Detail Conference Papper</h1>
                        </div>

                        {/* Conference Info */}
                        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Informasi Conference Papper</h2>
                                <button
                                    onClick={() => setIsEditingConference(!isEditingConference)}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                >
                                    {isEditingConference ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    {isEditingConference ? 'Simpan' : 'Edit'}
                                </button>
                            </div>

                            {isEditingConference ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={selectedConference.title}
                                            onChange={(e) => setSelectedConference({ ...selectedConference, title: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={selectedConference.description}
                                            onChange={(e) => setSelectedConference({ ...selectedConference, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                                        <input
                                            type="text"
                                            value={selectedConference.cover}
                                            onChange={(e) => setSelectedConference({ ...selectedConference, cover: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="URL Cover Image"
                                        />
                                    </div>
                                    <button
                                        onClick={updateConferencePapper}
                                        className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    >
                                        Simpan Perubahan
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {selectedConference.cover && (
                                        <div className="mb-4">
                                            <img 
                                                src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${selectedConference.cover}`}
                                                alt={selectedConference.title}
                                                className="h-40 rounded-lg"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Title:</span>
                                        <p className="text-gray-800">{selectedConference.title}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Description:</span>
                                        <p className="text-gray-800">{selectedConference.description}</p>
                                    </div>
                                    <div>
                                        <span className="text-sm font-semibold text-gray-700">Created At:</span>
                                        <p className="text-gray-800">{formatDateTime(selectedConference.createdAt)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modules List */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Daftar Modul ({modules.length})</h2>
                                <button
                                    onClick={() => {
                                        setEditingModule(null);
                                        setModuleForm({ title: '', description: '', file: '', cover: '' });
                                        setShowModuleModal(true);
                                    }}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Modul
                                </button>
                            </div>

                            <div className="space-y-4">
                                {modules.map((module, index) => (
                                    <div key={module._id} className="border rounded-lg p-4 hover:bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="font-bold text-gray-800">Modul #{index + 1}</span>
                                                </div>
                                                {module.cover && (
                                                    <img 
                                                        src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${module.cover}`}
                                                        alt={module.title}
                                                        className="h-20 rounded mb-2"
                                                    />
                                                )}
                                                <h3 className="text-lg font-semibold text-gray-800 mb-1">{module.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                                                {module.file && (
                                                    <a 
                                                        href={`${process.env.NEXT_PUBLIC_API_FILE_URL}${module.file}`}
                                                        target="_blank"
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        Download File
                                                    </a>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingModule(module);
                                                        setModuleForm(module);
                                                        setShowModuleModal(true);
                                                    }}
                                                    className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteModule(module._id)}
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

                    {/* Module Modal */}
                    {showModuleModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                            <div className="bg-white rounded-lg p-8 max-w-2xl w-full my-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        {editingModule ? 'Edit Modul' : 'Tambah Modul Baru'}
                                    </h2>
                                    <button onClick={() => setShowModuleModal(false)}>
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                                        <input
                                            type="text"
                                            value={moduleForm.title}
                                            onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            placeholder="Module Title"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={moduleForm.description}
                                            onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            rows="3"
                                            placeholder="Module description..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">File</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, 'file', true)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        />
                                        {moduleForm.file && (
                                            <div className="mt-2 text-sm text-gray-600">
                                                File: {moduleForm.file}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, 'cover', true)}
                                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                                            accept="image/*"
                                        />
                                        {moduleForm.cover && (
                                            <div className="mt-2">
                                                <img 
                                                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${moduleForm.cover}`}
                                                    alt="Preview"
                                                    className="h-20 rounded"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button
                                    onClick={editingModule ? updateModule : addModule}
                                    className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                                >
                                    {editingModule ? 'Update Modul' : 'Simpan Modul'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}