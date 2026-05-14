"use client"
import { useEffect, useState } from "react"
import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CarouselActivities from "@/components/carousel/CarouselActivities"
import Image from "next/image"
import TableDataActivities from "@/components/table/TableDataActivities"
import InformationDropdown1 from "@/components/dropdown/information/InformationDropdown1"
import InformationDropdown2 from "@/components/dropdown/information/InformationDropdown2"
import InformationDropdown3 from "@/components/dropdown/information/InformationDropdown3"
import InformationDropdown4 from "@/components/dropdown/information/InformationDropdown4"
import axios from "axios"

// ─── Reusable Activity Table ──────────────────────────────────────────────────

const ActivityTable = ({ data, yearKey, label, active, onToggle }) => (
  <div>
    <p className="text-koreaRed text-xs font-semibold tracking-widest uppercase mt-2">
      {label}
    </p>
    <div
      className="flex justify-between items-center cursor-pointer mt-1"
      onClick={onToggle}
    >
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Activities</h2>
      <button onClick={(e) => { e.stopPropagation(); onToggle() }}>
        <Image
          className={`transition-transform duration-300 ${active ? "" : "rotate-180"}`}
          src="/images/logoAbout/up.svg"
          width={24}
          height={24}
          alt="toggle"
        />
      </button>
    </div>
    <div className="h-px w-full mt-3 bg-koreaRed mb-2" />

    <div className={`${active ? "hidden" : "block"} w-full`}>
      {/* Desktop Table */}
      <table className="w-full text-center mt-5 md:table hidden">
        <thead>
          <tr className="text-sm bg-koreaBlueMuda">
            <th className="py-3 w-[30rem]">NO</th>
            <th className="py-3 w-[200rem]">GOALS</th>
            <th className="py-3 w-[100rem]">UPI</th>
            <th className="py-3 w-[100rem]">UNNES</th>
            <th className="py-3 w-[100rem]">UNDIKSHA</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data && data.map((v, i) => {
            if (v[yearKey]?.upi || v[yearKey]?.unnes || v[yearKey]?.undiksha) {
              return (
                <TableDataActivities
                  key={i}
                  point={v.point}
                  sub_point={v.sub_point}
                  sub_sub_point={v.sub_sub_point}
                  text={v.text}
                  upi={v[yearKey]?.upi || ""}
                  unnes={v[yearKey]?.unnes}
                  undiksha={v[yearKey]?.undiksha}
                />
              )
            }
          })}
        </tbody>
      </table>

      {/* Mobile Table */}
      <div className="w-full overflow-x-auto md:hidden block">
        <table className="w-[550px] text-center mt-5">
          <thead>
            <tr className="text-sm bg-koreaBlueMuda shadow-sm">
              <th className="py-3 w-[30rem]">NO</th>
              <th className="py-3 w-[200rem]">GOALS</th>
              <th className="py-3 w-[100rem]">UPI</th>
              <th className="py-3 w-[100rem]">UNNES</th>
              <th className="py-3 w-[100rem]">UNDIKSHA</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {data && data.map((v, i) => {
              if (v[yearKey]?.upi || v[yearKey]?.unnes || v[yearKey]?.undiksha) {
                return (
                  <TableDataActivities
                    key={i}
                    point={v.point}
                    sub_point={v.sub_point}
                    sub_sub_point={v.sub_sub_point}
                    text={v.text}
                    upi={v[yearKey]?.upi || ""}
                    unnes={v[yearKey]?.unnes}
                    undiksha={v[yearKey]?.undiksha}
                  />
                )
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Activities() {
  const [active, setActive] = useState(true)
  const [active2, setActive2] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      try {
        const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/activity_goals")
        if (Data.data) setData(Data.data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">

          {/* ── Our Goals ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Our Vision
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Our{" "}
                <em className="not-italic font-semibold">Goals</em>
              </h2>
            </div>
            <CarouselActivities />
          </section>

          {/* ── Information Dropdowns ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Details
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                More{" "}
                <em className="not-italic font-semibold">Information</em>
              </h2>
            </div>
            <div className="space-y-6">
              <InformationDropdown1 />
              <InformationDropdown2 />
              <InformationDropdown3 />
              <InformationDropdown4 />
            </div>
          </section>

          {/* ── Activities Tables ── */}
          <section className="py-16 md:py-24">
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Progress
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Year-by-Year{" "}
                <em className="not-italic font-semibold">Activities</em>
              </h2>
            </div>

            <div className="space-y-10 pb-8">
              <ActivityTable
                data={data}
                yearKey="year_1"
                label="First Year"
                active={active}
                onToggle={() => setActive(!active)}
              />
              <ActivityTable
                data={data}
                yearKey="year_2"
                label="Second Year"
                active={active2}
                onToggle={() => setActive2(!active2)}
              />
            </div>
          </section>

        </div>
      </main>

      <CustomFooter />
    </>
  )
}