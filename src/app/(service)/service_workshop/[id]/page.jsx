"use client"
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import parse from "html-react-parser";
import axios from "axios";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatTanggalIndonesia } from "@/utils/formatTanggal";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

// ─── Skeletons ────────────────────────────────────────────────────────────────

const HeaderSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-10 bg-gray-200 rounded-lg w-2/3" />
    <div className="h-4 bg-gray-200 rounded w-32" />
  </div>
);

const ImageSkeleton = () => (
  <div className="animate-pulse bg-gray-200 rounded-xl w-full h-[300px] md:h-[480px]" />
);

const ContentSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-3/4" />
  </div>
);

// ─── Meta Row ─────────────────────────────────────────────────────────────────

const MetaRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 text-sm">
    <div className="w-4 h-4 mt-0.5 shrink-0 text-koreaBlueMuda">{icon}</div>
    <span className="text-gray-500 w-20 shrink-0">{label}</span>
    <span className="text-gray-800 font-medium">{value}</span>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DetailEvent({ params }) {
  const { id } = use(params);
  const [data, setData] = useState({
    tanggal: "", judul: "", gambar: "", lokasi: "", waktu: "",
    jam: "", kategori: "", peserta: "", harga: "", content: "",
    sub_content: [{ sub_judul: "", sub_content: "", sub_gambar: [""] }]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const Data = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/event/${id}`);
        if (Data.data) setData(Data.data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-16">

          {/* Back Button */}
          <motion.a
            href="/service_workshop"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-koreaRed hover:text-koreaRed/70 transition-colors group mb-10"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Workshop</span>
          </motion.a>

          {loading ? (
            <div className="space-y-8">
              <HeaderSkeleton />
              <ImageSkeleton />
              <ContentSkeleton />
              <ContentSkeleton />
            </div>
          ) : (
            <motion.article
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Header */}
              <motion.header variants={fadeIn} className="space-y-2">
                <h1 className="text-2xl md:text-4xl font-bold text-koreaBlue leading-snug">
                  {data.judul}
                </h1>
                {data.tanggal && (
                  <p className="text-xs text-koreaBlueMuda">{formatTanggalIndonesia(data.tanggal)}</p>
                )}
              </motion.header>

              {/* Featured Image */}
              {data.gambar && (
                <motion.div variants={fadeIn} className="w-full overflow-hidden rounded-xl shadow-md">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${data.gambar}`}
                    alt={data.judul}
                    className="w-full h-[300px] md:h-[480px] object-cover"
                  />
                </motion.div>
              )}

              {/* Meta Info */}
              <motion.div
                variants={fadeIn}
                className="bg-gray-50 rounded-lg p-5 space-y-3"
              >
                {data.lokasi && (
                  <MetaRow
                    label="Lokasi"
                    value={data.lokasi}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  />
                )}
                {data.waktu && (
                  <MetaRow
                    label="Waktu"
                    value={data.waktu}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                  />
                )}
                {data.jam && (
                  <MetaRow
                    label="Jam"
                    value={data.jam}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  />
                )}
                {data.kategori && (
                  <MetaRow
                    label="Kategori"
                    value={data.kategori}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>}
                  />
                )}
                {data.peserta && (
                  <MetaRow
                    label="Peserta"
                    value={data.peserta}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  />
                )}
                {(data.harga || data.harga === "") && (
                  <MetaRow
                    label="Fee"
                    value={data.harga ? `IDR ${parseInt(data.harga).toLocaleString("id-ID")}` : "Coming Soon"}
                    icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  />
                )}
              </motion.div>

              {/* Main Content */}
              {data.content && (
                <motion.div
                  variants={fadeIn}
                  className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed"
                >
                  {parse(data.content)}
                </motion.div>
              )}

              {/* Sub Content */}
              {data.sub_content && data.sub_content.length > 0 && (
                <motion.div variants={staggerContainer} className="space-y-10">
                  {data.sub_content.map((v, i) => (
                    <motion.section key={i} variants={fadeIn} className="space-y-4">
                      <div className="border-t border-gray-200 pt-6" />

                      {v.sub_judul && (
                        <h2 className="inline-block text-base md:text-xl font-bold text-white bg-gradient-to-r from-koreaBlueMuda to-koreaBlue px-5 py-2.5 rounded-lg shadow-sm">
                          {v.sub_judul}
                        </h2>
                      )}

                      {v.sub_content && (
                        <div className="prose prose-sm md:prose-base max-w-none text-gray-800 leading-relaxed">
                          {parse(v.sub_content)}
                        </div>
                      )}

                      {v.sub_gambar && v.sub_gambar.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          {v.sub_gambar.map((w, u) =>
                            w && w !== "" ? (
                              <motion.div
                                key={u}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden rounded-lg shadow-md"
                              >
                                <img
                                  src={`${process.env.NEXT_PUBLIC_API_FILE_URL}${w}`}
                                  alt={`${v.sub_judul || "Image"} ${u + 1}`}
                                  className="w-full h-auto object-cover"
                                />
                              </motion.div>
                            ) : null
                          )}
                        </div>
                      )}
                    </motion.section>
                  ))}
                </motion.div>
              )}
            </motion.article>
          )}

        </div>
      </main>

      <CustomFooter />
    </>
  );
}