import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function detailNews({ params }: any) {
    const id = params.id;
    return (
        <>
            <Navbar />
            <a href="/news" className="text-koreaRed relative md:top-[40px] md:left-[60px] top-[20px] left-[30px] md:text-xl text-lg">Kembali &rarr;</a>
            <div className="w-full m-auto text-center">
                <div className="md:w-[75%] w-[90%] text-center m-auto md:pt-8 pt-2 text-center">
                    <h3 className="md:text-4xl text-xl mt-10 font-bold text-koreaBlue">Collaboration With Collaboration With Collaboration With Collaboration With Collaboration </h3>
                </div>
                <p className="my-1 md:text-lg text-sm"> Author : Luthfi Khaeri Ihsan</p>
                <p className="mb-4 text-sm text-koreaBlueMuda">29 januari 2025</p>
                <div className="md:w-full w-[90%] h-[45%] m-auto flex justify-center">
                    <Image src={"/images/poster.jpg"} alt="foto" width={600} height={300} className="md:w-[1000px] md:h-[500px] w-full" />
                </div>
                <p className="mt-8 m-auto md:text-xl text-lg w-[80%] text-justify">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque eius eaque, rem molestias hic at! Qui a voluptatibus dolorem dolorum veniam optio suscipit totam, earum soluta? Ad a optio similique. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque eius eaque, rem molestias hic at! Qui a voluptatibus dolorem dolorum veniam optio suscipit totam, earum soluta? Ad a optio similique.
                </p>
                {/* looping */}
                <div className="mb-16">
                    <div className="mt-8 m-auto text-xl w-[80%] text-justify">
                        <div className="md:w-[50%] w-[90%]">
                            <h4 className="font-bold text-white text-xl text-center bg-koreaBlueMuda px-3 py-2 mb-4 inline-block">Kesalahan yang pertama</h4>
                        </div>
                        <p className="md:text-xl text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni deleniti nemo dicta, officiis nihil necessitatibus laboriosam eum aut recusandae distinctio magnam voluptatem fugiat sint odit quod. Nesciunt quis placeat laborum nihil. Accusamus, minima deserunt ducimus aut corporis quasi cumque magni rerum ea voluptate sequi animi doloremque alias odio at doloribus?</p>
                        <div className="w-full mt-5 flex flex-wrap">
                            <Image className="w-[60%] mb-4" src={'/images/poster.jpg'} alt="foto" width={600} height={600} />
                        </div>
                    </div>

                </div>

            </div>
            <CustomFooter />
        </>
    )
}