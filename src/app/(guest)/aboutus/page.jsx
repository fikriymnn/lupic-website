"use client"
import CustomFooter from "@/components/CustomFooter"
import Navbar from "@/components/Navbar"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Aboutus() {
    const [activePartners, setActivePartners] = useState({})
    const [data, setData] = useState({
        gambar: "",
        pesan: "",
        deskripsi: "",
        nama: "",
        partnerBanner: { gambar: "" },
        partner: [],
        collaboration: []
    })

    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

    useEffect(() => {
        async function getData() {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/aboutus")
                if (response.data) {
                    setData({
                        gambar: response.data.gambar || "",
                        pesan: response.data.pesan || "",
                        deskripsi: response.data.deskripsi || "",
                        nama: response.data.nama || "",
                        partnerBanner: response.data.partnerBanner || { gambar: "" },
                        partner: response.data.partner || [],
                        collaboration: response.data.collaboration || []
                    })
                }
            } catch (err) {
                console.error("Error fetching data:", err)
            }
        }
        getData()
    }, [])

    const togglePartner = (partnerId) => {
        setActivePartners((prev) => ({
            ...prev,
            [partnerId]: !prev[partnerId]
        }))
    }

    return (
        <>
            <Navbar />
            <div className="max-w-6xl md:px-8 px-4 m-auto pt-16">
                {/* hero section */}
                <div>
                    <h1 className="md:text-4xl text-2xl mt-10 font-bold">Greetings from coordinator LUPIC</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>

                {/* pc */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="flex justify-center md:block hidden"
                >
                    <div className="flex justify-center relative w-[95%] mt-24">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-80 relative h-40 bg-koreaBlue z-20 left-[85px] top-[200px] rounded-bl-3xl"
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-[1500px] h-[300px] relative bg-gradient-to-b from-koreaRed to-black z-30 rounded-2xl flex justify-start items-center text-white"
                        >
                            {data.gambar && (
                                <Image
                                    className="w-[300px] h-[250px] md:ml-10 rounded-lg object-cover"
                                    src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar}
                                    alt="foto"
                                    width={500}
                                    height={500}
                                />
                            )}
                            <div className="px-5">
                                <p className="text-justify w-[95%]">{data.pesan}</p>
                                <h3 className="font-bold md:text-xl text-base mt-5 mb-2">{data.nama}</h3>
                                <p className="text-xs">{data.deskripsi}</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="w-80 h-40 relative bg-koreaBlue z-10 right-[85px] bottom-[50px] rounded-tr-3xl"
                        ></motion.div>
                    </div>
                </motion.div>

                {/* mobile */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center md:hidden block w-[100%]"
                >
                    <div className="w-80 h-28 relative bg-koreaBlue z-20 left-[20px] top-[380px] rounded-bl-3xl"></div>
                    <div className="w-[3000px] h-full bg-gradient-to-b from-koreaRed to-black z-30 rounded-2xl text-white mt-10 mauto">
                        <div className="w-full pt-5">
                            {data.gambar && (
                                <Image
                                    className="w-[80%] h-[200px] m-auto rounded-lg object-cover"
                                    src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar}
                                    alt="foto"
                                    width={500}
                                    height={500}
                                />
                            )}
                        </div>
                        <div className="px-5">
                            <h3 className="font-bold text-sm mt-5 mb-2">{data.nama}</h3>
                            <p className="text-xs">{data.deskripsi}</p>
                            <p className="text-xs text-justify w-[100%] mt-5 pb-5">{data.pesan}</p>
                        </div>
                    </div>
                    <div className="w-80 h-28 relative bg-koreaBlue z-10 right-[14px] bottom-[-20px] rounded-tr-3xl"></div>
                </motion.div>

                {/* history */}
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    className="mt-24 mb-2"
                >
                    <h1 className="md:text-4xl text-2xl mt-10 font-bold">Short History</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </motion.div>
                <motion.div
                    ref={ref}
                    className=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: inView ? 1 : 0 }}
                    transition={{ duration: 1 }}
                >
                    <p className="text-justify md:text-xl text-base mt-5">
                        Leading University for International Cooperation (LUPIC) program began in 2012. The program aims to assist universities in developing countries to create, reorganize and systematically train human resources using the excellent resources and experiences from Korean universities. Through this program with the support from the Ministry of Education (MOE) of Korea, more than 41 universities in 18 developing countries had the opportunities to strengthen their educational capabilities and develop their communities (as of 2023).
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        The LUPIC program, supported by the Korean government, aims to assist universities in developing countries by fostering academic exchange, promoting development, and encouraging international collaboration. This website will play a crucial role in achieving our goals, enhancing cooperation between Korean and Indonesian universities.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Through the new website, you can easily find information about our program, participate in various collaborative projects and activities, and engage in effective communication. We look forward to the continued and strengthened collaboration between Sogang University and Indonesian universities.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">Thank you.</p>
                    <p className="text-justify md:text-xl text-base mt-5">{data.nama}</p>
                    <p className="text-justify md:text-xl text-base">{data.deskripsi}</p>
                </motion.div>

                {/* Sogang University */}
                <div className="mt-14">
                    <h3 className="md:text-4xl text-2xl mt-10 font-bold">Sogang University</h3>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>
                <div className="mt-3">
                    <Image className="m-auto" src={"/images/sogang.png"} alt="foto" width={150} height={150} />
                    <p className="text-justify md:text-xl text-base mt-5">
                        Sogang University aims the education of the whole person with love and faith, respect the values on the sense of human dignity and encourage to pursuit and seek for learning with the sincere quest for truth. Through this education, educate the talents who will devote their lives to the development of a humanistic culture and community.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Located in the heart of Seoul, Sogang University was founded by the Society of Jesus in 1960. Since its foundation, Sogang has grown onto one of the most prestigious universities in Korea. Sogang seeks scholastic excellence by providing world-class education through its outstanding faculty, state-of-the art research, quality educational programs, and rigorous academic management system based on the Jesuit educational philosophy.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        There are 30 departments within 8 colleges in the undergraduate program with 8,000 students and 408 full-time, tenure-track professors. There are 12 graduate schools including professional and special graduate schools with a student enrollment of 4,000 in master s and doctoral programs. Approximately 5,100 foreign students study annually at Sogang University in various academic programs.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Recognized for its high standard of education, Sogang University boasts the highest employment rate with major corporations in Korea with over 40,000 alumni working in influential positions in various areas of society.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Sogang particularly strives to offer the best educational environment for our domestic and international students in order to make their stay at Sogang as seamless and memorable as possible.
                    </p>
                </div>

                {/* Partner University */}
                <div className="mt-14">
                    <h3 className="md:text-4xl text-2xl mt-10 font-bold">Partner University</h3>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>
                <div className="mt-5">
                    {/* Partner Banner */}
                    {data.partnerBanner?.gambar && (
                        <Image
                            className="m-auto rounded-lg"
                            src={process.env.NEXT_PUBLIC_API_FILE_URL + data.partnerBanner.gambar}
                            alt="Partner Banner"
                            width={1100}
                            height={300}
                        />
                    )}

                    {/* Partners List */}
                    <div className="mt-10">
                        {data.partner && data.partner.length > 0 ? (
                            data.partner.map((partner, index) => (
                                <div key={partner._id || index} className="mt-10">
                                    <div
                                        className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer transition-all hover:shadow-lg"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            togglePartner(partner._id || index.toString())
                                        }}
                                    >
                                        <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-28 h-20 w-20 flex items-center">
                                            {partner.logo && (
                                                <Image
                                                    className="rounded-full m-auto md:h-24 md:w-28 h-20 w-20 object-cover"
                                                    src={process.env.NEXT_PUBLIC_API_FILE_URL + partner.logo}
                                                    width={95}
                                                    height={95}
                                                    alt={partner.nama || "Partner logo"}
                                                />
                                            )}
                                        </div>
                                        <h3 className="md:w-full w-[50%] md:text-xl text-xs font-bold text-white text-center">
                                            {partner.nama}
                                        </h3>
                                        <button
                                            className="md:mr-10 mr-5"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                togglePartner(partner._id || index.toString())
                                            }}
                                        >
                                            <Image
                                                className={`transition-transform duration-300 ${
                                                    !activePartners[partner._id || index.toString()] ? "" : "rotate-180"
                                                }`}
                                                src={"/images/logoAbout/white-up.svg"}
                                                width={30}
                                                height={30}
                                                alt="toggle"
                                            />
                                        </button>
                                    </div>
                                    <div
                                        className={`w-[85%] m-auto transition-all duration-300 overflow-hidden ${
                                            !activePartners[partner._id || index.toString()] ? "max-h-0 opacity-0" : "max-h-full opacity-100"
                                        }`}
                                    >
                                        {partner.deskripsi && (
                                            <div className="text-justify md:text-xl text-base mt-5">
                                                {partner.deskripsi.split('\n').map((line, lineIndex) => (
                                                    <p key={lineIndex} className={lineIndex > 0 ? "mt-3" : ""}>
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-10">No partners available</p>
                        )}
                    </div>

                    {/* Collaboration */}
                    <div className="text-center m-auto pt-10">
                        <h3 className="md:text-4xl text-2xl mt-10 font-bold">Collaboration With</h3>
                        <div className="h-1 w-36 bg-koreaRed mt-5 m-auto"></div>
                    </div>
                    <div className="m-auto flex justify-center items-center mt-10 mb-28 flex-wrap gap-5">
                        {data.collaboration && data.collaboration.length > 0 ? (
                            data.collaboration.map((collab, index) => (
                                <div key={collab._id || index} className="transition-transform hover:scale-105">
                                    {collab.gambar && (
                                        <Image
                                            className="shadow-lg rounded-lg"
                                            src={process.env.NEXT_PUBLIC_API_FILE_URL + collab.gambar}
                                            width={280}
                                            height={180}
                                            alt={collab.nama || "Collaboration"}
                                        />
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">No collaborations available</p>
                        )}
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}