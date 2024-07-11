'use client'

import { useState } from 'react'
import { XMarkIcon, Bars4Icon } from '@heroicons/react/24/solid'
import { navLinks } from '@/constants'
import { StyledButton } from '@/widgets'
import Link from 'next/link'

const Navbar = () => {
  const [active, setActive] = useState('Home')
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="fixed bg-white z-50 top-0 left-0 w-full md:px-4 lg:px-12 px-2 font-mono flex py-6 justify-between items-center navbar">
        <Link href="/" className="flex gap-2 items-center">
            <img src='/logo.png' alt="mediXR" className="w-[60px] h-[50px]" />
            <h3 className="text-secondary font-bold text-4xl font-poppins">Medi<span className="text-primary font-extrabold">XR</span></h3>
        </Link>

        <div className="lg:flex hidden justify-end items-center gap-8">
            <ul className="list-none flex flex-1">
                {navLinks.map((nav, index) => (
                    <li
                        key={nav.id}
                        className={`font-poppins font-normal cursor-pointer text-[16px] ${
                        active === nav.title ? "text-primary font-semibold" : "text-secondary"
                        } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                        onClick={() => setActive(nav.title)}
                    >
                        <Link href={nav.id === 'teams' ? '/team' : `#${nav.id}`}>{nav.title}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/register">
              <StyledButton styles='px-4 py-2 text-[16px] font-bold text-white rounded-xl mb-2 bg-black-gradient' label='Register' />
            </Link>

            <Link href="/login">
              <StyledButton styles='px-4 py-2 text-[16px] font-bold text-black rounded-xl mb-2 bg-white-gradient' label='Login' />
            </Link>

            <Link href="/contact">
              <StyledButton styles='px-4 py-2 text-[16px] font-bold text-white rounded-xl mb-2 bg-blue-gradient' label='Contact Us' />
            </Link>
        </div>

        <div className="lg:hidden flex flex-1 justify-end items-center">
            <div onClick={() => setToggle(!toggle)} className="w-[35px] h-[35px] object-contain">
                {toggle ? <XMarkIcon /> : <Bars4Icon />}
            </div>

            <div
            className={`${
                !toggle ? "hidden" : "flex"
            } py-6 px-4 absolute bg-black-gradient top-16 right-0 mx-2 my-2 min-w-[150px] rounded-xl sidebar`}
            >
                <div className="flex flex-col gap-8">
                    <ul className="list-none flex justify-end items-start flex-1 flex-col">
                        {navLinks.map((nav, index) => (
                        <li
                            key={nav.id}
                            className={`font-poppins font-medium cursor-pointer text-[16px] ${
                            active === nav.title && "text-black"
                            } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                            onClick={() => setActive(nav.title)}
                        >
                            <Link href={nav.id === 'teams' ? '/team' : `#${nav.id}`}>{nav.title}</Link>
                        </li>
                        ))}
                    </ul>
                    <Link href="/register">
                      <StyledButton styles='px-4 py-2 text-[16px] font-bold text-white rounded-xl mb-2 bg-black-gradient' label='Register' />
                    </Link>
                    <Link href="/login">
                      <StyledButton styles='px-4 py-2 text-[16px] font-bold text-black rounded-xl mb-2 bg-white-gradient' label='Login' />
                    </Link>
                    <Link href="/contact">
                      <StyledButton styles='px-4 py-2 text-[16px] font-bold text-white rounded-xl mb-2 bg-blue-gradient' label='Contact Us' />
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar