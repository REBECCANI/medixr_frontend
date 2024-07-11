import React from 'react';
import RegisterForm from './registerForm';

const Register = () => {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="flex w-[90%] xxl:w-[70%] h-[90%]">
          <p className="text-[40px] font-bold text-white">CREATE ACCOUNT</p>
          
          <p className="text-[24px] text-white">Stay connected with us</p>
          <RegisterForm />
          </div>
        </div>
    );
  };
  
  export default Register;