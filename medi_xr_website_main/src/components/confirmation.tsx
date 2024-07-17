import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ConfirmationPage = () => {
  const router = useRouter();
  const { token } = router.query; // Assuming you extract token from query params

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          // Email verified successfully, redirect to login page
          router.push('/login');
        } else {
          // Handle error cases
          console.error('Email verification failed:', data.error);
          // Redirect to an error page or handle as appropriate
        }
      } catch (error) {
        console.error('Error confirming email:', error);
        // Handle network or unexpected errors
      }
    };

    if (token) {
      confirmEmail();
    }
  }, [token, router]);

  return (
    <div>
      <h1>Confirming Email...</h1>
      {/* Add loading or confirmation message if needed */}
    </div>
  );
};

export default ConfirmationPage;
