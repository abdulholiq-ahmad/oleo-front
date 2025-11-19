'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function Hero() {
  const slides = [
    {
      id: 1,
      title: 'Slide 1',
      image: '/images/hero-bg.png',
    },
    {
      id: 2,
      title: 'Slide 2',
      image: '/images/hero-bg.png',
    },
    {
      id: 3,
      title: 'Slide 3',
      image: '/images/hero-bg.png',
    },
  ];

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        className="hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="hero-slide"
              style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <h2 className="text-4xl font-bold text-black">{slide.title}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;
