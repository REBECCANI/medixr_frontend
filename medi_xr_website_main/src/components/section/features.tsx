'use client'

import Image from 'next/image'
import styles from '@/style'
import { features } from '@/constants'
import { useInView } from 'react-intersection-observer'

const FeatureCard = ({ icon, title, content, index }: any) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger once when the component comes into view
  });
  return (
    <div ref={ref} className={`flex flex-row p-6 w-[90%] rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card ${inView && 'features__card'} hover:text-[#fff]`}>
      <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-[#00000010] hover:bg-[#ffffff55]`}>
        <Image src={icon} alt="star" className="w-[50%] h-[50%] object-contain" />
      </div>
      <div className="flex-1 flex flex-col ml-3">
        <h4 className="font-poppins font-semibold text-black-gradient text-[18px] leading-[23.4px] mb-1">
          {title}
        </h4>
        <p className="font-poppins font-normal text-dimBlack text-[16px] leading-[24px]">
          {content}
        </p>
      </div>
    </div>
  )
}
  
  const Features = () =>  (
      <div id="features" className="flex max-md:flex-col my-8 max-md:my-24 gap-12 sm:pl-12 pl-6 h-[600px] max-w-[1800px] mx-auto items-center justify-between">
        <div className="feature__text flex flex-[40%] flex-2 flex-col items-center">
          <h2 className="font-poppins xs:text-[100px] font-extrabold text-[35px] text-center text-white w-full">
            Bringing Virtual Reality <br className="sm:block hidden" /> into the World of Medicine
          </h2>
          <p className={`${styles.paragraph} max-w-[500px] mt-5 text-dimWhite text-center`}>
              MediXR is training future Expert Doctors and Medical students through use of advance technologies such as Virtual Reality and Augmented Reality
          </p>
        </div>
        <div className="flex-[60%] flex-col md:w-[50%] md:-mt-20">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} {...feature} index={index} clasName="w-[100%] text-black" />
          ))}
        </div>
      </div>
  )

export default Features
