"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import React from "react";
import Navbar from "@/components/Navbar";

import oeye from './images/openeye.png'
import Link from 'next/link'
import Image from 'next/image'

import ceye from './images/closedeye.png'
import loading from './images/loading.gif'
// import axios from 'axios'
import { SessionProvider,useSession } from "next-auth/react";



const Pagework = () => {
    // const { data: session,status } = useSession();

    const [email, setEmail] = useState('')
    const router = useRouter();
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);
    // const navi = useNavigate()
    const [passwordeye, setPasswordeye] = useState(ceye)
    const [passwordtype, setPasswordtype] = useState("password"

    )
    const [loadings, setLoadings] = useState({ display: 'none' })



    const handeleye = () => {
        if (passwordeye == ceye) {
            setPasswordtype('text')
            setPasswordeye(oeye)
        } else {
            setPasswordtype('password')
            setPasswordeye(ceye)
        }

    }


    const handellogin = async (e) => {
        setLoadings({ display: 'flex' })
        e.preventDefault();
        console.log(email,
            password,)
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password
        });
        console.log(result)

        if (result.error) {
            setLoadings({ display: 'none' })
            console.log(result.error)

            setError('Invalid Email and password');
            setTimeout(() => {
                setError('');

            }, 3000);
        } else {
            const session = await getSession();
            if (session?.user?.role === "user"){

                router.push("/Home");
            }else if (session?.user?.role === "admin"){
                router.push("/Panel");

            }else (
                router.push("/Contact")
            )


        }

    }
    return (
    <>
        <Navbar />


        <div className='w-full lg:h-screen h-screen relative' >
            <img className='w-full object-cover h-full' src="https://images.pexels.com/photos/29008426/pexels-photo-29008426/free-photo-of-vintage-tram-interior-in-wroclaw.jpeg" alt="" />
            <div className='absolute space-y-4  bg-[#00000085] py-10 bottom-5     px-2 left-0 w-full  h-auto'>
                {/* <div className='relative' > */}
                <div style={loadings} className='absolute top-0 left-0 rounded-2xl  w-full h-full box-border p-4 flex items-center justify-center z-50 bg-[#0000004d]'>

                    <Image
                        className=" object-cover    "
                        src={loading} // Path to your image
                        sizes={50}
                        alt="Description of image"
                    />
                </div>
                <form onSubmit={handellogin} className=' bg-[#000000b4] px-6 w-full lg:w-1/3 md:w-1/2 gap-6 mx-auto   mt-2 py-6 flex flex-col'>
                    {error && <p style={{ color: 'red' }}> {error} </p>}

                    <label className='text-[white]  text-center  font-medium text-2xl' >Login </label>


                    <div className='flex flex-col '>

                        <label htmlFor="Email" className='text-white font-medium text-sm ' >Email Address</label>
                        <input type="email" required className='pt-2  text-white focus:outline-none px-2 border-pp bg-transparent  border-x-0 border-t-0 border-b-4 '
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                    <div className='flex flex-col gap-1'>

                        <label className='text-white font-medium text-sm ' htmlFor="Password">Password</label>
                        <div className='w-full relative'>
                            <input required type={passwordtype} className=' text-white pt-2 px-2 w-full border-gray-700  focus:outline-none bg-transparent border-b-4 border-x-0 border-t-0'
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className='p-[3px] bg-pp absolute rounded-t-md -top-1     right-0  '>

                                <Image
                                    className=" object-cover  "
                                    src={passwordeye} // Path to your image
                                    alt="Description of image"

                                    width={30}
                                    onClick={handeleye}
                                    height={30}
                                // layout='responsive'
                                />

                            </div>
                        </div>
                    </div>
                    <Link href={'/Rigister'} className="text-white underline">Did not have account Rigister Now!</Link>
                    <input type="submit" value={'Login Now'} className='text-white shadow-sm bg-pp hover:opacity-80  active:bg-opacity-80 cursor-pointer py-3  mt-3' />
                </form>
            </div>

            {/* </div> */}
        </div>
    </>

    )
}


export default function page() {
    return (
      <SessionProvider>
        <Pagework />
      </SessionProvider>
    );
  }
