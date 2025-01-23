"use client"
import CustomFooter from "@/components/CustomFooter"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import { useState } from "react"

export default function Aboutus() {
    const [active, setActive] = useState(true)
  
    const [active3, setActive3] = useState(true)
    return (
        <>
            <Navbar />
            <div className="md:w-[85%] w-[90%] m-auto">
                {/* hero section */}
                <div className="">
                    <h1 className="md:text-4xl text-2xl mt-10 font-bold">Greetings from coordinator LUPIC</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>

                {/* pc */}
                <div className="flex justify-center md:block hidden">
                    <div className=" flex justify-center relative w-[95%] mt-24">
                        <div className="w-80 relative h-40 bg-koreaBlue z-20 left-[85px] top-[200px] rounded-bl-3xl">
                        </div>
                        <div className="w-[1500px] h-[300px] relative bg-gradient-to-b from-koreaRed to-black z-30 rounded-2xl flex justify-between items-center text-white">
                            <Image className="w-[300px] h-[250px] md:ml-10 rounded-lg" src={"/images/HeroAboutUs.jpg"} alt="foto" width={500} height={500} />
                            <div className="px-5">
                                <p className=" text-justify w-[95%]">I am pleased to welcome you as the Director of the LUPIC program. It is with great excitement that I announce the launch of our new website, serving as a platform for collaboration and communication between Sogang University and Indonesian universities</p>
                                <h3 className="font-bold md:text-xl text-base mt-5 mb-2">Prof. Wonkoo Lee</h3>
                                <p className="text-xs">Department of Chemistry, Sogang University
                                    Seoul, Korea</p>
                            </div>
                        </div>
                        <div className="w-80 h-40 relative bg-koreaBlue z-10 right-[85px] bottom-[50px] rounded-tr-3xl">
                        </div>
                    </div>
                </div>
                {/* mobile */}
                <div className="flex justify-center md:hidden block w-[100%]">
                    <div className="w-80 h-28 relative bg-koreaBlue z-20 left-[20px] top-[380px] rounded-bl-3xl">
                    </div>
                    <div className="w-[3000px] h-full  bg-gradient-to-b from-koreaRed to-black z-30 rounded-2xl  text-white mt-10 mauto">
                        <div className="w-full pt-5">
                            <Image className="w-[80%] h-[200px] m-auto rounded-lg" src={"/images/HeroAboutUs.jpg"} alt="foto" width={500} height={500} />
                        </div>
                        <div className="px-5 ">
                            <h3 className="font-bold text-sm mt-5 mb-2">Prof. Wonkoo Lee</h3>
                            <p className="text-xs">Department of Chemistry, Sogang University
                                Seoul, Korea</p>

                            <p className="text-xs text-justify w-[100%] mt-5 pb-5">I am pleased to welcome you as the Director of the LUPIC program. It is with great excitement that I announce the launch of our new website, serving as a platform for collaboration and communication between Sogang University and Indonesian universities</p>

                        </div>
                    </div>
                    <div className="w-80 h-28 relative bg-koreaBlue z-10 right-[14px] bottom-[-20px] rounded-tr-3xl">
                    </div>
                </div>

                {/* history */}
                <div className=" mt-24 mb-2">
                    <h1 className="md:text-4xl text-2xl mt-10 font-bold">Short History</h1>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>
                <div className="">
                    <p className="text-justify md:text-xl text-base mt-5">
                        Leading University for International Cooperation (LUPIC) program began in 2012. The program aims to assist universities in developing countries to create, reorganize and systematically train human resources using the excellent resources and experiences from Korean universities. Through this program with the support from the Ministry of Education (MOE) of Korea, more than 41 universities in 18 developing countries had the opportunities to strengthen their educational capabilities and develop their communities (as of 2023).
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        The LUPIC program, supported by the Korean government, aims to assist universities in developing countries by fostering academic exchange, promoting development, and encouraging international collaboration. This website will play a crucial role in achieving our goals, enhancing cooperation between Korean and Indonesian universities.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Through the new website, you can easily find information about our program, participate in various collaborative projects and activities, and engage in effective communication. We look forward to the continued and strengthened collaboration between Sogang University and Indonesian universities.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Thank you.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Prof. Wonkoo Lee
                    </p>
                    <p className="text-justify md:text-xl text-base">
                        Department of Chemistry Sogang University
                    </p>
                    <p className="text-justify md:text-xl text-base">
                        Seoul, Korea
                    </p>
                </div>
                {/* history */}
                <div className=" mt-14">
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
                        There are 30 departments within 8 colleges in the undergraduate program with 8,000 students and 408 full-time, tenure-track professors. There are 12 graduate schools including professional and special graduate schools with a student enrollment of 4,000 in master's and doctoral programs. Approximately 5,100 foreign students study annually at Sogang University in various academic programs.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Recognized for its high standard of education, Sogang University boasts the highest employment rate with major corporations in Korea with over 40,000 alumni working in influential positions in various areas of society.
                    </p>
                    <p className="text-justify md:text-xl text-base mt-5">
                        Sogang particularly strives to offer the best educational environment for our domestic and international students in order to make their stay at Sogang as seamless and memorable as possible.
                    </p>
                </div>
                {/* Partner */}
                <div className=" mt-14">
                    <h3 className="md:text-4xl text-2xl mt-10 font-bold">Partner University</h3>
                    <div className="h-1 w-36 bg-koreaRed md:mt-5 mt-2"></div>
                </div>
                <div className="mt-5">
                    <Image className="m-auto" src={"/images/partner.png"} alt="foto" width={1100} height={300} />

                    <div className="mt-10">
                        <div>
                            <div className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer" onClick={(e) => { setActive(!active) }}>
                                <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-28 h-20 w-20 flex items-center">
                                    <Image className="rounded-full m-auto md:h-24 md:w-28 h-20 w-20" src={"/images/logoAbout/upi.jpg"} width={95} height={95} alt="foto" />
                                </div>
                                <h3 className="md:w-full w-[50%] md:text-xl text-xs font-bold text-white text-center">UNIVERSITAS PENDIDIKAN INDONESIA</h3>
                                <button className="md:mr-10 mr-5" onClick={(e) => { setActive(!active) }}>
                                    <Image className={active ? "" : "rotate-180"} src={"/images/logoAbout/white-up.svg"} width={30} height={30} alt="foto" />
                                </button>
                                
                            </div>
                            <div className={`w-[85%] m-auto ${active ? 'hidden' : 'block'}`}>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    The forerunner of the Department of Chemistry Education at FPMIPA IKIP Bandung was the Department of Natural Sciences at the Teacher Education College (PTPG) which was born in 1954. In connection with the change of PTPG's status to the Faculty of Teacher Training and Education (FKIP) at Padjadjaran University (UNPAD), for six years since In 1957, this department became part of UNPAD.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1963 FKIP UNPAD changed its status to IKIP Bandung in accordance with Presidential Decree No. 1 of 1963. Since then the chemistry education department has become one of the departments within the Faculty of Teacher Training and Exact Sciences (FKIE) IKIP Bandung, at that time it was called the Department of Chemistry.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1983 the Ministry of Education and Culture held a reorganization of state universities, since then the name FKIE changed to FPMIPA and the name Chemistry Education Department began to be used. Before 1983, the educational programs organized by the Department of Chemistry Education included the baccalaureate level with a program duration of 6 semesters and the undergraduate level with a program duration of 4 semesters as a continuation of the baccalaureate level. From 1979 to 1992 the Department of Chemistry Education held two types of educational programs, namely the undergraduate program (S1) with a program duration of 8 semesters and the Diploma III Program with a program duration of 6 semesters.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    Starting in 1993, the Department of Chemistry Education only provided undergraduate programs. However, the Department of Chemistry Education still holds lectures and practicums for several chemistry courses offered to D3 Science Middle School students and S1 Programs for PGSD Science lecturers. Starting in 1994, the Department of Chemistry Education, in addition to organizing regular undergraduate programs, also held lectures and practicums for several chemistry courses in S1 Science PGSD and D3 PGSMF (a collaboration between the Ministry of Health and IKIP Bandung). The existence of the FPMIPA IKIP Bandung Chemistry Education Department was strengthened by the Decree of the Director General of Higher Education Number 243/DIKTI/Kep/1996 dated 11 July 1996.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1999 IKIP Bandung changed its name to the Indonesian Education University (UPI) and became UPI a State-Owned Legal Entity (BHMN) in 2004. Evaluation and verification of the National Accreditation Board (BAN) for Higher Education, Ministry of Education and Culture in 1998 (Number 001/BAN-PT /Ak-1/VIII/1998) states that the Department of Chemistry Education is accredited A. In line with the expansion of its mandate (wider mandate), in the 1998 academic year the Department of Chemistry Education opened a Chemistry Study Program with the Decree of the Director General of DIKTI No. 910 of 1998. Existence of the Study Program Chemistry Education and the Chemistry Study Program in the Department of Chemistry Education are developed with the principle of cross fertilization, which will mutually strengthen each other.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    The Department of Chemistry Education has 45 lecturers and each year accepts an average of 80 students from the Chemistry Education Study Program and 40 students from the Chemistry Study Program who are recruited through SNMPTN (invitation and writing), as well as UM-UPI. During its journey, the Department of Chemistry Education was led by Ir. Lie Tiong Djien (deceased) was the first, followed by Dr. Ir. Lim Tik Liem (late), Dr. Rahmat Wiradinata, M.Sc., Prof. Dr. Ratna Wilis Dahar, M.Sc., Drs. Didi Kuswadi, Dra. Djuariah AS, Drs. Soeroso Martodimedjo, Dra. Nuraini Syarifuddin, Drs. Iyon Kertawidjaya, M.Pd., Drs. Harry Firman, M.Pd, Drs. Momo Rosbiono, M.Pd., M.Sc., Dr. Sumar Hendayana, M.Sc., Drs. Rahmat Setiadi, M.Sc., Prof. Dr. Anna Permanasari, M.Si., Dr. Ijang Rohman, M.Si., Dr. Ahmad Mudzakir, M.Sc., and now led by Dr. Hendrawan, M.Sc.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    Currently, since August 2023, the name of Department was deleted and changed to study program. So, there are two study program: Chemistry Education Study Program, lead by Dr. Wiji, M.Si, and Chemistry Study Program, lead by Prof. Dr. Fitri Khoerunnisa, M.Si. Website link:https://kimia.upi.edu/
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-10">
                            <div className="flex justify-between items-center w-full h-20 m-auto bg-koreaBlue rounded-[50px] hover:cursor-pointer" onClick={(e) => { setActive3(!active3) }}>
                                <div className="bg-gradient-to-b from-koreaBlue to-black rounded-full md:h-24 md:w-28 h-20 w-20 flex items-center">
                                    <Image className="rounded-full m-auto md:h-24 md:w-28 h-20 w-20" src={"/images/logoAbout/upi.jpg"} width={95} height={95} alt="foto" />
                                </div>
                                <h3 className="md:w-full w-[50%] md:text-xl text-xs font-bold text-white text-center">UNIVERSITAS PENDIDIKAN INDONESIA Bandung Raya Bogor </h3>
                                <button className="md:mr-10 mr-5" onClick={(e) => { setActive3(!active3) }}>
                                    <Image className={active3 ? "" : "rotate-180"} src={"/images/logoAbout/white-up.svg"} width={30} height={30} alt="foto" />
                                </button>
                            </div>
                            <div className={`w-[85%] m-auto ${active3 ? 'hidden' : 'block'}`}>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    The forerunner of the Department of Chemistry Education at FPMIPA IKIP Bandung was the Department of Natural Sciences at the Teacher Education College (PTPG) which was born in 1954. In connection with the change of PTPG's status to the Faculty of Teacher Training and Education (FKIP) at Padjadjaran University (UNPAD), for six years since In 1957, this department became part of UNPAD.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1963 FKIP UNPAD changed its status to IKIP Bandung in accordance with Presidential Decree No. 1 of 1963. Since then the chemistry education department has become one of the departments within the Faculty of Teacher Training and Exact Sciences (FKIE) IKIP Bandung, at that time it was called the Department of Chemistry.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1983 the Ministry of Education and Culture held a reorganization of state universities, since then the name FKIE changed to FPMIPA and the name Chemistry Education Department began to be used. Before 1983, the educational programs organized by the Department of Chemistry Education included the baccalaureate level with a program duration of 6 semesters and the undergraduate level with a program duration of 4 semesters as a continuation of the baccalaureate level. From 1979 to 1992 the Department of Chemistry Education held two types of educational programs, namely the undergraduate program (S1) with a program duration of 8 semesters and the Diploma III Program with a program duration of 6 semesters.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    Starting in 1993, the Department of Chemistry Education only provided undergraduate programs. However, the Department of Chemistry Education still holds lectures and practicums for several chemistry courses offered to D3 Science Middle School students and S1 Programs for PGSD Science lecturers. Starting in 1994, the Department of Chemistry Education, in addition to organizing regular undergraduate programs, also held lectures and practicums for several chemistry courses in S1 Science PGSD and D3 PGSMF (a collaboration between the Ministry of Health and IKIP Bandung). The existence of the FPMIPA IKIP Bandung Chemistry Education Department was strengthened by the Decree of the Director General of Higher Education Number 243/DIKTI/Kep/1996 dated 11 July 1996.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    In 1999 IKIP Bandung changed its name to the Indonesian Education University (UPI) and became UPI a State-Owned Legal Entity (BHMN) in 2004. Evaluation and verification of the National Accreditation Board (BAN) for Higher Education, Ministry of Education and Culture in 1998 (Number 001/BAN-PT /Ak-1/VIII/1998) states that the Department of Chemistry Education is accredited A. In line with the expansion of its mandate (wider mandate), in the 1998 academic year the Department of Chemistry Education opened a Chemistry Study Program with the Decree of the Director General of DIKTI No. 910 of 1998. Existence of the Study Program Chemistry Education and the Chemistry Study Program in the Department of Chemistry Education are developed with the principle of cross fertilization, which will mutually strengthen each other.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    The Department of Chemistry Education has 45 lecturers and each year accepts an average of 80 students from the Chemistry Education Study Program and 40 students from the Chemistry Study Program who are recruited through SNMPTN (invitation and writing), as well as UM-UPI. During its journey, the Department of Chemistry Education was led by Ir. Lie Tiong Djien (deceased) was the first, followed by Dr. Ir. Lim Tik Liem (late), Dr. Rahmat Wiradinata, M.Sc., Prof. Dr. Ratna Wilis Dahar, M.Sc., Drs. Didi Kuswadi, Dra. Djuariah AS, Drs. Soeroso Martodimedjo, Dra. Nuraini Syarifuddin, Drs. Iyon Kertawidjaya, M.Pd., Drs. Harry Firman, M.Pd, Drs. Momo Rosbiono, M.Pd., M.Sc., Dr. Sumar Hendayana, M.Sc., Drs. Rahmat Setiadi, M.Sc., Prof. Dr. Anna Permanasari, M.Si., Dr. Ijang Rohman, M.Si., Dr. Ahmad Mudzakir, M.Sc., and now led by Dr. Hendrawan, M.Sc.
                                </p>
                                <p className="text-justify md:text-xl text-base mt-5">
                                    Currently, since August 2023, the name of Department was deleted and changed to study program. So, there are two study program: Chemistry Education Study Program, lead by Dr. Wiji, M.Si, and Chemistry Study Program, lead by Prof. Dr. Fitri Khoerunnisa, M.Si. Website link:https://kimia.upi.edu/
                                </p>
                            </div>
                        </div>

                    </div>
                    {/* Partner */}
                    <div className=" text-center m-auto pt-10">
                        <h3 className="md:text-4xl text-2xl mt-10 font-bold">Collaboration With</h3>
                        <div className="h-1 w-36 bg-koreaRed mt-5 m-auto"></div>
                    </div>
                    <div className="m-auto flex justify-center items-center mt-10 mb-28">
                        <Image className={"shadow-lg md:mr-10 mr-5"} src={"/images/bendera/indonesia.png"} width={280} height={180} alt="foto" />
                        <Image className={"shadow-lg"} src={"/images/bendera/korea.png"} width={280} height={180} alt="foto" />
                    </div>
                </div>
            </div>
            <CustomFooter />
        </>
    )
}