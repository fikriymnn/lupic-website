"use client"
import axios from 'axios'
import { JSX, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-3d-carousel'
import 'react-responsive-3d-carousel/dist/styles.css'


export default function CarouselGallery() {
    const [index, setIndex] = useState(0)
    const [data, setData] = useState([{gambar:"",deskripsi:""}])


    useEffect(()=>{
        async function getData(){
            try{
                const Data = await axios.get(process.env.NEXT_PUBLIC_API_URL+"/api/gallery")
                if(Data.data){
                   setData(Data.data)
                }
                
            }catch(err){
                console.log(err.message)
            }
        }
        getData()
    },[])

    return (
        <>
            <div className='flex justify-center mb-20 w-full'>
            <div className='w-[90%] m-auto'>
                <Carousel
                    defaultOption={{ numOfSlides: 'auto' }}
                    items={data.map((v,i)=><img className='rounded-lg w-full' src={(process.env.NEXT_PUBLIC_API_FILE_URL)+v.gambar} alt="image" />)}
                    startIndex={0}
                    onChange={(currentIndex) => {
                        setIndex(currentIndex)
                    }} />
                <p className='w-[80%] md:text-lg text-sm text-center m-auto pt-8'>{data[index]?.deskripsi}</p>
            </div>
            </div>
            

        </>

    )
}