"use client"
import { useState } from 'react'
import { Carousel } from 'react-responsive-3d-carousel'
import 'react-responsive-3d-carousel/dist/styles.css'


const items = [
    <img className='rounded-lg' src="/images/gallery/1.jpeg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/2.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/3.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/4.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/5.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/6.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/7.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/8.png" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/9.jpg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/10.jpeg" alt="image" />,
    <img className='rounded-lg' src="/images/gallery/11.jpg" alt="image" />,
]

const textItems = [
    "The academic writing was held by the chemistry and chemistry education study program, Faculty of Mathematics and Science Education (FMSE), Universitas Pendidikan Indonesia on August 29-30th, 2023 in smartclass room, 2nd floor of this faculty at 08.00-12.00 Western Indonesian Time.",
    "Conference overview: Joining The International Conference is one of the activities to gain LUPIC’s goal on “Support for presentation at international academic conferences”. This conference took place in Mercure Hotel, Nusa Dua, Bali for two days on October 9-10th, 2023.",
    "This conference was presented by Prof. Dr. Won Koo Lee. (Sogang University Department of Chemistry), Prof. Dr. Ingo Eilks. (Bremen University Institute of Didactics of Science Education), Prof. Satoshi Ohkura, Ph.D. (Nagoya University Graduate School of Bioagricultural Sciences), Prof. Dr. Roslan Hasni. (Universiti Malaysia Terengganu, Faculty of Ocean Engineering Technology and Informatics) as keynote speakers, and other dis tinguished speakers from natural science.",
    "Blended learning is one of the activities from LUPIC in term of “Enhancement of Education Capability/Opening online studio and classroom for natural science education”. This program involved 3 Universities, among them are UPI, Unnes, and Undiksha, which is fully funded by LUPIC.",
    "On June 26 and 27 2023 a meeting was held between the Leading University Project for International Cooperation / LUPIC delegates which is a program from the Korean Ministry of Education represented by Sogang University Prof. Wonkoo Lee and the UPI Chemistry Education Department, Semarang State University, Ganesha State University, and Sanata Dharma University in the Faculty of Mathematics and Natural Science Education (FPMIPA) UPI and the Mercure Hotel.",
    "“Scientific writing for research and review articles and how to prepare and submit an article to a reputable journal” was the topic of this workshop. Elsevier Asia Pacific.",
    "The collaboration with LUPIC added an extra dimension to the conference, emphasizing the importance of international cooperation in advancing scientific research.",
    "The topic delivered for basic chemistry consist of: Atomic Structure (UPI); Periodic Properties of The Elements (Unnes); and The Change of Matters (Undiksha). While for research methodology, consist of: Article Review (UPI); Experiment Strategy (Unnes); and Research Process (Undiksha).",
    "The expected outputs from this PkM activity are (1) provide insight into the professional development of teachers through the PPG Program; (2) joint publications published in journals; and (3) the establishment of partnerships between schools, the Office of Education and Higher Education in an effort to improve the quality of learning in schools.",
    "Several programs that were highlighted from this activity included: (1) Chemistry Education Program and National University Capacity Building, (2) Expansion of STEM-linked Education for Scientific Competency of Prospective Teachers, (3) Incumbent Science Teacher Retraining Program, and (4) Social Contribution: Appropriate Technology-Based Regional Networks and Activities.",
    "Blended Learning Recording 2023 (1st year) Blended Learning was conducted during October 2023 for Basic Chemistry and Research Methodology Lectures. UPI, Unnes and Undiksha as 3 University under consortion Leading University Project for International Cooperation (LUPIC)-Sogang University, South Korea, join with this program to have lectures together by three Universities by changing the lecturer. Here is some recording of this activity: 1. Basic Chemistry (UPI host): https://drive.google.com/file/d/1jUjY_dKjyv0lznk-dmBDkjpbIFXpKNE3/view?usp=sharing 2. Basic Chemistry (Unnes host): https://drive.google.com/file/d/1rag20Y5n2zkXluTarA-t2c2pdwf4k58c/view?usp=sharing 3. Basic Chemistry (Undiksha host): https://drive.google.com/file/d/19-nxkBit10YXFxLWgWaDpLI0QrVvW8ls/view?usp=sharing 4. Research Methodology (UPI host): https://drive.google.com/file/d/1nhdGs7dUUYUxbi3XgYiIKu5b-A2NzDq1/view?usp=sharing 5. Research Methodology (Unnes host): https://drive.google.com/file/d/1Yhv2WBeYVCGBHnDykyjhotTY1Qk7Ykoh/view?usp=sharing 6. Research Methodology (Undiksha host): https://drive.google.com/file/d/1ByRUYPlAcDOQZzlLIBq2rzGbhN3d6wFi/view?usp=sharing",
]

export default function CarouselGallery() {
    const [index, setIndex] = useState(0)
    return (
        <>
            <div className='flex justify-center mb-20'>
            <div className='w-[90%] m-auto'>
                <Carousel
                    defaultOption={{ numOfSlides: 'auto' }}
                    items={items}
                    startIndex={0}
                    onChange={(currentIndex) => {
                        setIndex(currentIndex)
                    }} />
                <p className='w-[80%] text-lg text-center m-auto pt-8'>{textItems[index]}</p>
            </div>
            </div>
            

        </>

    )
}