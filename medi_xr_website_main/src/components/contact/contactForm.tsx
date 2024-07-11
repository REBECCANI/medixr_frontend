'use client'

import React, { useState, FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { v4 as uuidv4 } from 'uuid';


const ContactForm = () => {
    const [errorMessage, setErrorMessage] = useState("")
    const [request, setRequest] = useState("demo")
    const [description, setDescription] = useState("")
    const [email, setEmail] = useState("")

    const sendMail = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        const token = uuidv4()

        emailjs
            .send(
                'service_wzjrq9r', 
                'template_gayj0y7', 
                {
                    from_name: email,
                    to_name: 'Medi XR',
                    from_email: email,
                    message: `request: ${request}\n Confirmation Token: ${token}`
                }, 
                {
                    publicKey: '-EsYfZplrPpvLwe0f',
                }
            )
            .then(
                () => {
                    alert("Thank you. Check your email for a confirmation message.")
                },
                (error: any) => {
                    setErrorMessage(error.text)
                },
            )
    }

    const resetError = () => {
        setErrorMessage("")
    }


  return (
    <div>
      <div className="h-[100%] my-12">
        <div className="flex justify-center items-center h-[100%]">
            <div className="flex flex-col h-fit bg-white w-[100%]">
                <div>
                    <div className="flex flex-col items-center justify-center py-8">
                        <h1 className="text-primary font-poppins font-bold text-[3rem] max-sm:text-[1.5rem]">Request a Demo</h1>
                        <p className="text-center">Let us know what you need</p>
                    </div>
                    <div>
                    <form onSubmit={sendMail} encType="multipart/form-data">
                                    <div className="mx-8">
                                        <div className={`${!errorMessage && "hidden"} bg-red-100 rounded-[5px] h-fit py-4 px-4 mb-6 text-red-500`}>
                                            <span className="text-red-600 font-bold">Error: </span>{errorMessage}
                                        </div>
                                        <input 
                                            placeholder="Email"
                                            className="input_2"
                                            type="email"
                                            onChange={(e) => setEmail(e.target.value)}
                                            onClick={resetError}
                                            value={email}
                                            name="email"
                                            required
                                        />
                                        <div className="mb-4">
                                            <label htmlFor="request_type" className="ml-4 mb-8 text-[16px] text-gray-400">Request type</label>
                                            <select 
                                                className="input_2 px-4" 
                                                onChange={(e) => setRequest(e.target.value)} 
                                                value={request} 
                                                name="request_type"
                                                required
                                            >
                                                <option value="demo">Demo</option>
                                                <option value="query">Query</option>
                                                <option value="support">Support</option>
                                            </select>
                                        </div>
                                        <textarea 
                                            placeholder="Description"
                                            className="input_3 w-[100%] h-[130px] py-2"
                                            onChange={(e) => setDescription(e.target.value)}
                                            onClick={resetError}
                                            value={description}
                                            name="description"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="mt-8 bg-blue-gradient w-[100%] py-4 rounded-[5px] text-white text-[18px] font-semibold"
                                        >
                                            Contact Us
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactForm