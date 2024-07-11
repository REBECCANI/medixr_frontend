import React from 'react'
import { GrLinkedin } from 'react-icons/gr'
// import { FaMobileAlt } from 'react-icons/fa'
import Link from 'next/link'

const TeamDescription = ({ member }: { member: any }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-6 items-center">
        <div className="border-secondary rounded-full border-[3px] p-[4px]">
          <img src={member.imageUrl} alt="" width={90} height={90} className="bg-[#00000033] rounded-full h-[90px] w-[90px] object-fit flex items-center justify-center" />
        </div>
        <div className="flex flex-col">
            <h2 className="text-primary text-[24px] font-extrabold">{member.name}</h2>
            <p className="text-[14px] font-bold text-[#494949]">{member.email}</p>
            <p className="text-[14px] font-bold text-[#494949]">{member.role}</p>
            <div className='flex gap-2 mt-2'>
              <Link href={member.linkedin}>
                <GrLinkedin className='w-[20px] h-[20px]' />
              </Link>
              {/* <Link href={member.github}>
                <FaGithub className='w-[20px] h-[20px]' />
              </Link> */}
              {/* <div className='flex'>
                <FaMobileAlt className='w-[20px] h-[20px]' />
                <span className='text-[14px]'> +{member.tel}</span>
              </div> */}
            </div>
        </div>
      </div>
      <hr />
      <div>
        <span className='text-[14px]'>{member.description}</span>
      </div>
    </div>
  )
}

export default TeamDescription
