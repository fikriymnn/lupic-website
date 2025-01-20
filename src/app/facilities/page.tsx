import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"
import CardFacilities from "@/components/card/CardFacilities"

export default function Facilities() {
    return (
        <>
            <Navbar />
            <div className=" text-center m-auto mt-8 mb-4">
                <h3 className="md:text-4xl text-3xl mt-10 font-bold">Facilities</h3>
                <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
            </div>
            <div className="flex-wrap m-auto w-[90%] mb-20 md:mt-8 mt-3 flex justify-evenly items-center">
                <CardFacilities/>
                <CardFacilities/>
                <CardFacilities/>
                <CardFacilities/>
                <CardFacilities/>
                <CardFacilities/>
                <CardFacilities/>
            </div>
            <CustomFooter />
        </>
    )
}