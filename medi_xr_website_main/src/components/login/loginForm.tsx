"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const baseurl = 'http://localhost:5000';

        try {
            const response = await fetch(`${baseurl}/login`, {  
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' 
            });

            if (!response.ok) {
                const responseData = await response.json();
                throw new Error(responseData.error || 'Failed to login');
            }

            alert('You have successfully logged into your account!');
            router.push('/dashboard');
        } catch (error) {
            console.error('Logging in failed:', error);
            if (error instanceof Error) {
                setErrorMessage(`Failed to Login. Please try again. Error: ${error.message}`);
            } else {
                setErrorMessage('Failed to Login. Please try again.');
            }
        }
    };

    return (
        <div className="h-full my-12">
            <div className="flex justify-center items-center h-full">
                <div className="flex flex-col h-[50%] bg-white w-full max-w-md p-8 bg-opacity-20 rounded-3xl shadow-xl">
                    <div>
                        <div className="flex flex-col items-center justify-center py-8">
                            <h1 className="text-primary font-poppins font-bold text-white max-sm:text-xxl text-5xl">Login</h1>
                        </div>
                        <div>
                            <form onSubmit={handleLogin}>
                                <div className="mx-8">
                                    <div className={`${errorMessage ? '' : 'hidden'} bg-red-100 rounded h-fit py-4 px-4 mb-6 text-red-500`}>
                                        <span className="text-red-600 font-bold">Error: </span>{errorMessage}
                                    </div>
                                    <label htmlFor="email" className="text-white font-semibold text-gray-600 mb-4">
                                      Email
                                    </label>
                                    <input 
                                        className="w-[100%] h-[40px] bg-white bg-opacity-20 rounded-full mb-4"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onClick={() => setErrorMessage('')}
                                        value={email}
                                        name="email"
                                        required
                                    />
                                    <label htmlFor="password" className="text-white font-semibold text-gray-600 mb-4">
                                       Password
                                    </label>
                                    <input 
                                        className="px-4 w-[100%] h-[40px] mb-4 bg-white bg-opacity-20 rounded-full"
                                        type="password" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        onClick={() => setErrorMessage('')}
                                        value={password}
                                        name="password"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 w-[40%] flex mx-auto py-4 rounded-full text-white text-md items-center justify-center font-semibold"
                                    >
                                        Login
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


export default LoginForm;
