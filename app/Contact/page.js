'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { SessionProvider } from 'next-auth/react'
import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'


const page = () => {
    const ImageURL = "https://images.pexels.com/photos/12334701/pexels-photo-12334701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const [name, setName] = useState('')
    const [profile, setProfile] = useState('')

    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [title, setTitle] = useState('')


    const handelsubmit = (e) => {
        e.preventDefault();

        axios.post('/api/message', { name, email, message, title })
            .then((res) => {
                console.log(res)
                setProfile('Message Sended Successfully!')
                setTimeout(() => {
                    setProfile('')
                }, 3000);

            })
            .catch((err) => { console.log(err) })
    }
    return (
        <>
            <div>
                <SessionProvider>
                    <Navbar />
                </SessionProvider>
            </div>

            <div>

                <motion.div
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1.5,duration:1.2}}
                
                
                
                className="flex flex-col md:flex-row md:gap-2 mt-[80px] h-auto lg:flex-row items-center p-6  ">
                    <div className="w-full h-[90vh] lg:w-1/2 mb-6 lg:mb-0 ">
                        <img
                            src={ImageURL}
                            alt="Doctor"
                            className="w-full rounded-lg shadow-md object-cover h-full"
                        />
                    </div>

                    {/* Right Side: page Form */}

                    <div className="w-full h-full lg:w-1/2 lg:pl-8">

                        <h4 className="text-green-500 font-semibold">Contact US</h4>
                        <h1 className=" text-3xl lg:text-4xl font-bold mt-2 mb-6">
                            Send a Message && Feedback
                        </h1>

                        <form onSubmit={handelsubmit} className="space-y-4">
                            <label htmlFor="" className="text-xl text-red-600">{profile}</label>
                            <div className="flex flex-col lg:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Your Name *"
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md text-lg"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email *"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md text-lg"
                                />
                            </div>

                            <div className="flex flex-col lg:flex-row gap-4">

                                <input
                                    type="text"
                                    placeholder="Subject *"
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md text-lg"
                                />
                            </div>

                            <textarea
                                required
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Message"
                                className="w-full p-3 border border-gray-300 rounded-md text-lg h-32"
                            />

                            <button
                                type="submit"
                                className="w-full lg:w-auto bg-green-500 text-white font-semibold py-3 px-6 rounded-md flex items-center justify-center space-x-2 hover:bg-green-600"
                            >
                                <span>SUBMIT NOW</span>
                            </button>
                        </form>
                    </div>
                </motion.div>

            </div>

        </>

    )
}

export default page
