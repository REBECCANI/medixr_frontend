'use client';

import React from 'react';
import RegisterForm from './registerForm';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-bg-10 bg-cover bg-center">
      <div className="flex w-[90%] xxl:w-[70%] h-[90%] justify-between items-start">
        <div className='flex flex-col mt-[-30px] ml-[60px]'>
          <p className='mt-16 text-primary font-poppins font-bold text-white max-md:text-4xl text-7xl'>Create</p>
          <p className='text-primary font-poppins font-bold text-white max-sm:text-xxl text-7xl'>New Account</p>
          <div className='flex text-white mt-[50px]'>
            <span className="mr-2 text-white text-2xl">Already registered?</span>
            <button onClick={handleLogin} className="hover:bg-blue-700 underline text-white font-bold text-2xl">Login</button>
          </div>
          <hr className="border-white border-solid border-t-2 w-20 mt-[20px]" />
          <p className='text-white text-primary font-bold text-lg mt-[30px]'>Sign Up and Get Started!</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
