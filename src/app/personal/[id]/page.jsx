"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";

export default function detailPersonal() {
    const data = [
        { no: 1, tanggal: '16-4-2025', hari: 'Senin', status: 'Terdaftar' },
        { no: 2, tanggal: '21-4-2025', hari: 'Rabu', status: 'Terdaftar' },
    ];

    return (
        <>
        <Navbar/>
        <div className=" m-auto flex">
            <div className="shadow-md border-2 rounded-lg w-[50%] my-10 pb-16 m-auto">
                <h1 className="text-2xl mt-10 text-center font-bold">BUKTI PENDAFTARAN</h1>
                <div className="h-1 w-36 bg-koreaRed mt-4 mb-10 m-auto"></div>
                <br/>
                <table className="w-[70%] m-auto">
                    <tbody className="m-auto text-lg">
                    <tr><td className="py-3 font-bold">Nama lengkap</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">Tanggal lahir</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">No whatsapp</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">Email</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">Instansi</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">Tanggal mendaftar</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    <tr><td className="py-3 font-bold">Tanggal test</td><td className="py-3">: Luthfi Khaeri ihsan</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <CustomFooter/>
        </>
    );
}