'use client'; // Directive indicating that this file is a client-side component, allowing for the use of hooks and other client-side features.

import React from 'react'; // Import React library to use JSX and create components.
import LoginForm from './loginForm'; // Import the LoginForm component from a local file for use in this component.
import { useRouter } from 'next/navigation'; // Import useRouter hook from Next.js to enable programmatic navigation.

const Login = () => { // Define the Login functional component.
  const router = useRouter(); // Initialize the useRouter hook to handle navigation within the component.

  const handleResetPassword = () => { // Define a function to handle navigation to the reset password page.
    router.push('/resetpassword'); // Use the router to navigate to the '/resetpassword' route.
  };

  return (
    <div className="h-screen flex justify-center items-center bg-bg-5 bg-cover bg-center"> {/* Container with full height, centered content, and background styling */}
      <div className="flex flex-col items-center justify-center w-[45%] xxl:w-[30%]"> {/* Flex container with column layout, centered content, and responsive width */}
        <LoginForm /> {/* Render the LoginForm component which contains the form for user login */}
        <div className='mt-4 flex items-center justify-center text-white'> {/* Container for the password reset link with margin-top, centered content, and white text */}
          <span className="mr-2 font-bold">Forgot password?</span> {/* Text label for the password reset link with margin-right and bold font */}
          <button onClick={handleResetPassword} className="hover:bg-blue-700 underline text-white font-bold">Click here</button> {/* Button that triggers the handleResetPassword function when clicked, with hover effect, underline style, and bold white text */}
        </div>
      </div>
    </div>
  );
};

export default Login; // Export the Login component for use in other parts of the application.
