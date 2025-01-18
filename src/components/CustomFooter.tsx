

export default function CustomFooter() {
    return (
        <footer className="bg-koreaRed ">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between w-full">
                    <div className="mb-6 md:mb-0 mb-10 md:w-[30%] w-[90%]">
                        <img
                            src="/images/lupic-logo.png"
                            alt="Logo lupic"
                            className="h-24 w-24 object-contain"
                        />
                        <div className="w-full flex flex-wrap">
                            <img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            /><img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            /><img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            /><img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            />
                            <img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            />
                            <img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            />
                            <img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            />
                            <img
                                src="/images/lupic-logo.png"
                                alt="Logo lupic"
                                className="h-14 w-14 object-contain"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3 md:w-[90%] w-full">
                        <div className="md:block hidden"></div>
                        <div className="text-white md:ml-0 ml-3">
                            <h2 className="mb-6 text-lg font-semibold uppercase dark:text-white">Menu</h2>
                            <ul className=" dark:text-gray-400 font-medium">
                                <li className="mb-4">
                                    <a href="/home" className="hover:underline">Home</a>
                                </li>
                                <li className="mb-4">
                                    <a href="/aboutus" className="hover:underline">About Us</a>
                                </li><li className="mb-4">
                                    <a href="/activities" className="hover:underline">Goals & Activities</a>
                                </li><li className="mb-4">
                                    <a href="/news" className="hover:underline">News</a>
                                </li><li className="mb-4">
                                    <a href="/facilities" className="hover:underline">Facilities</a>
                                </li><li className="mb-4">
                                    <a href="/gallery" className="hover:underline">Gallery</a>
                                </li><li className="mb-4">
                                    <a href="/services" className="hover:underline">Services</a>
                                </li>
                            </ul>
                        </div>
                        <div className="md:ml-20 text-white">
                            <h2 className="mb-6 text-lg font-semibold uppercase dark:text-white w-40">Contact Us</h2>
                            <ul className="font-medium">
                                <li className="mb-4">
                                    <a href="#" className="hover:underline ">Kimia UPI</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline ">Kimia UNNES</a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="hover:underline ">Kimia UNDHIKSA</a>
                                </li>
                            </ul>
                        </div>
                          
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-center">
                    <span className="md:text-base text-sm sm:text-center text-white">© 2023 LUPIC. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}