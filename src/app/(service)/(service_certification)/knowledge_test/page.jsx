"use client"
import React, { useState } from 'react';
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useRouter } from 'next/navigation';

/**
 * LatihanTesObjektifPage.jsx
 * Halaman landing untuk menu "Latihan Tes Objektif" yang menjelaskan
 * Uji Coba Awal (Gratis) dan Simulasi Intensif (Premium).
 *
 * Props (opsional):
 * - user: { isLoggedIn: boolean, hasSubscription: boolean }
 * - onStartTrial: function -> dipanggil ketika user memulai uji coba gratis
 * - onStartPremium: function -> dipanggil ketika user memulai simulasi premium
 * - onOpenLogin: function -> panggil untuk membuka modal login
 * - onOpenSubscribe: function -> panggil untuk membuka flow berlangganan
 *
 * Jika tidak diberikan, komponen menyediakan mock handler untuk demo.
 */


export default function LatihanTesObjektifPage() {
    const router = useRouter()
    const [user, setUser] = useState(true)
    const [access, setAccess] = useState(true)


    // Handler functions (no external props)
    const onStartTrial = () => {
        console.log("Mulai Uji Coba Awal...");
    };

    const onStartPremium = () => {
        console.log("Mulai Simulasi Premium...");
    };

    const onOpenLogin = () => {
        console.log("Buka modal login...");
    };

    const onOpenSubscribe = () => {
        console.log("Buka halaman langganan...");
    };

    const handleStartTrial = () => {
        if (typeof onStartTrial === 'function') return onStartTrial();
        // default demo behaviour
        alert('Memulai Uji Coba Awal (Gratis)\n\n10 PCK + 10 SJT — akses instan, tanpa login.');
    };

    const handleStartPremium = () => {
        // Jika user sudah berlangganan -> panggil onStartPremium
        if (user.isLoggedIn && user.hasSubscription) {
            if (typeof onStartPremium === 'function') return onStartPremium();
            return alert('Memulai Simulasi Intensif (Premium) — 35 PCK + 30 SJT, 120 menit');
        }

        // Jika belum login -> arahkan ke login dulu
        if (!user.isLoggedIn) {
            if (typeof onOpenLogin === 'function') return onOpenLogin();
            setShowLoginModal(true);
            return;
        }

        // User login tapi belum berlangganan -> tawarkan subscribe
        if (user.isLoggedIn && !user.hasSubscription) {
            if (typeof onOpenSubscribe === 'function') return onOpenSubscribe();
            setShowSubscribeModal(true);
            return;
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 to-indigo-100 p-8 pt-24">
                <div className="max-w-5xl mx-auto">
                    {/* Title */}
                    <div className="max-w-6xl mx-auto md:block grid grid-cols-1 justify-items-center md:justify-items-start mb-8">
                        <h1 className="md:text-4xl text-4xl font-bold">
                            Knowledge Test Exercise
                        </h1>
                        <div className="h-1 w-36 bg-koreaRed md:mt-3 mt-2"></div>
                    </div>

                    <p className="text-gray-700 mb-8 leading-relaxed">
                        Menu Latihan Tes Objektif adalah tolak ukur utama Anda untuk mengukur dan meningkatkan kesiapan menghadapi seleksi
                        Tes Pedagogical Content Knowledge (PCK) dan Situational Judgement Test (SJT) PPG.
                        Kami menawarkan jalur pelatihan bertingkat yang sesuai dengan kebutuhan Anda: mulai
                        dari <span className="font-semibold">Uji Coba Awal (Gratis)</span> untuk membiasakan
                        diri dengan format soal, hingga <span className="font-semibold">Simulasi Intensif (Premium)</span>
                        yang menyediakan paket soal lengkap dan berbatas waktu (120 menit) untuk mematangkan
                        strategi dan mentalitas Anda dalam kondisi ujian sesungguhnya. Pilih jalur Anda sekarang,
                        dan pastikan Anda melangkah ke ujian dengan persiapan optimal.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left - Trial */}
                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Uji Coba Awal (Gratis)</h2>
                                <p className="text-gray-600 mb-4">
                                    Ukur Kesiapan Awal Anda! Mulai perjalanan persiapan PPG Anda dengan sesi pemanasan.
                                    Fitur ini menyediakan <span className="font-semibold">10 soal PCK</span> dan
                                    <span className="font-semibold"> 10 soal SJT</span> untuk membantu Anda memahami jenis soal
                                    dan membiasakan diri dengan format tes. Akses instan, tidak perlu login.
                                </p>

                                <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                                    <li>10 PCK + 10 SJT</li>
                                    <li>Akses instan, tanpa login</li>
                                    <li>Waktu fleksibel (non-simulasi)</li>
                                    <li>Ringkasan hasil singkat setelah selesai</li>
                                </ul>
                            </div>

                            <div>
                                <button
                                    onClick={handleStartTrial}
                                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                                >
                                    Mulai Tes
                                </button>
                            </div>
                        </div>

                        {/* Right - Premium */}
                        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Simulasi Intensif (Premium)</h2>
                                <p className="text-gray-600 mb-4">
                                    Persiapan komprehensif menuju lulus PPG! Setiap paket terdiri dari
                                    <span className="font-semibold"> 35 soal PCK</span> dan
                                    <span className="font-semibold"> 30 soal SJT</span> yang harus diselesaikan dalam
                                    <span className="font-semibold"> 120 menit</span> untuk mensimulasikan kondisi ujian.
                                    Akses penuh hanya untuk pengguna berbayar.
                                </p>

                                <ul className="text-sm text-gray-600 list-disc list-inside mb-4">
                                    <li>Paket lengkap: 35 PCK + 30 SJT</li>
                                    <li>Waktu uji: 120 menit (simulasi ketat)</li>
                                    <li>Analisis hasil mendalam dan review soal</li>
                                    {/* <li>Akses berulang untuk pelanggan</li> */}
                                </ul>
                            </div>

                            <div>
                                    
                                {/* Access logic: show different CTA based on user state */}
                                {user && access ? (
                                    <>
                                        <button
                                            onClick={()=>{router.push("/knowledge_test/premium?userId="+user._id)}}
                                            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                                        >
                                            Mulai Simulasi
                                        </button>
                                    </>
                                ) : !user ? (
                                    <>
                                        <div className="mb-3 text-sm text-yellow-700 font-medium">Akses terbatas: Silakan masuk untuk melanjutkan</div>
                                        <button
                                            onClick={() => {
                                               router.push("/login?prev=knowledge_test")
                                            }}
                                            className="w-full bg-yellow-400 text-yellow-900 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                                        >
                                            Masuk / Daftar
                                        </button>
                                    </>
                                ) : (
                                    // User logged in but not subscribed
                                    <>
                                        <div className="mb-3 text-sm text-red-700 font-medium">Akses premium diperlukan</div>
                                        <button
                                            onClick={() => {
                                                router.push("/knowledge_test/access?")
                                            }}
                                            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                        >
                                            Langganan Sekarang
                                        </button>
                                    </>
                                )}

                         
                            </div>
                        </div>
                    </div>

                    {/* Footer action / tips */}
                    <div className="mt-8 bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips Singkat</h3>
                        <ol className="list-decimal list-inside text-gray-600 text-sm space-y-2">
                            <li>Mulai dengan Uji Coba Awal jika baru pertama kali; pahami format soal.</li>
                            <li>Gunakan Simulasi Intensif untuk latihan waktu dan strategi ujian.</li>
                            <li>Review hasil setelah setiap simulasi untuk memperbaiki teknik menjawab.</li>
                        </ol>
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    );
}
