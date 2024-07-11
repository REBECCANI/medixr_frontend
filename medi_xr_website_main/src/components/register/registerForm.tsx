'use client';

import React, { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { v4 as uuidv4 } from 'uuid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register',
  description: 'Register for Medi XR',
};

const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [institution, setInstitution] = useState("")

    const baseUrl =  'http://localhost:5000'; 

    const sendMail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match")
            return;
        }

        const token = uuidv4();
        const verificationLink = `${baseUrl}/verify/${token}`

        const templateParams = {
            from_name: 'Medi XR',
            to_name: lastName,
            to_email: email,
            link: verificationLink,
        };
    
        try {
            await emailjs.send('service_h9j63h5', 'template_wwv9mmm', templateParams, '9fnX19H-Z6IBp4IYD');
            console.log('Email sent with template params:', templateParams);
          
            const response = await fetch(`${baseUrl}/register`, {  
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                institution,
                verificationToken: token,
              }),
            });
      
            const responseData = await response.json();
      
            if (!response.ok) {
              throw new Error(responseData.error || 'Failed to register');
            }
      
            alert('Registration successful! Check your email for verification link.');
          } catch (error) {
            console.error('Registration failed:', error);
            if (error instanceof Error) {
              alert(`Failed to register. Please try again. Error: ${error.message}`);
            } else {
              alert('Failed to register. Please try again.');
            }
          };
          
        };
      
        const resetError = () => {
          setErrorMessage("");
        }

        return (
            <div className="h-[100%] my-12">
              <div className="flex justify-center items-center h-[100%]">
                <div className="flex flex-col h-fit bg-white w-[100%]">
                  <div>
                    <div className="flex flex-col items-center justify-center py-8">
                      <h1 className="text-primary font-poppins font-bold text-[3rem] max-sm:text-[1.5rem]">Create Account</h1>
                    </div>
                    <div>
                      <form onSubmit={sendMail} encType="multipart/form-data">
                        <div className="mx-8">
                          <div className={`${errorMessage ? '' : 'hidden'} bg-red-100 rounded-[5px] h-fit py-4 px-4 mb-6 text-red-500`}>
                            <span className="text-red-600 font-bold">Error: </span>
                            {errorMessage}
                          </div>
                          <div className="flex gap-2">
                            <div className="flex flex-col">
                              <label htmlFor="firstName" className="text-sm font-semibold text-gray-600 mb-1">
                                First Name
                              </label>
                              <input
                                id="firstName"
                                className="input_2"
                                type="text"
                                onChange={(e) => setFirstName(e.target.value)}
                                onClick={resetError}
                                value={firstName}
                                name="first name"
                                required
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="lastName" className="text-sm font-semibold text-gray-600 mb-1">
                                Last Name
                              </label>
                              <input
                                id="lastName"
                                className="input_2"
                                type="text"
                                onChange={(e) => setLastName(e.target.value)}
                                onClick={resetError}
                                value={lastName}
                                name="last name"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-1">
                              Email
                            </label>
                            <input
                              id="email"
                              className="input_2"
                              type="email"
                              onChange={(e) => setEmail(e.target.value)}
                              onClick={resetError}
                              value={email}
                              name="email"
                              required
                            />
                          </div>
                          <div className="flex gap-2">
                            <div className="flex flex-col">
                              <label htmlFor="password" className="text-sm font-semibold text-gray-600 mb-1">
                                Password
                              </label>
                              <input
                                id="password"
                                className="input_2"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                onClick={resetError}
                                value={password}
                                name="password"
                                required
                              />
                            </div>
                            <div className="flex flex-col">
                              <label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-600 mb-1">
                                Confirm Password
                              </label>
                              <input
                                id="confirmPassword"
                                className="input_2"
                                type="password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onClick={resetError}
                                value={confirmPassword}
                                name="confirm password"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <label htmlFor="institution" className="text-sm font-semibold text-gray-600 mb-1">
                              Institution
                            </label>
                            <input
                              id="institution"
                              className="input_2"
                              type="text"
                              onChange={(e) => setInstitution(e.target.value)}
                              onClick={resetError}
                              value={institution}
                              name="institution"
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-8 bg-blue-gradient w-[100%] py-4 rounded-[5px] text-white text-[18px] font-semibold"
                          >
                            Sign up
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        
        export default RegisterForm;
