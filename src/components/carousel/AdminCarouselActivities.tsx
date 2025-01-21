import Image from "next/image"

export default function AdminCarouselActivities() {
    return (
        <div className="border-2 w-[90%] m-auto">
            <table className="border-2 w-full m-auto">
                <tbody >
                    <tr className="text-xl text-center">
                        <td className="font-bold px-3">
                            TES 123 CEK CEK TES dolor sit amet consectetur, adipisicing elit.
                        </td>
                        <td rowSpan={2}>
                            <Image src={"/images/poster.jpg"} alt="foto" width={400} height={200} />
                        </td>
                    </tr>
                    <tr className="text-xl text-center px-3">
                        <td>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, esse.
                            amet consectetur, adipisicing e
                            amet consectetur, adipisicing e
                        </td>
                    </tr>
                    <tr>
                        <td><button className="w-20 p-3" onClick={(e) => { alert("hapus") }}>
                            <p className="text-sm text-white bg-koreaRed p-2 rounded-2xl">Delete</p>
                        </button></td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}