'use client'
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";

import axios from 'axios'

const Register = () => {
    const router = useRouter()
    const [status,setStatus] = useState()
    const [url, setUrl] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState('')

    const getadmin = () =>{
        axios.get('/api/admin')
        .then((res) => {console.log(res)
            if(res.data.admin.length <= 0){
                setStatus(true)

            }else{
                setUrl('/api/register')

            }
        })
        .catch((err) => {console.log(err)})
        

        
    }
    useEffect(() => {
        getadmin()
        console.log(type) 
        
        if (type === 'user') {
            setUrl('/api/register')
            console.log(url)

        } else if (type === 'admin') {
            console.log(url)

            setUrl('/api/admin')

        }else {
            console.log(url)
        }
    

    }, [type])



    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [phoneCode, setPhoneCode] = useState("+92");

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form validation
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        } else if (formData.password.length < 6) {
            alert("Passwords must be greater then 6");
            return;
        }

        // Display form data or send it to the server
        setError('Loading...')
        window.scroll(0, 0)
        if (url === '') {
            setError('Please Select Rigister Type!')
            setTimeout(() => {
                setError('')


            }, 3000);
            return;


        } else if (url !== '') {

            axios.post(url, formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.status === 'success') {
                        setError('User Rigistered Succesfully !')
                        setTimeout(() => {
                            setError('')
                            router.push('/Login')


                        }, 3000);


                    } else if (res.data.status === 'already') {
                        setError('Email already Exist ! ')
                        setTimeout(() => {
                            setError('')


                        }, 3000);
                    } else {
                        setError('Server Error ! ')
                        setTimeout(() => {
                            setError('')


                        }, 3000);
                    }

                })
                .catch((err) => { console.log(err) })

        }

        // alert("Form submitted successfully!");
    };

    return (
        <>
            <div>
                <SessionProvider>
                    <Navbar></Navbar>
                </SessionProvider>

            </div>
            <div className="flex items-center justify-center  min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 space-y-4 mt-[90px] bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center">Create Account</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <label className='text-lg text-red-500 font-semibold'>{error}</label>
                        {/* Name */}
                        {
                            status?(

                        <div className="space-y-4">
                            <label htmlFor="name" className="block mb-1 font-medium">
                                Select Rigister Type
                            </label>
                            <div className="flex items-center gap-4 w-full ">
                                <label htmlFor="">User: </label>
                                <input value={'user'} type="radio" name="type" onChange={(e) => setType(e.target.value)} />
                                <label htmlFor="">Admin: </label>

                                <input value={'admin'} type="radio" name="type" onChange={(e) => setType(e.target.value)} />

                            </div>

                        </div>
                            ):('')
                        }

                        <div>
                            <label htmlFor="name" className="block mb-1 font-medium">
                                Name*
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block mb-1 font-medium">
                                Email*
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block mb-1 font-medium">
                                Phone*
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                {/* Country Code Selector */}
                                <select
                                    value={phoneCode}
                                    onChange={(e) => setPhoneCode(e.target.value)}
                                    className="px-3 py-2 border-none focus:ring-0 focus:outline-none bg-gray-100"
                                >
                                    <option value="+92">🇵🇰 +92</option>

                                </select>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Enter a phone number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border-l border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block mb-1 font-medium">
                                Password*
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            <p className="mt-1 text-sm text-gray-500">Must be at least 6 characters.</p>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
                                Confirm Password*
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        {/* Sign Up Button */}
                        <div>
                            <Link href={'/Login'} className="text-black underline">Already Have an Account Login Now!</Link>

                            <button
                                type="submit"
                                className="w-full px-4 py-2  mt-4  text-white bg-pp rounded-lg hover:opacity-85 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>

    );
};




export default Register;
