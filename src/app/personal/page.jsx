"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import { useEffect, useState } from "react";
import axios from "axios";

export default function personal() {
    const [login, setLogin] = useState(false)
    const [profile, setProfile] = useState({})
    const [jadwal, setJadwal] = useState([])
    const data = [
        { no: 1, tanggal: '16-4-2025', hari: 'Senin', status: 'Terdaftar' },
        { no: 2, tanggal: '21-4-2025', hari: 'Rabu', status: 'Terdaftar' },
    ];

    useEffect(() => {
        async function checkLogin() {
            try {
                const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/public/user", { withCredentials: true });
                if (data.data) {
                    const data2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/peserta?email=" + data.data.email, { withCredentials: true });
                    if (data2.data) {
                        setJadwal(data2.data)
                    }
                } else {
                    window.location.href = "/login"
                }
            } catch (err) {
                alert(err.message)
            }
        }
        checkLogin()
    }, [])

    return (
        <>
            <Navbar />
            <div className="h-screen m-auto flex">
                <div className="bg-white shadow-lg p-6 md:w-[95%] w-screen mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center mt-[2%]">Daftar Registrasi Teacher Test</h2>
                    <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
                    <div className="overflow-y-auto">
                        <table className="border-collapse shadow-md mt-10 w-[95%] m-auto rounded-t mb-10">
                            <thead>
                                <tr className="bg-koreaBlue rounded-lg ">
                                    <th className="shadow-y-md  text-white p-3 md:text-lg text-sm">No</th>
                                    <th className="shadow-y-md  text-white p-3 md:text-lg text-sm">Hari</th>
                                    <th className="shadow-y-md  text-white p-3 md:text-lg text-sm">Tanggal test</th>
                                    <th className="shadow-y-md  text-white p-3 md:text-lg text-sm">Status</th>
                                    <th className="shadow-y-md  text-white p-3 md:text-lg text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jadwal.map((v, i) => {
                                    return <tr key={i}>
                                        <td className="p-3 md:text-lg text-sm text-center">{i + 1}</td>
                                        <td className="p-3 md:text-lg text-sm text-center">{v.hari}</td>
                                        <td className="p-3 md:text-lg text-sm text-center">{`${v.tanggal} ${v.bulan} ${v.tahun}`}</td>
                                        <td className="p-3 md:text-lg text-sm text-center">Terdaftar</td>
                                        <td className="p-3 md:text-lg text-sm text-center"><div className="cursor-pointer px-2 py-1 rounded-lg bg-blue-400 w-[70px] m-auto text-white pointer" onClick={(e) => { window.location.href = "/personal/" + v._id }}>detail</div></td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <CustomFooter />
        </>
    );
}