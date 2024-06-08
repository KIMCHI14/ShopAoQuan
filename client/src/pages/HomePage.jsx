import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Product from '../components/Product';
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from '../features/products/productSlice';
import SwiperProductCustom from '../components/SwiperProductCustom';
import { Link } from 'react-router-dom';

const listImg = [
  { path: "https://im.uniqlo.com/global-cms/spa/res8b126518ddc19b42d2a71803c549b98bfr.jpg" },
  { path: "https://im.uniqlo.com/global-cms/spa/res3b52fae14bf4eca50d1f0116cbf4701efr.jpg" },
  { path: "https://im.uniqlo.com/global-cms/spa/resd7ef248f6f7f620144a76a138e8be09ffr.jpg" },
]
export default function HomePage() {
  const dispath = useDispatch()

  useEffect(() => {
    dispath(getAllProduct())
  }, [])
  const productState = useSelector(state => state?.product);
  const products = productState?.products || [];
  const ARRIVALS = products?.filter(e => e?.tags === "NEW ARRIVALS");
  const bestSeller = products?.filter(e => e?.tags === "BEST SELLER");
  return (
    <div>
      <div className="">
        <Swiper
          slidesPerView={1}
          spaceBetween={40}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
        >
          {
            listImg.map((e, index) => (
              <SwiperSlide key={index}>
                <img width="100%" src={e.path} alt="" />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>

      <div className="container py-4">
        <div className="py-2 mt-4">
          <h3 className='text-center'>BEST SELLER</h3>
        </div>
        <div className=" mt-4 d-flex flex-wrap align-items-center justify-content-between">
          {
            productState && (
              <Swiper
                slidesPerView={4}
                spaceBetween={40}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                {
                  bestSeller.map((e, index) => (
                    <SwiperSlide key={index}>
                      <Product product={e} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
      </div>
      <div className="container py-4">
        <div className="py-2 mt-4">
          <h3 className='text-center'>NEW ARRIVALS</h3>
        </div>
        <div className=" mt-4 d-flex flex-wrap align-items-center justify-content-between">
          {
            productState && (
              <Swiper
                slidesPerView={4}
                spaceBetween={40}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
              >
                {
                  ARRIVALS.map((e, index) => (
                    <SwiperSlide key={index}>
                      <Product product={e} />
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            )
          }
        </div>
      </div>
      <div className="container py-4">
        <div className="py-2 mt-4">
          <h3 className='text-center'>THƯƠNG HIỆU</h3>
        </div>
        <div className="row">
          <div className="col-3">
            <img src="http://bizweb.dktcdn.net/100/369/010/themes/752396/assets/brand1.png?1610172575420"
              width="100%" alt="" />
          </div>
          <div className="col-3">
            <img src="https://bizweb.dktcdn.net/100/467/832/themes/880849/assets/brand6.png?1690170916142" width="100%" alt="" />
          </div>
          <div className="col-3">
            <img src="https://bizweb.sapocdn.net/100/369/010/themes/845311/assets/brand7.png?1663760821700" width="100%" alt="" />
          </div>
          <div className="col-3">
            <img src="http://bizweb.dktcdn.net/100/369/010/themes/752396/assets/brand1.png?1610172575420" width="100%" alt="" />
          </div>
        </div>
      </div>
      <div className="container position-relative">
        <div className="">
          <img width="100%" src="https://khoinguonsangtao.vn/wp-content/uploads/2022/10/hinh-anh-mua-he-nang-choi-chang.jpg" alt="" />
        </div>
        <div className="content-home">
          <h4>MÙA HÈ NĂNG ĐỘNG</h4>
          <p>Những thiết kế được yêu thích cho mùa hè này</p>
          <button className=''>
            <Link to='/products' className='text-dark'>
              Mua ngay
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}
