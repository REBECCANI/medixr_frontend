'use client'

import { benefits } from '@/constants'
import { fadeIn } from '@/utils/motion'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Benefits = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when the component comes into view
  });
  return (
    <motion.div>
      <div className="h-[300px] xxl:h-[500px] bg-bg-7 bg-cover xl:-mt-32 border-b-white"></div>
        <div className="bg-white w-[100%] min-h-[300px] max-lg:pt-20">
          <div className="flex flex-col gap-12 bg-[#fff] h-fit items-center justify-center border-white">
            <div className="flex flex-col justify-center items-center bg-white">
              <h1 className="text-primary text-[54px] font-bold">Benefits</h1>
              <p className="font-poppins text-[18px]">Meet the people behind our growing success</p>
            </div>
            <div className="flex flex-wrap mx-auto gap-8 xxl:gap-20 justify-center max-w-[1800px]">
              {benefits.map((benefit, i) => (
                  <motion.div ref={ref} variants={fadeIn("right", "spring", i * 0.5, 0.75)} key={i} className={`flex flex-col w-[350px] h-[350px] gap-6 items-center justify-center border rounded-xl ${inView && 'card__animation'}`}>
                      <img src={benefit.image} alt="" width={100} height={100} className="h-[200px] w-[200px]" />
                        <p className="w-[100%] font-poppins text-center px-4">
                            {benefit.benefit}
                        </p>
                  </motion.div>
              ))}
            </div>
        </div>
        </div>
      <div className="h-[300px] xxl:h-[500px] bg-bg-6 bg-cover -mt-8"></div>
    </motion.div>
  )
}

export default Benefits
