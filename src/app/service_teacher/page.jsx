import Navbar from "@/components/Navbar";
import CustomFooter from "@/components/CustomFooter";
import Image from "next/image";

export default function Services_workshop() {
  return (
    <>
      <Navbar />
      <div className=" text-center m-auto mt-8 mb-4">
        <h3 className="md:text-4xl text-3xl mt-10 font-bold">
          Pre-Service Teacher Evaluation Test
        </h3>
        <div className="h-1 w-36 bg-koreaRed mt-4 m-auto"></div>
      </div>
      <div className="w-[90%] h-screen md:w-[80%] m-auto mt-10 mb-10">
        <div className="flex items-center justify-center mt-64">
            <button className="h-20 bg-red-700 text-white text-3xl py-2 px-4 md:px-6 rounded-lg hover:bg-blue-700 hover:text-white">Click here to join the test</button>
        </div>
      </div>

      <CustomFooter />
    </>
  );
}
