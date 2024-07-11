import { sponsors } from '@/constants'
import React from 'react'

const Sponsors = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] h-[400px] bg-white">
        <h3 className="text-primary font-bold text-[50px] mt-8" style={{ fontWeight: 900 }}>Our Sponsors</h3>
        <div className="slider xxl:w-[70%]">
          <div className="slide-track">
            {sponsors.map((sponsor, index) => (
                <div key={index} className="slide">
                    <img src={sponsor} alt={`sponsor ${index}`} width={100} height={100} className="w-[200px]" />
                </div>
            ))}
            {sponsors.map((sponsor, index) => (
                <div key={index} className="slide">
                    <img src={sponsor} alt={`sponsor ${index}`} width={100} height={100} className="w-[200px]" />
                </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Sponsors
