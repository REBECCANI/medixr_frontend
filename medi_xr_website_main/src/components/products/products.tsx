'use client'

import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { productFeatures } from '@/constants'
import { useInView } from 'react-intersection-observer'

export const fadeIn = (direction: string, type: string, delay: number, duration: number) => {
    return {
      hidden: {
        x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
        y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          type: type,
          delay: delay,
          duration: duration,
          ease: "easeOut",
        },
      },
    }
}

const Products = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when the component comes into view
  });
  return (
    <div className="flex flex-col items-center justify-center h-fit py-12 px-8 gap-8">
      <div className="flex flex-col items-center justify-center gap-4">
        <h3 className="text-[60px] font-bold text-white">Product</h3>
        <p className="text-dimWhite max-w-[1200px]">At MediXR, we offer a wide array of products. The main product features we offer include</p>
      </div>
      <motion.div className="flex max-w-[1800px] justify-around flex-wrap gap-4 xxl:gap-12">
        {productFeatures.map((product, i) => (
          <div key={i} ref={ref} className={`${inView && 'product_card__animation'}`}>
            <Tilt className={`
              ${(i == 0 || i == 4) ? "xl:mt-48" : (i == 1 || i == 3) && "xl:mt-24"} 
              xs:w-[250px] flex flex-col justify-center items-center h-[300px] w-[240px] bg-black-gradient-3 my-4 box-shadow rounded-xl transition duration-500 cursor-pointer`} key={i}>
                <motion.div
                    ref={ref}
                    variants={fadeIn("right", "spring", i * 0.5, 0.75)}
                    className="w-full rounded-[20px] flex flex-col items-center justify-start"
                >
                    <img src={product.image} alt="" width={150} height={150} className="h-[150px] w-[200px] object-contain flex items-center justify-center" />
                    <div className="px-4 flex items-center flex-col">
                        <h3 className='text-white text-[16px] font-extrabold text-center'>
                            {product.title}
                        </h3>
                        <h3 className='text-white text-[12px] text-center'>
                            {product.description}
                        </h3>
                    </div>
                </motion.div>
            </Tilt>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Products
