export default function CustomFooter() {
  return (
    <footer className="bg-koreaBlue w-full">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-2 lg:py-8">
        <div className="md:flex md:justify-between w-full">
          <div className="md:mb-0 mb-10 md:w-[30%] w-[90%]">
            <img
              src="/logobaru.jpeg"
              alt="Logo lupic"
              className="h-28 w-28 object-cover rounded-full bg-white p-2"
            />
            <div className="w-full flex flex-wrap">
              <img
                src="/images/footer/1.png"
                alt="Logo lupic"
                className="w-32 h-12 m-1 p-1 object-cover bg-white rounded-xl"
              />
              <img
                src="/images/footer/2.png"
                alt="Logo lupic"
                className="w-32 h-12 m-1 p-1 object-cover bg-white rounded-xl"
              />
              <img
                src="/images/footer/3.png"
                alt="Logo lupic"
                className=" w-14 p-1 object-contain"
              />
              <img
                src="/images/footer/4.png"
                alt="Logo lupic"
                className="w-32 p-1 object-contain"
              />
              <img
                src="/images/footer/5.png"
                alt="Logo lupic"
                className=" w-14 p-1 object-contain"
              />
              <img
                src="/images/footer/6.png"
                alt="Logo lupic"
                className=" w-14 p-1 object-contain"
              />
              {/* <img
                src="/images/footer/7.png"
                alt="Logo lupic"
                className=" w-14 p-1 object-contain"
              /> */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 md:w-[90%] w-full">
            <div className="md:block hidden"></div>
            <div className="text-white md:ml-0 ml-3">
              <h2 className="mb-6 text-lg font-semibold uppercase dark:text-white">
                Menu
              </h2>
              <ul className="  font-medium">
                <li className="mb-4">
                  <a href="/home" className="hover:underline">
                    Home
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/aboutus" className="hover:underline">
                    About Us
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/activities" className="hover:underline">
                    Goals & Activities
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/news" className="hover:underline">
                    News
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/facilities" className="hover:underline">
                    Facilities
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/gallery" className="hover:underline">
                    Gallery
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/services" className="hover:underline">
                    Our Products
                  </a>
                </li>
                <li>
                  <a href="/service_workshop" className="hover:underline">
                    Workshop
                  </a>
                </li>
              </ul>
            </div>
            <div className="md:ml-20 text-white">
              <h2 className="mb-6 text-lg font-semibold uppercase dark:text-white w-40">
                Contact Us
              </h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a
                    className="hover:underline "
                  >
                    Kimia UPI
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="hover:underline "
                  >
                    Kimia UNNES
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    className="hover:underline "
                  >
                    Kimia UNDHIKSA
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8 w-ful" />
        <div className="sm:flex sm:items-center sm:justify-center">
          <span className="md:text-base text-sm sm:text-center text-white">
            © 2023 LUPIC. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
