'use client'

import { slides } from '@/constants'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules'
import { StarIcon } from '@heroicons/react/24/solid'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const Testimonials = () => {
  return (
    <section className="bg-gray-50 flex justify-center">
      <div className="max-w-[1800px] px-8 py-12 sm:px-6 lg:me-0 lg:py-16 lg:pe-0 lg:ps-8 xl:py-24">
        <div className="w-[90%] mx-auto justify-center grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center lg:gap-16">
          <div className="flex flex-col justify-center text-center lg:col-span-1">
            <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
              What do our Clients say?
            </h2>
            <p className="mt-4 text-gray-700">
              We have worked with and for several individuals and organizations. Take a look at what they say about us
            </p>
            <div className="swiper-controler justify-center items-center h-[70px] w-[100%] lg:mt-12 lg:gap-4">
              <div className="swiper-pagination flex gap-[6px] justify-center"></div>
            </div>
          </div>
          <div className="md:-mx-4 lg:col-span-2 lg:mx-0">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ el: '.swiper-pagination', clickable: true }}
              navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                enabled: true,  
              }}
              breakpoints={{
                  640: {
                  slidesPerView: 1
                  },
                  700: {
                    slidesPerView: 2
                  },
                  1024: {
                    slidesPerView: 3
                  }
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="swiper_container"
            >
                {slides.map((slide, i) => (
                  <SwiperSlide key={i}>
                    <div className="w-[400px] h-[300px] max-sm:w-[97%] rounded-xl box-shadow bg-white">
                          <blockquote className="flex h-full flex-col justify-between shadow-sm p-4 lg:py-8 lg:px-12">
                              <div>
                                <h3 className="text-black-gradient text-[70px] -mb-12 font-poppins">&quot;</h3>
                                <div className="mt-4">
                                    <p className="text-[15px]">{slide.quote}</p>
                                </div>
                              </div>
                              <footer className="flex mt-2 text-sm font-medium text-gray-700 items-center gap-4">
                                <div className={`flex items-center justify-center rounded-full  bg-[#002fff35]`}>
                                  <img src={slide.image} alt="star" className="w-[45px] h-[45px] rounded-full object-cover" />
                                </div>
                                  <div>
                                      <p className="mt-6 leading-relaxed font-bold text-primary text-[15px]">{slide.author}</p>
                                      <p className="text-[14px] text-gray-600">{slide.role}</p>
                                      <div className="flex mt-2">
                                          {[1,2,3,4,5].map((i) => <StarIcon key={i} className={`w-[20px] aspect-square ${i <= slide.rating ? 'text-primary' : 'text-slate-300' }`} /> )} 
                                      </div>
                                  </div>
                              </footer>
                          </blockquote>
                        </div>
                  </SwiperSlide>
                ))}
            </Swiper>  
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
