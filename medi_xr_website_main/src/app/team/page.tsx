'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { StyledButton } from '@/widgets'
import { Footer, Team } from '@/components'

const Page = () => {
    const router = useRouter()
    const navigate = () => router.push('#the_team')
  return (
    <div className="mx-auto overflow-y-scroll bg-bg-8 bg-cover bg-fixed bg-center bg-no-repeat shadow-lg -mt-[200px] pt-[200px]">
        <div className="">
            <nav className="bg-white bg-opacity-30 fixed top-0 left-0 hover:bg-opacity-100 w-full md:px-4 lg:px-12 px-2 font-mono flex py-6 justify-between items-center navbar z-20">
                <Link href="/" className="flex gap-2 items-center">
                    <img src='/logo.png' alt="mediXR" className="w-[60px] h-[50px]" />
                    <h3 className="text-secondary font-bold text-4xl font-poppins">Medi<span className="text-primary font-extrabold">XR</span></h3>
                </Link>
                <div className="sm:flex hidden justify-end items-center gap-8">
                    <ul className="list-none flex flex-1 gap-8">
                        <li
                            className={`font-poppins font-normal cursor-pointer text-[16px]`}
                        >
                            <Link href={'/'}>Home</Link>
                        </li>
                        <li
                            className={`font-poppins font-normal cursor-pointer text-[16px] text-primary font-semibold" : "text-secondary"`}
                        >
                            <Link href={'/team'}>Team</Link>
                        </li>
                    </ul>
                    <Link href={'/contact'}>
                        <StyledButton styles='px-4 py-2 text-[16px] font-bold text-white rounded-xl mb-2 bg-black-gradient' label='Contact Us' />
                    </Link>
                </div>
            </nav>
            <section className="relative flex flex-col mt-6 items-center justify-center h-[100vh]">
                <h1 className="text-[62px] font-bold text-white mb-12">Meet Us</h1>
                 <div className='absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-white lg:w-[50%] w-[90%] h-[45%]'>
                     <div className='flex flex-col w-[70%] h-[100%] items-center justify-center mx-auto'>
                         <h3 className="text-primary font-poppins text-[40px] font-bold">MediXR Development</h3>
                         <p className="font-poppins">At MediXR, our mission is to create training simulations to help medical students and Doctors save more lives.</p>
                         <button className="bg-primary rounded-full px-12 py-4 text-white mt-8 text-2xl animate-bounce" onClick={navigate}>Meet the team</button>
                     </div>
                </div>
            </section>
        </div>
        <section id="the_team" className="flex justify-center w-[100%] pt-8 bg-slate-100">
            <Team />
        </section>
        <Footer />
    </div>
  )
}

export default Page
