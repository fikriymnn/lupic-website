"use client";
import CustomFooter from "@/components/CustomFooter";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import { useParams } from "next/navigation";

export default function DetailProduct({ params }) {
  const { id } = useParams();
  const [data, setData] = useState({
    judul: "",
    content: "",
    gambar: "",
    harga: "",
    deskripsi: "",
    link_shopee: "",
    link_tokped: "",
    _id: "",
  });
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const Data = await axios.get(
          process.env.NEXT_PUBLIC_API_URL + "/api/toko/" + id
        );
        if (Data.data) {
          setData(Data.data);
        }
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID").format(price);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-koreaBlue/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-koreaBlue border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
        <CustomFooter />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen max-w-6xl px-4 mx-auto md:py-16 py-24">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Back Button Mobile */}
          <a
            href="/services"
            className="inline-flex items-center gap-2 text-koreaBlue hover:text-koreaRed transition-colors mb-6 lg:hidden font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </a>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
                )}
                <img
                  src={process.env.NEXT_PUBLIC_API_FILE_URL + data.gambar}
                  alt={data.judul}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>

              {/* Back Button Desktop */}
              <a
                href="/services"
                className="hidden lg:inline-flex items-center gap-2 text-koreaBlue hover:text-koreaRed transition-colors font-medium"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Products
              </a>
            </div>

            {/* Product Info Section */}
            <div className="space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  {data.judul}
                </h1>
                <div className="h-1 w-20 bg-koreaRed rounded-full" />
              </div>

              {/* Price */}
              <div className="bg-gray-100 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="text-xl lg:text-2xl font-bold text-koreaRed">
                  Rp {formatPrice(data.harga)}
                </p>
              </div>

              {/* Description */}
              {data.deskripsi && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-koreaBlue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Product Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {data.deskripsi}
                  </p>
                </div>
              )}

              {/* Purchase Buttons */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Available on:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  {data.link_shopee && (
                    <button
                      onClick={() => window.open(data.link_shopee, "_blank")}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                      <span>Buy on Shopee</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}

                  {data.link_tokped && (
                    <button
                      onClick={() => window.open(data.link_tokped, "_blank")}
                      className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                      </svg>
                      <span>Buy on Tokopedia</span>
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Features/Specs */}
              <div className="bg-gradient-to-br from-koreaBlue/5 to-koreaRed/5 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <svg
                    className="w-5 h-5 text-koreaBlue"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-900">
                    Product Benefits
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>High quality product</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Fast shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Secure payment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          {data.content && (
            <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-koreaBlue p-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Additional Information
                </h2>
              </div>
              <div className="p-6 lg:p-8 prose prose-lg max-w-none">
                {parse(data.content)}
              </div>
            </div>
          )}
        </div>
      </div>

      <CustomFooter />
    </>
  );
}