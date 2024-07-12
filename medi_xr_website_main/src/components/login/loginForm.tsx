"use client";

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

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
                <div className="flex flex-col h-fit bg-white w-full max-w-md p-8 bg-opacity-50 rounded-lg shadow-lg">
                    <div>
                        <div className="flex flex-col items-center justify-center py-8">
                            <h1 className="text-primary font-poppins font-bold text-3xl max-sm:text-xl">Login</h1>
                        </div>
                        <div>
                            <form onSubmit={handleLogin}>
                                <div className="mx-8">
                                    <div className={`${errorMessage ? '' : 'hidden'} bg-red-100 rounded h-fit py-4 px-4 mb-6 text-red-500`}>
                                        <span className="text-red-600 font-bold">Error: </span>{errorMessage}
                                    </div>
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-1">
                                      Email
                                    </label>
                                    <input 
                                        className="input_2"
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        onClick={() => setErrorMessage('')}
                                        value={email}
                                        name="email"
                                        required
                                    />
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-600 mb-1">
                                       Password
                                    </label>
                                    <input 
                                        className="input_2"
                                        type="password" 
                                        onChange={(e) => setPassword(e.target.value)}
                                        onClick={() => setErrorMessage('')}
                                        value={password}
                                        name="password"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="mt-8 bg-blue-gradient w-full py-4 rounded text-white text-lg font-semibold"
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
