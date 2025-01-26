
import Navbar from '@/components/Navbar'
import CustomFooter from '@/components/CustomFooter'
import CarouselGallery from '@/components/carousel/CarouselGallery'


export default function Gallery() {


    return (
        <>
            <Navbar />
            <div className=" text-center m-auto mt-8 mb-4">
                <h3 className="md:text-4xl text-3xl mt-10 font-bold">Our Gallery</h3>
                <div className="h-1 w-36 bg-koreaRed mt-5 m-auto"></div>
            </div>
            <CarouselGallery/>
            <CustomFooter />
        </>
    )
}