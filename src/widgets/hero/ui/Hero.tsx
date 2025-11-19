'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { HeroType } from '../types';
import { Button } from '@/widgets/button';
import { Icon } from '@/shared/ui/Icon';
import Image from 'next/image';

function Hero() {
  const swiperRef = useRef<SwiperType | null>(null);

  const slides: HeroType[] = [
    {
      id: '1',
      title: "Sifatli margarin — sog'lom hayot manbai.",
      description: 'Tabiiy tarkib, zamonaviy texnologiya va ishonchli brend bir joyda.',
      imagePath: '/images/hero-bg.png',
    },
    {
      id: '2',
      title: 'Slide 2',
      description: '',
      imagePath: '/images/hero-bg.png',
    },
    {
      id: '3',
      title: 'Slide 3',
      description: '',
      imagePath: '/images/hero-bg.png',
    },
  ];

  return (
    <section className="hero">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        effect={'fade'}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={`${slide.id} + ${index}`}>
            <div className="grid grid-cols-2 gap-6 py-48">
              <div className="w-xl">
                <h2 className="text-gray-dark mb-4 text-[65px] leading-20 font-bold">
                  {slide?.title}
                </h2>
                <p className="text-gray-medium mb-8">{slide?.description}</p>
                <Button text="Aloqa" className="mb-8" />
                <div className="flex flex-row items-center gap-2">
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => swiperRef.current?.slidePrev()}
                  >
                    <Icon
                      name="arrow-left-rounded"
                      width={29}
                      height={29}
                      className="text-primary"
                    />
                  </button>
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => swiperRef.current?.slideNext()}
                  >
                    <Icon
                      name="arrow-right-rounded"
                      width={29}
                      height={29}
                      className="text-primary"
                    />
                  </button>
                </div>
              </div>
              <div className="h-full min-w-full">
                <Image src={slide.imagePath} alt="Hero image" width={588} height={422} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;
