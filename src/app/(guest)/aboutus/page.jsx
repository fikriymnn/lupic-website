"use client"
import CustomFooter from "@/components/CustomFooter"
import Navbar from "@/components/Navbar"
import axios from "axios"
import Image from "next/image"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

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

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

          {/* ── Greetings Section ── */}
          <section className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mb-10 space-y-3">
                <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                  Message
                </span>
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                  Greetings from{" "}
                  <em className="not-italic font-semibold">Coordinator LUPIC</em>
                </h2>
              </div>

              {/* Desktop */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="justify-center md:flex hidden"
              >
                <div className="flex justify-center relative w-[95%] mt-24">
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-80 relative h-40 bg-koreaBlue z-20 left-[85px] top-[200px] rounded-bl-3xl"
                  />
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
                      <p className="text-justify text-sm w-[95%]">{data.pesan}</p>
                      <h3 className="font-bold text-base mt-4 mb-1">{data.nama}</h3>
                      <p className="text-xs text-white/70">{data.deskripsi}</p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-80 h-40 relative bg-koreaBlue z-10 right-[85px] bottom-[50px] rounded-tr-3xl"
                  />
                </div>
              </motion.div>

              {/* Mobile */}
              <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="flex justify-center md:hidden w-full"
              >
                <div className="w-80 h-28 relative bg-koreaBlue z-20 left-[20px] top-[380px] rounded-bl-3xl" />
                <div className="w-[3000px] h-full bg-gradient-to-b from-koreaRed to-black z-30 rounded-2xl text-white mt-10">
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
                    <h3 className="font-bold text-sm mt-4 mb-1">{data.nama}</h3>
                    <p className="text-xs text-white/70">{data.deskripsi}</p>
                    <p className="text-xs text-justify w-full mt-4 pb-5">{data.pesan}</p>
                  </div>
                </div>
                <div className="w-80 h-28 relative bg-koreaBlue z-10 right-[14px] bottom-[-20px] rounded-tr-3xl" />
              </motion.div>
            </motion.div>
          </section>

          {/* ── Short History ── */}
          <section ref={ref} className="py-16 md:py-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <div className="mb-10 space-y-3">
                <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                  Background
                </span>
                <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                  Short{" "}
                  <em className="not-italic font-semibold">History</em>
                </h2>
              </div>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p className="text-justify">
                  Leading University for International Cooperation (LUPIC) program began in 2012. The program aims to assist universities in developing countries to create, reorganize and systematically train human resources using the excellent resources and experiences from Korean universities. Through this program with the support from the Ministry of Education (MOE) of Korea, more than 41 universities in 18 developing countries had the opportunities to strengthen their educational capabilities and develop their communities (as of 2023).
                </p>
                <p className="text-justify">
                  The LUPIC program, supported by the Korean government, aims to assist universities in developing countries by fostering academic exchange, promoting development, and encouraging international collaboration. This website will play a crucial role in achieving our goals, enhancing cooperation between Korean and Indonesian universities.
                </p>
                <p className="text-justify">
                  Through the new website, you can easily find information about our program, participate in various collaborative projects and activities, and engage in effective communication. We look forward to the continued and strengthened collaboration between Sogang University and Indonesian universities.
                </p>
                <p>Thank you.</p>
                <p className="font-semibold text-gray-900">{data.nama}</p>
                <p className="text-gray-500">{data.deskripsi}</p>
              </div>
            </motion.div>
          </section>

          {/* ── Sogang University ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                About
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Sogang{" "}
                <em className="not-italic font-semibold">University</em>
              </h2>
            </div>
            <div className="space-y-4">
              <Image className="m-auto" src="/images/sogang.png" alt="Sogang University" width={150} height={150} />
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p className="text-justify">
                  Sogang University aims the education of the whole person with love and faith, respect the values on the sense of human dignity and encourage to pursuit and seek for learning with the sincere quest for truth. Through this education, educate the talents who will devote their lives to the development of a humanistic culture and community.
                </p>
                <p className="text-justify">
                  Located in the heart of Seoul, Sogang University was founded by the Society of Jesus in 1960. Since its foundation, Sogang has grown onto one of the most prestigious universities in Korea. Sogang seeks scholastic excellence by providing world-class education through its outstanding faculty, state-of-the art research, quality educational programs, and rigorous academic management system based on the Jesuit educational philosophy.
                </p>
                <p className="text-justify">
                  There are 30 departments within 8 colleges in the undergraduate program with 8,000 students and 408 full-time, tenure-track professors. There are 12 graduate schools including professional and special graduate schools with a student enrollment of 4,000 in master s and doctoral programs. Approximately 5,100 foreign students study annually at Sogang University in various academic programs.
                </p>
                <p className="text-justify">
                  Recognized for its high standard of education, Sogang University boasts the highest employment rate with major corporations in Korea with over 40,000 alumni working in influential positions in various areas of society.
                </p>
                <p className="text-justify">
                  Sogang particularly strives to offer the best educational environment for our domestic and international students in order to make their stay at Sogang as seamless and memorable as possible.
                </p>
              </div>
            </div>
          </section>

          {/* ── Partner University ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Network
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Partner{" "}
                <em className="not-italic font-semibold">University</em>
              </h2>
            </div>

            {data.partnerBanner?.gambar && (
              <Image
                className="mx-auto rounded-lg"
                src={process.env.NEXT_PUBLIC_API_FILE_URL + data.partnerBanner.gambar}
                alt="Partner Banner"
                width={1100}
                height={300}
              />
            )}

            <div className="mt-10 space-y-4">
              {data.partner && data.partner.length > 0 ? (
                data.partner.map((partner, index) => (
                  <div key={partner._id || index}>
                    <div
                      className="flex justify-between items-center w-full h-20 bg-koreaBlue rounded-[50px] hover:cursor-pointer hover:shadow-lg transition-all duration-200"
                      onClick={() => togglePartner(partner._id || index.toString())}
                    >
                      <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-28 h-20 w-20 flex items-center shrink-0">
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
                      <h3 className="flex-1 text-xs md:text-base font-semibold text-white text-center px-3">
                        {partner.nama}
                      </h3>
                      <button className="md:mr-10 mr-5 shrink-0">
                        <Image
                          className={`transition-transform duration-300 ${
                            activePartners[partner._id || index.toString()] ? "rotate-180" : ""
                          }`}
                          src="/images/logoAbout/white-up.svg"
                          width={24}
                          height={24}
                          alt="toggle"
                        />
                      </button>
                    </div>
                    <div
                      className={`w-[90%] mx-auto transition-all duration-300 overflow-hidden ${
                        activePartners[partner._id || index.toString()] ? "max-h-full opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {partner.deskripsi && (
                        <div className="text-sm text-gray-700 leading-relaxed mt-4 space-y-3">
                          {partner.deskripsi.split("\n").map((line, lineIndex) => (
                            <p key={lineIndex} className="text-justify">{line}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-400 py-10">No partners available</p>
              )}
            </div>
          </section>

          {/* ── Collaboration ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3 text-center">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Together
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Collaboration{" "}
                <em className="not-italic font-semibold">With</em>
              </h2>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-5">
              {data.collaboration && data.collaboration.length > 0 ? (
                data.collaboration.map((collab, index) => (
                  <motion.div
                    key={collab._id || index}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.25 }}
                  >
                    {collab.gambar && (
                      <Image
                        className="shadow-md rounded-lg"
                        src={process.env.NEXT_PUBLIC_API_FILE_URL + collab.gambar}
                        width={280}
                        height={180}
                        alt={collab.nama || "Collaboration"}
                      />
                    )}
                  </motion.div>
                ))
              ) : (
                <p className="text-sm text-gray-400">No collaborations available</p>
              )}
            </div>
          </section>

        </div>
      </main>

      <CustomFooter />
    </>
  )
}