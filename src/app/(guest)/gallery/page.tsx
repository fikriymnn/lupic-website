import Navbar from '@/components/Navbar'
import CustomFooter from '@/components/CustomFooter'
import CarouselGallery from '@/components/carousel/CarouselGallery'

export default function Gallery() {
  return (
    <>
      <Navbar />

      <main className="w-full overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <section className="py-16 md:py-24">

            {/* Section Header */}
            <div className="mb-10 space-y-3">
              <span className="inline-block px-3 py-1 bg-koreaBlue/8 text-koreaBlue text-xs font-medium tracking-widest uppercase rounded-full">
                Gallery
              </span>
              <h2 className="text-3xl md:text-4xl text-gray-900 leading-tight font-semibold tracking-tight">
                Our{" "}
                <em className="not-italic font-semibold">Gallery</em>
              </h2>
            </div>

            <CarouselGallery />

          </section>
        </div>
      </main>

      <CustomFooter />
    </>
  )
}