"use client"
import React, { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const judul = [
    "Phase I (2015-2021)",
    "Phase II-1 (2023-2026)",
    "Phase II-2 (2026-2029)"
]
const text = [
    "Building an educational network in the Yogyakarta region",
    "Developing a triangle online educational network with 3 participating universities connecting West (Bandung) Java - North Central (Semarang) Java - Northern Bali",
    "Developing a trans-island online educational network with representative universities of 32 Indonesian island areas to resolve inter-regional education imbalance."
]

export default function CarouselActivities() {
    const [num, setNum] = useState(0)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        afterChange: (i: any) => { setNum(i) }
    };
    return (
        <div className='w-[80%] m-auto bg-gradient-to-b from-koreaBlue to-black py-8 rounded-t-xl rounded-bl-xl rounded-br-[100px] '>
            <div className='grid grid-cols-2 justify-items-center items-start w-full m-auto '>
            <div className='w-[80%]'>
                <h3 className='text-3xl font-bold text-white mt-7 mb-7'>{judul[num]}</h3>
                <p className='text-white text-base'>{text[num]}</p>
            </div>
            <div className='m-auto w-[50%] '>
                <Slider {...settings}>
                    <div>
                        <img className='rounded-lg' src="/images/gallery/1.jpeg" alt="image" />
                    </div>
                    <div>
                        <img className='rounded-lg' src="/images/gallery/2.jpg" alt="image" />
                    </div>
                    <div>
                        <img className='rounded-lg' src="/images/gallery/3.jpg" alt="image" />
                    </div>
                </Slider>
            </div>
        </div>
        </div>
    )
}