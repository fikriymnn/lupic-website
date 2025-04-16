"use client"
import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";

export default function personal() {
    const data = [
        { no: 1, tanggal: '16-4-2025', hari: 'Senin', status: 'Terdaftar' },
        { no: 2, tanggal: '21-4-2025', hari: 'Rabu', status: 'Terdaftar' },
    ];

    return (
        <>
        <Navbar/>
        <div className="h-screen m-auto flex">
        <div className="bg-white shadow-lg p-6 w-[95%] mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center mt-[2%]">Daftar Registrasi Teacher Test</h2>
            <table className="border-collapse shadow-md mt-10 w-[95%] m-auto rounded-t ">
            <thead>
                <tr className="bg-koreaBlue rounded-lg ">
                    <th className="shadow-y-md  text-white p-3">No</th>
                    <th className="shadow-y-md  text-white p-3">Tanggal test</th>
                    <th className="shadow-y-md  text-white p-3">Hari</th>
                    <th className="shadow-y-md  text-white p-3">Status</th>
                    <th className="shadow-y-md  text-white p-3">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-3 text-center">1</td>
                    <td className="p-3 text-center">16-4-2025</td>
                    <td className="p-3 text-center">Senin</td>
                    <td className="p-3 text-center">Terdafar</td>
                    <td className="p-3 text-center"><div className="px-3 py-2 rounded-lg bg-blue-400 w-[50%] m-auto text-white pointer" onClick={(e)=>{console.log("sda")}}>detail</div></td>
                </tr>
                <tr>
                    <td className="p-3 text-center">2</td>
                    <td className="p-3 text-center">21-4-2025</td>
                    <td className="p-3 text-center">Rabu</td>
                    <td className="p-3 text-center">Selesai</td>
                    <td className="p-3 text-center"><div className="px-3 py-2 rounded-lg bg-blue-400 w-[50%] m-auto text-white pointer" onClick={(e)=>{console.log("sda")}}>detail</div></td>
                </tr>
            </tbody>
        </table>
        </div>
        </div>
        <CustomFooter/>
        </>
    );
}