import React from 'react';
import Link from 'next/link';

const ConfirmPage = () => {
  return (
    <div className='relative h-screen flex justify-center items-center overflow-hidden'>
      <div className='absolute inset-0 bg-bg-9 bg-cover bg-center bg-no-repeat filter'></div>
      <div className='absolute inset-0 bg-blue-900 bg-opacity-80'></div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl text-white font-bold mb-4">Your account was successfully created!</h1>
        <p className="text-2xl text-white mb-12">Thank you for joining MediXR</p>
        <Link href="/login" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-16 rounded-full text-xl hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out">
          Login
        </Link>
      </div>
    </div>
  );
};

export default ConfirmPage;