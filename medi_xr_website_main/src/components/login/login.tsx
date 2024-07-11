'use client';

import React from 'react';
import LoginForm from './loginForm';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  const handleResetPassword = () => {
    router.push('/resetpassword');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-bg-5 bg-cover bg-center">
      <div className="flex flex-col items-center justify-center w-[45%] xxl:w-[30%]">
        <LoginForm />
        <div className='mt-4 flex items-center justify-center text-white'>
          <span className="mr-2 font-bold">Forgot password?</span>
          <button onClick={handleResetPassword} className="hover:bg-blue-700 underline text-white font-bold">Click here</button>
        </div>
      </div>
    </div>
  );
};

export default Login;