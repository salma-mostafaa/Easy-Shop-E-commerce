import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import styles from '../CategorySlider/CategorySlider.module.css'

export default function CategorySlider() {

  let [category, setCategory] = useState([])

  function getCategorys() {
    axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => {
        setCategory(response.data.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getCategorys()
  }, [])

  return (
    <div className={`container ${styles.container}`}>

      <h4 className='mb-3'>Shop Popular Categories</h4>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={5}
        slidesPerView={4}
        autoplay={{ delay: 2000}}
        loop={true}

        >
          {
            category.map((item)=>{
              return <SwiperSlide>
                <img src={item.image} alt="" className='w-100' style={{height:'150px', objectFit:'cover'}} />
                <p className='text-center mt-2'>{item.name}</p>
                </SwiperSlide>
            })
          }
      </Swiper>


    </div>
  )
}
