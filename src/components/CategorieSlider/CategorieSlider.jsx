
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";



export default function CategorieSlider() {

    const [Categories, setCategories] = useState([])

    async function getCategories(){
      let {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    }
  
    useEffect(()=>{
      getCategories()
    },[])
  
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay:true,
      autoplaySpeed: 1500
    };
  
  return (
    
  <div className="container my-4">
    <h3>Shop Popular Categories</h3>
      <Slider {...settings} >
    
    {Categories.map((val)=>(
      <div key={val._id} className='px-1'>
        <img src={val.image} height={200}  className='w-100' alt="" />
        <h5>{val.name}</h5>
  
      </div>
    ))}
    
    {/* why not {} */}
  
  </Slider>
  </div>
  )
}
