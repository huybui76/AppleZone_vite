import React from 'react';
import Slider from 'react-slick';
import { Image } from 'antd';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SlideAnimate.css';
const SlideAnimate = (props) => {
  // Component cho nút previous
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-prev-arrow" onClick={onClick}>
      </div>
    );
  };

  // Component cho nút next
  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <div className="custom-next-arrow" onClick={onClick}>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />
  };

  return (
    <Slider {...settings}>
      {props.images.map((image, i) => {
        return <Image src={image} key={i} alt={image} preview={false} width="100%" />;
      })}
    </Slider>
  );
};

export default SlideAnimate;