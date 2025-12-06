"use client"
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

export default function CarouselHome() {
    const [num, setNum] = useState(0)
    const [gambar, setGambar] = useState([])

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        afterChange: (i) => { setNum(i) }
    };

    useEffect(() => {
        async function getData() {
            try {
                const data = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/api/home")
                setGambar(data.data.carousel)
            } catch (err) {
                console.log(err.message)
            }
        }
        getData()
    },[])

    return (
        <div className='md:w-full w-full m-auto m-auto py-8 rounded-lg bg-gray-white shadow-md border border-gray-100'>
            <div className='grid md:grid-cols-1 grid-cols-1 justify-items-center items-start w-full m-auto '>
                <div className='m-auto w-full pb-16'>
                    <Slider {...settings}>
                        {
                            gambar && gambar.map((v, i) => {
                                return (
                                    <div key={i}>
                                        <img className='rounded-lg w-full object-cover' src={process.env.NEXT_PUBLIC_API_FILE_URL+v} alt="image" />
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        </div>
    )
}