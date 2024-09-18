import styles from './Slide.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Slide.module.css'
import { url } from '../../../../config/config'
import banner1 from '../../../../images/240906114813_Y4000308.webp'
import banner2 from '../../../../images/7f50bd2f-a4b8-42df-b6d1-6026c65c78af.jpg'
import banner3 from '../../../../images/ai.png'
import banner4 from '../../../../images/background.jpg'
import banner5 from '../../../../images/background2.jpg'
import banner6 from '../../../../images/background3.jpg'
import banner7 from '../../../../images/background4.jpg'
import React, { useState } from 'react'

const Slide = () => {
    // CustomPaging 함수
    // CustomPaging 함수
    const [slide, setSlide] = useState([
        { img: banner1 },
        { img: banner2 },
        { img: banner3 },
        { img: banner4 },
        { img: banner5 },
        { img: banner6 },
        { img: banner7 },
    ])
    const [img, setImg] = useState()
    const CustomPaging = i => (
        <div className={styles.dotBox}>
            <div className={styles.customDot}>
                <img src={slide[i].img} alt={`Thumbnail ${i + 1}`} />
            </div>
        </div>
    )

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: CustomPaging,
    }

    return (
        <div className={styles.container}>
            <Slider {...settings} className={styles.slider}>
                {slide.map((item, index) => {
                    return (
                        <div>
                            <img src={item.img}></img>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
export default Slide
