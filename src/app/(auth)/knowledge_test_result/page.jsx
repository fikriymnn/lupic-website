"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { ArrowLeft, History, X, CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react";

export default function KnowledgeTestResult() {
    const [userHistory, setUserHistory] = useState([])
    const [result, setResult] = useState(null)
    const [page, setPage] = useState('history-list') // 'history-list' or 'detail'

    const getData = async () => {
        try {
            const resUser = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true })
            if (resUser.data) {
                const resNilai = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/nilai/history/" + resUser.data?._id)
                if (resNilai.data) {
                    setUserHistory(resNilai.data)
                }
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleViewHistoryResult = (attempt) => {
        setResult(attempt)
        setPage('detail')
    }

    if (page === 'detail' && result) {
        return <DetailHistory result={result} setPage={setPage} formatTime={formatTime} />
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-6xl mx-auto md:px-8 px-4">
                    <div className="flex items-center gap-4 mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">
                            History Pengerjaan Tes
                        </h1>
                    </div>

                    {userHistory && userHistory.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                            <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-xl text-gray-600">Belum ada riwayat pengerjaan</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {userHistory.map((attempt, index) => (
                                <div key={attempt?._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div>
                                                    <h3 className="text-2xl font-bold text-gray-800">{attempt?.paket}</h3>
                                                    <span className="text-gray-600 text-[10px]">
                                                        {formatDate(attempt.createdAt)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                                <div>
                                                    <p className="text-sm text-gray-600">Benar</p>
                                                    <p className="text-xl font-bold text-green-600">{attempt?.nilai?.benar}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Salah</p>
                                                    <p className="text-xl font-bold text-red-600">{attempt?.nilai?.salah}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Tidak Dijawab</p>
                                                    <p className="text-xl font-bold text-gray-600">{attempt?.nilai?.tidak_terjawab}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Waktu</p>
                                                    <p className="text-xl font-bold text-blue-600">{formatTime(attempt.timeSpent)}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-600">Nilai</p>
                                                    <p className="text-3xl font-bold text-indigo-600">{attempt.nilai.nilai.toFixed(2)}%</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewHistoryResult(attempt)}
                                            className="ml-4 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <CustomFooter />
        </>
    )
}

function DetailHistory({ result, setPage, formatTime }) {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                <div className="max-w-6xl mx-auto md:px-8 px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800">Hasil Pengerjaan Tes</h1>
                        <button
                            onClick={() => setPage('history-list')}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <X className="w-8 h-8 text-gray-600" />
                        </button>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{result.paket}</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <p><span className="font-semibold">Nama:</span> {result.nama}</p>
                                <p><span className="font-semibold">Email:</span> {result.email}</p>
                            </div>
                            <div>
                                <p><span className="font-semibold">No. WhatsApp:</span> {result.no_whatsapp}</p>
                                <p><span className="font-semibold">Tanggal:</span> {new Date(result.createdAt).toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan</h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <CheckCircle className="w-12 h-12 text-green-500" />
                                </div>
                                <p className="text-3xl font-bold text-green-600">{result.nilai.benar}</p>
                                <p className="text-gray-600">Benar</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <XCircle className="w-12 h-12 text-red-500" />
                                </div>
                                <p className="text-3xl font-bold text-red-600">{result.nilai.salah}</p>
                                <p className="text-gray-600">Salah</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <AlertCircle className="w-12 h-12 text-gray-400" />
                                </div>
                                <p className="text-3xl font-bold text-gray-600">{result.nilai.tidak_terjawab}</p>
                                <p className="text-gray-600">Tidak Dijawab</p>
                            </div>
                            <div className="text-center">
                                <div className="flex justify-center mb-2">
                                    <Clock className="w-12 h-12 text-blue-500" />
                                </div>
                                <p className="text-3xl font-bold text-blue-600">
                                    {result.timeSpent ? formatTime(result.timeSpent) : '-'}
                                </p>
                                <p className="text-gray-600">Waktu</p>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-bold text-indigo-600 mb-2">{result.nilai.nilai.toFixed(2)}%</div>
                                <p className="text-gray-600">Persentase</p>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t">
                            <p className="text-center text-gray-700">
                                <span className="font-semibold">Total Soal:</span> {result.jumlah_soal}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    );
}