import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Product from './Product';
const SwiperProductCustom = ({ item, title, view }) => {
    console.log("item", item)
    return (
        <div className='mb-4'>
            <Swiper
                slidesPerView={1}
                spaceBetween={40}
                loop={true}
                // autoplay={{
                // delay: 3000,
                // disableOnInteraction: false,
                // }}
                navigation={true}
                modules={[Navigation, Autoplay]}
                className="mySwiper"
            >
                {
                    item.map((e, index) => (
                        <SwiperSlide key={index}>
                            <Product product={e} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

export default SwiperProductCustom;
