import React from 'react'
import Slider from "react-slick";
import  image1 from '../../assets/images/images/banner-4.jpeg'
// import  image2 from '../../assets/images/images/slider-2.jpeg'
import  image3 from '../../assets/images/images/banner-4.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 1500
      };
    
  return (
    <div className='container mt-5 mb-5 pt-5'>
        <Slider {...settings}>
      
          <img src={image1} className='w-100' alt="" />
          {/* <img src={image2} className='w-100' alt="" /> */}
          <img src={image3} className='w-100' alt="" />
      
      
        </Slider>

    </div>
  )
}
