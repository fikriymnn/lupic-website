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

export default function CarouselHome() {
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
        <div className='md:w-[80%] w-[90%] m-auto m-auto py-8 rounded-t-xl rounded-bl-xl rounded-br-[100px] '>
            <div className='grid md:grid-cols-1 grid-cols-1 justify-items-center items-start w-full m-auto '>
                <div className='m-auto w-full'>
                    <Slider {...settings}>
                        <div>
                            <img className='rounded-lg w-full' src="/images/gallery/1.jpeg" alt="image" />
                        </div>
                        <div>
                            <img className='rounded-lg w-full' src="/images/gallery/2.jpg" alt="image" />
                        </div>
                        <div>
                            <img className='rounded-lg w-full' src="/images/gallery/3.jpg" alt="image" />
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    )
}