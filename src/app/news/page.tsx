import Navbar from "@/components/Navbar"
import CustomFooter from "@/components/CustomFooter"

export default function News(){
    return(
        <>
         <Navbar/>
         <div className="w-full flex justify-center mt-14 mb-14">
            <div className='md:w-[80%] w-[90%] m-auto bg-gradient-to-b from-koreaBlue to-black py-20 rounded-tl-xl rounded-br-xl rounded-tr-[100px] rounded-bl-[100px]'>
                <div className='grid md:grid-cols-2 grid-cols-1 justify-items-center items-start w-full m-auto '>
                <div className='m-auto w-[70%] '>
                    <h3 className="md:text-3xl text-xl font-bold text-white  mb-5">LUPIC News</h3>
                    <p className="text-white md:text-base text-sm">Stay tuned for the latest updates, breakthroughs, and stories from the forefront of our research endeavors.</p>
                    </div>
                    <div className='m-auto w-[50%] '>
                        <input type="text" name="las"/> <button>Cari</button>
                    </div>
                </div>
            </div>
        </div>
         <CustomFooter/>
        </>
    )
}