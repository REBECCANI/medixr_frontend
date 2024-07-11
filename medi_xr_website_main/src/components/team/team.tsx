'use client'

import { useState } from 'react'
import Image from 'next/image'
import { team } from '@/constants'
import TeamModal from './teamModal'


const Teams = () => {
  const [showForm, setShowForm] = useState<number | null>(null)
  return (
    <div className="flex justify-center">
      <div className="bg-slate-100 flex flex-col justify-space-between items-center h-fit py-8 gap-6">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-blue-gradient text-[48px] xxl:text-[54px] font-bold">Our Team</h1>
          <p className="font-poppins text-[18px]">Diversity - Determined - Impact-driven</p>
        </div>
        <div className="flex flex-wrap gap-6 xxl:gap-12 justify-center max-w-[1100px] mx-auto">
          {
            team.map((member, i) => (
              <div key={i} onClick={() => setShowForm(i)}>
                <div 
                  className="flex flex-col justify-center items-center gap-12 h-[270px] w-[220px] bg-black-gradient-3 my-4 box-shadow rounded-xl hover:scale-110 transition duration-500 cursor-pointer">
                  <img src={member.imageUrl} alt="" width={150} height={150} className="bg-[#00000033] rounded-full h-[120px] w-[120px] object-cover flex items-center justify-center" />
                  <div className='flex flex-col items-center'>
                    <TeamModal isOpen={showForm == i} member={member} closeModal={() => setShowForm(null)} />
                    <p className="text-white font-bold text-[15px]">{member.name}</p>
                    <p className="text-dimWhite font-bold text-[13px]">{member.role}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Teams
