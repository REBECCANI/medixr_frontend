'use client'

import { fadeIn } from '@/utils/motion'
import { Accordion } from '@/widgets'
import { motion } from 'framer-motion'
import { useState } from 'react'

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;

const CompanyDescription = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)

  return (
    <motion.div className="relative mt-24 max-sm:mt-[200px] max-md:mt-[350px] z-20 xxl:py-8" variants={fadeIn("right", "spring", 0.5, 0.75)}>
        <div className="z-10 lg:flex-col h-fit min-h-[450px] max-md:h-[900px] max-sm:gap-8 sm:px-8 px-6 max-w-[1800px] mx-auto bg-white py-8">
            <div className="flex max-lg:flex-col gap-4 items-center justify-center lg:px-20">
                <div className="flex-1">
                  <motion.div
                    initial={false}
                    animate={
                      isLoaded && isInView
                        ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
                        : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
                    }
                    transition={{ duration: 2, delay: 1 }}
                    viewport={{ once: true }}
                    onViewportEnter={() => setIsInView(true)}
                  >
                    <img src='/main_trainig.jpg' alt="team" width={400} height={300} onLoad={() => setIsLoaded(true)} className='w-[600px]' />
                  </motion.div>
                </div>
                <div className="description__accordion flex-1 lg:pl-4 w-[100%]">
                    <Accordion />
                </div>
            </div>
        </div>
        <div className="h-[250px] xxl:h-[350px] bg-bg-6 bg-cover -mt-8"></div>
    </motion.div>
  )
}

export default CompanyDescription

