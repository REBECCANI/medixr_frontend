'use client'; // Directive indicating that this file is a client-side component, allowing React hooks and client-side features.

import React, { useState, FormEvent } from 'react'; // Import React and necessary hooks/types from React for component state and form events.
import emailjs from '@emailjs/browser'; // Import emailjs library for sending emails using email templates.
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 function to generate unique tokens.
import { Metadata } from 'next'; // Import Metadata type from Next.js for setting page metadata.

export const metadata: Metadata = { // Define metadata for the page.
  title: 'Register', // Page title
  description: 'Register for Medi XR', // Page description
};

const RegisterForm = () => { // Define the RegisterForm functional component.
    const [errorMessage, setErrorMessage] = useState(""); // State to store error messages.
    const [firstName, setFirstName] = useState(""); // State to store the user's first name.
    const [lastName, setLastName] = useState(""); // State to store the user's last name.
    const [email, setEmail] = useState(""); // State to store the user's email.
    const [password, setPassword] = useState(""); // State to store the user's password.
    const [confirmPassword, setConfirmPassword] = useState(""); // State to store password confirmation.
    const [institution, setInstitution] = useState(""); // State to store the user's institution.
    const [category, setCategory] = useState(""); // State to store the user's category.

    const baseUrl = 'http://localhost:5000'; // Base URL for API requests.

    const sendMail = async (e: FormEvent<HTMLFormElement>) => { // Function to handle form submission and send email.
        e.preventDefault(); // Prevent the default form submission behavior.

        if (password !== confirmPassword) { // Check if passwords match.
            setErrorMessage("Passwords do not match"); // Set an error message if passwords do not match.
            return; // Exit the function to prevent further execution.
        }

        const token = uuidv4(); // Generate a unique token for verification.
        const verificationLink = `${baseUrl}/verify/${token}`; // Create a verification link with the token.

        const templateParams = { // Define the parameters for the email template.
            from_name: 'Medi XR', // Sender's name.
            to_name: lastName, // Recipient's name.
            to_email: email, // Recipient's email address.
            link: verificationLink, // Verification link to include in the email.
        };

        try {
            await emailjs.send('service_h9j63h5', 'template_wwv9mmm', templateParams, '9fnX19H-Z6IBp4IYD'); // Send the email using emailjs.
            console.log('Email sent with template params:', templateParams); // Log the email parameters to the console for debugging.
          
            const response = await fetch(`${baseUrl}/register`, {  // Send a POST request to the registration endpoint.
              method: 'POST', // HTTP method for the request.
              headers: { // Request headers.
                'Content-Type': 'application/json', // Specify JSON content type.
                Accept: 'application/json' // Accept JSON responses.
              },
              body: JSON.stringify({ // Convert form data to JSON and include in the request body.
                firstName,
                lastName,
                email,
                password,
                institution,
                category,
                verificationToken: token, // Include the verification token.
              }),
            });
      
            const responseData = await response.json(); // Parse the JSON response from the server.
      
            if (!response.ok) { // Check if the response indicates an error.
              throw new Error(responseData.error || 'Failed to register'); // Throw an error if registration failed.
            }
      
            alert('Registration successful! Check your email for verification link.'); // Alert user of successful registration.
          } catch (error) { // Catch any errors that occur during the registration process.
            console.error('Registration failed:', error); // Log the error to the console for debugging.
            if (error instanceof Error) { // Check if the error is an instance of the Error class.
              alert(`Failed to register. Please try again. Error: ${error.message}`); // Alert user with the error message.
            } else {
              alert('Failed to register. Please try again.'); // Alert user with a generic error message.
            }
          };
          
        };

        const resetError = () => { // Function to reset the error message.
          setErrorMessage(""); // Clear the error message.
        }

        return (
          <div className="h-[100%] my-12"> {/* Outer container with full height and margin-top */}
            <div className="flex justify-center items-center h-[100%]"> {/* Center container horizontally and vertically */}
              <div className="flex flex-col h-[80%] mt-[-130px] bg-white w-[100%] bg-opacity-30 rounded-3xl shadow-xl mr-[100px]"> {/* Form container with flex column layout, height, margin-top, background color, opacity, rounded corners, shadow, and margin-right */}
                <div>
                  <div className="flex flex-col items-center justify-center"> {/* Center header content horizontally and vertically */}
                    <h1 className="text-primary font-poppins mb-4 mt-4 font-bold text-white text-2xl max-sm:text-[1.5rem]">Create Account</h1> {/* Header text with primary color, font, margin, bold font, white text color, responsive text size */}
                  </div>
                  <div>
                    <form onSubmit={sendMail} encType="multipart/form-data"> {/* Form element with submission handler and multipart encoding */}
                      <div className="mx-8"> {/* Container with horizontal margin */}
                        <div className={`${errorMessage ? '' : 'hidden'} bg-red-100 rounded-[5px] h-fit py-4 px-4 mb-6 text-red-500`}> {/* Error message container, visible if there is an error, with background color, rounded corners, padding, margin-bottom, and text color */}
                          <span className="text-red-600 font-bold">Error: </span> {/* Error label with color and bold font */}
                          {errorMessage} {/* Display error message */}
                        </div>
                        <div className="flex gap-2"> {/* Container for name fields with gap between items */}
                          <div className="flex flex-col"> {/* Container for first name field with flex column layout */}
                            <label htmlFor="firstName" className="text-white font-semibold text-gray-600 mb-1"> {/* Label for first name field with color, font weight, and margin-bottom */}
                              First Name
                            </label>
                            <input
                              id="firstName"
                              className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                              type="text"
                              onChange={(e) => setFirstName(e.target.value)} // Update first name state on change
                              onClick={resetError} // Reset error message on click
                              value={firstName} // Bind input value to state
                              name="first name"
                              required // Make this field required
                            />
                          </div>
                          <div className="flex flex-col"> {/* Container for last name field with flex column layout */}
                            <label htmlFor="lastName" className="text-white font-semibold text-gray-600 mb-1"> {/* Label for last name field with color, font weight, and margin-bottom */}
                              Last Name
                            </label>
                            <input
                              id="lastName"
                              className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                              type="text"
                              onChange={(e) => setLastName(e.target.value)} // Update last name state on change
                              onClick={resetError} // Reset error message on click
                              value={lastName} // Bind input value to state
                              name="last name"
                              required // Make this field required
                            />
                          </div>
                        </div>
                        <div className="flex flex-col"> {/* Container for email field with flex column layout */}
                          <label htmlFor="email" className="text-white font-semibold text-gray-600 mt-3 mb-3"> {/* Label for email field with color, font weight, and margin */}
                            Email
                          </label>
                          <input
                            id="email"
                            className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                            type="email"
                            onChange={(e) => setEmail(e.target.value)} // Update email state on change
                            onClick={resetError} // Reset error message on click
                            value={email} // Bind input value to state
                            name="email"
                            required // Make this field required
                          />
                        </div>
                        <div className="flex gap-2"> {/* Container for password fields with gap between items */}
                          <div className="flex flex-col"> {/* Container for password field with flex column layout */}
                            <label htmlFor="password" className="text-white font-semibold text-gray-600 mb-3"> {/* Label for password field with color, font weight, and margin-bottom */}
                              Password
                            </label>
                            <input
                              id="password"
                              className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                              type="password"
                              onChange={(e) => setPassword(e.target.value)} // Update password state on change
                              onClick={resetError} // Reset error message on click
                              value={password} // Bind input value to state
                              name="password"
                              required // Make this field required
                            />
                          </div>
                          <div className="flex flex-col"> {/* Container for confirm password field with flex column layout */}
                            <label htmlFor="confirmPassword" className="text-white font-semibold text-gray-600 mb-3"> {/* Label for confirm password field with color, font weight, and margin-bottom */}
                              Confirm Password
                            </label>
                            <input
                              id="confirmPassword"
                              className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                              type="password"
                              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on change
                              onClick={resetError} // Reset error message on click
                              value={confirmPassword} // Bind input value to state
                              name="confirm password"
                              required // Make this field required
                            />
                          </div>
                        </div>
                        <div className="flex flex-col"> {/* Container for institution field with flex column layout */}
                          <label htmlFor="institution" className="text-white font-semibold text-gray-600 mb-4"> {/* Label for institution field with color, font weight, and margin-bottom */}
                            Institution
                          </label>
                          <input
                            id="institution"
                            className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Input styling with background color, opacity, rounded corners, padding
                            type="text"
                            onChange={(e) => setInstitution(e.target.value)} // Update institution state on change
                            onClick={resetError} // Reset error message on click
                            value={institution} // Bind input value to state
                            name="institution"
                            required // Make this field required
                          />
                        </div>
                        <div className="flex flex-col"> {/* Container for category field with flex column layout */}
                          <label htmlFor="category" className="text-white font-semibold text-gray-600 mb-3"> {/* Label for category field with color, font weight, and margin-bottom */}
                            Category
                          </label>
                          <select
                            id="category"
                            className="bg-white bg-opacity-20 rounded-full px-2 py-1" // Select styling with background color, opacity, rounded corners, padding
                            onChange={(e) => setCategory(e.target.value)} // Update category state on change
                            onClick={resetError} // Reset error message on click
                            value={category} // Bind select value to state
                            name="category"
                            required // Make this field required
                          >
                            <option value="">Select category</option> {/* Default option */}
                            <option value="student">Student</option> {/* Option for student category */}
                            <option value="doctor">Doctor</option> {/* Option for doctor category */}
                            <option value="sponsor">Sponsor</option> {/* Option for sponsor category */}
                            <option value="health care center">Health Care Center</option> {/* Option for health care center category */}
                          </select>
                        </div>
                        <button
                          type="submit"
                          className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 w-[40%] flex mx-auto py-2 rounded-full items-center justify-center text-white text-[18px] font-semibold" // Button styling with margin-top, gradient background, width, flexbox centering, padding, rounded corners, text color, font size, and font weight
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

export default RegisterForm; // Export the RegisterForm component for use in other parts of the application.
