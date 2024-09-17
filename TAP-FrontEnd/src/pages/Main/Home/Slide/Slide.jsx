import styles from './Slide.module.css'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Slide.module.css'
import { url } from '../../../../config/config'
const Slide = () => {
    // CustomPaging 함수
    // CustomPaging 함수
    const CustomPaging = i => (
        <div className={styles.dotBox}>
            <div className={styles.customDot}>
                <img
                    src={`https://via.placeholder.com/50?text=Img${i + 1}`} // 이미지 URL을 슬라이드에 맞게 변경
                    alt={`Thumbnail ${i + 1}`}
                />
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
                <div>
                    {/* <img
                        src="https://via.placeholder.com/800x400?text=Slide+1"
                        alt="Slide 1"
                    /> */}
                    <img
                        src={`${url}/31d8a1ec-913e-4808-8004-091734d77744`}
                    ></img>
                </div>
                <div>
                    <img
                        src="https://via.placeholder.com/800x400?text=Slide+2"
                        alt="Slide 2"
                    />
                </div>
                <div>
                    <img
                        src="https://via.placeholder.com/800x400?text=Slide+3"
                        alt="Slide 3"
                    />
                </div>
                <div>
                    <img
                        src="https://via.placeholder.com/800x400?text=Slide+4"
                        alt="Slide 4"
                    />
                </div>
                <div>
                    <img
                        src="https://via.placeholder.com/800x400?text=Slide+5"
                        alt="Slide 5"
                    />
                </div>
            </Slider>
        </div>
    )
}
export default Slide
