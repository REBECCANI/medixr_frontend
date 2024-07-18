'use client'

import { useRouter } from 'next/navigation';
import React, { useState, FormEvent } from 'react';

const ResetPassword = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const baseUrl = 'http://localhost:5000';

    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log('Form submitted');

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            console.log('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/resetpassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    email,
                    newPassword: password,
                }),
                credentials: 'include'
            });

            const responseData = await response.json();

            console.log('Response data:', responseData);

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to reset');
            }

            alert('Reset successful. You can now login with your new password.');
            router.push('/login');
        } catch (error) {
            console.error('Reset failed:', error);
            if (error instanceof Error) {
                alert(`Failed to reset. Please try again. Error: ${error.message}`);
            } else {
                alert('Failed to reset. Please try again.');
            }
        }
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-bg-10 bg-cover bg-center">
            <div className='flex flex-col items-center justify-center py-8'>
                <h3 className='mt-8 mb-1 text-primary font-poppins font-bold text-white max-sm:text-xxl text-2xl'>Reset your Account Password</h3>
            </div>
            <div className="w-full max-w-md">
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <form onSubmit={handleResetPassword} className="mt-1 bg-white bg-opacity-30 rounded-2xl shadow-xl p-8 mx-8 flex flex-col items-center justify-center h-[80%]">
                    <label htmlFor="email" className="text-primary font-poppins font-bold text-white mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mb-4 p-2 w-full rounded-full bg-white bg-opacity-20"
                    />
                    <label htmlFor="password" className="text-primary font-poppins font-bold text-white mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4 p-2 w-full rounded-full bg-white bg-opacity-20"
                    />
                    <label htmlFor="confirmPassword" className="text-primary font-poppins font-bold text-white mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mb-4 p-2 w-full rounded-full bg-white bg-opacity-20"
                    />
                    <button type="submit" className="mt-2 bg-gradient-to-r from-purple-500 to-blue-500 w-[50%] h-[10px] py-4 rounded-full text-white flex items-center justify-center text-lg font-semibold">
                        Reset
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
