import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Silde.module.css';

export const Silde = ({ images }) => {  // onImageClick 제거
  const [slide] = useState(images);

  const CustomPaging = i => (
    <div className={styles.dotBox}>
      <div className={styles.customDot}>
        <img src={slide[i]} alt={`Thumbnail ${i + 1}`} />
      </div>
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: CustomPaging,
  };

  return (
    <div className={styles.container}>
      <Slider {...settings} className={styles.slider}>
        {slide.map((item, index) => (
          <div key={index}>
            <img src={item} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
