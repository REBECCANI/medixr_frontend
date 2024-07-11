'use client'

import { experts } from '@/constants'
import { useInView } from 'react-intersection-observer'


const Experts = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  })
  return (
    <>
      <div className="h-[200px] xxl:h-[350px] bg-bg-7 bg-cover -mt-12"></div>
      <div className="bg-[#fff] flex flex-col justify-space-between items-center h-fit py-8">
        <div className={`flex flex-col justify-center items-center ${inView && 'card__animation'}`}>
          <h1 className="text-primary text-[60px] font-poppins font-bold">Our Experts</h1>
          <p className="font-poppins text-[18px] max-md:text-[16px]">Meet the people we work with behind the scenes</p>
        </div>
        <div className="flex flex-col gap-12 mt-12 justify-center items-center lg:w-[90%]">
          {
            experts.map((member, i) => (
              <div ref={ref} key={i} className={`${i%2 !== 0 ? `flex-row-reverse flex-end ${inView && 'features__card'}` : `${inView && 'features__card'}`} flex max-md:flex-col w-[95%] sm:w-[80%] xxl:w-[70%] gap-2`}>
                <div 
                  className="flex flex-col justify-center items-center h-[150px] w-[200px] my-4 gap-2 cursor-pointer">
                  <img src={member.imageUrl} alt="" width={150} height={150} className="rounded-full h-[125px] w-[125px] object-fit flex items-center justify-center -mt-16 border-4 border-blue-gradient p-[2px]" />
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-primary text-[22px] font-bold font-poppins">{member.name}</p>
                  </div>
                </div>
                <div className={`${i%2 === 0 ? "border-r-[4px] border-primary" : "border-l-[4px] border-primary"} py-4 px-8 xxl:w-[50%] h-fit bg-white box-shadow rounded-[5px]`}>
                  <p className="text-primary text-[20px] font-bold font-poppins">About</p>
                  <p className="font-poppins text-[14px]">{member.description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Experts
