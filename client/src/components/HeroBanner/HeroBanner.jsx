import React from "react";
import "./HeroBanner.css";
import bannerData from "./bannerData";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const HeroBanner = () => {
  return (
    <div className="hero-container">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {bannerData.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="hero-slide"
              style={{
                backgroundImage: `url(${banner.image})`,
              }}
            >
              <div className="hero-overlay">
                <h1>{banner.title}</h1>

                <p>{banner.subtitle}</p>

                <button>{banner.button}</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;