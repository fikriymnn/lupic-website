import Image from "next/image"

export default function AdminCarouselActivities(){
    return(
        <div className="border-2 w-[90%] m-auto">
            <table className="border-2 w-full m-auto">
                <tbody >
                    <tr className="text-xl text-center">
                        <td>
                        TES 123 CEK CEK TES
                        </td>
                        <td rowSpan={2}>
                            <Image src={"/images/poster.jpg"} alt="foto" width={400} height={200}/>
                        </td>
                    </tr>
                    <tr className="text-xl text-center">
                    <td>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, esse.
                        </td>
                     </tr>   
                    
                </tbody>
            </table>
        </div>
    )
}