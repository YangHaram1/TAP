import styles from './Slide.module.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './Slide.module.css'
import { url } from '../../../../config/config'
import banner1 from '../../../../images/banner1.webp'
import banner2 from '../../../../images/banner2.webp'
import banner3 from '../../../../images/banner3.webp'
// import banner4 from '../../../../images/banner1.webp'
// import banner5 from '../../../../images/background2.jpg'
// import banner6 from '../../../../images/background3.jpg'
// import banner7 from '../../../../images/background4.jpg'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Slide = () => {
    // CustomPaging 함수
    // CustomPaging 함수
    const navi = useNavigate();

    const [slide, setSlide] = useState([
        { img: banner1, seq:1040 },
        { img: banner2, seq:1063}, // 추후 해당하는 시퀀스로 바꿔주기
        { img: banner3, seq:1064}, // 추후 해당하는 시퀀스로 바꿔주기
        // { img: banner4 },
        // { img: banner5 },
        // { img: banner6 },
        // { img: banner7 },
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

    const handleMove = (seq)=>{
        // console.log("상품번호", seq);
        navi("/detail", { state: { seq } });
      }

    return (
        <div className={styles.container}>
            <Slider {...settings} className={styles.slider}>
                {slide.map((item, index) => {
                    return (
                        <div key={index} onClick={()=>{handleMove(`${item.seq}`)}}>
                            <img src={item.img}></img>
                        </div>
                    )
                })}
            </Slider>
        </div>
    )
}
export default Slide
