"use client"
import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from "next-auth/react";

import logo from './ui/logo.png'
import { signOut } from "next-auth/react";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage menu open/close

    const { data: session } = useSession();
    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };


    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the menu state
    };
    return (
        <div className='     fixed bg-white top-0 items-center h-[80px]  z-[100]  w-full backdrop-blur-lg bg-opacity-10'>
            <div className='container flex justify-between items-center  h-full mx-auto w-full '>

                <div className='text-3xl   bg-gradient-to-l from-indigo-500 via-green-700  to-green-600 bg-clip-text text-transparent ' >
                    <Image src={logo} alt={'logo'} className='w-[140px]' ></Image>
                </div>
                <ul className='lg:flex md:flex hidden items-center justify-center  gap-1  md:text-md  lg:text-lg'>
                    <Link className='px-4 py-2 hover:text-white  hover:bg-pp ' href={session ? '/Home' : '/'} >Home</Link>
                    <Link className='px-4 py-2 hover:text-white  hover:bg-pp ' href={'/Contact'} >Contact Us</Link>
                    <span className='mx-4'>|</span>
                    {!session ?
                        (
                            <>

                                <Link className='px-4 hover:border border border-[#5d6e7e] transition-all ease-out duration-700 bg-[#5d6e7e] text-white  m-1 py-3 hover:bg-transparent  ' href={'/Login'} >Login</Link>
                                <Link className='px-4  hover:text-white border  m-1 py-3 hover:bg-pp   transition-all ease-out duration-700 ' href={'/Rigister'} >Rigister</Link>
                            </>
                        ) : (



                            <button className='px-4 hover:border border border-[#5d6e7e] transition-all ease-out duration-700 bg-[#5d6e7e] text-white  m-1 py-3 hover:bg-transparent  ' type='button' onClick={handleLogout}>Logout </button>
                        )

                    }


                </ul>
                <button onClick={toggleMenu} className="md:hidden mr-3 z-50">
                    {isOpen ? (
                        // <XMarkIcon className="h-8 w-8 text-gray-800" />
                        <img className='w-[30px] active:rotate-90 transition-all ease-out duration-75' src="https://img.icons8.com/ios-filled/50/5d6e7e/close-window.png" alt="close-window" />

                    ) : (
                        // <Bars3Icon className="h-8 w-8 text-gray-800" />

                        <img className='w-[30px] active:rotate-90 transition-all ease-out duration-75' src="https://img.icons8.com/ios-filled/50/5d6e7e/menu.png" alt="menu" />
                    )}
                </button>

                <div
                    className={`fixed z-[100] py-2 text-lg  lg:hidden md:hidden flex-col  top-0 translate-y-[80px] left-0 w-full h-auto font-normal bg-pp text-white  transform ${isOpen ? 'flex ' : 'hidden '
                        }z-50`}
                >
                    <Link onClick={() => setIsOpen(false)} className='py-4 px-5  hover:bg-white hover:text-pp' href={session ? '/Home' : '/'} >Home</Link>
                    <Link onClick={() => setIsOpen(false)} className='py-4 px-5  hover:bg-white hover:text-pp' href={'/Contact'}>Contact Us</Link>
                    {!session ?
                        (<>
                            <Link onClick={() => setIsOpen(false)} className='py-4 px-5  hover:bg-white hover:text-pp' href={'/Login'}>Login</Link>
                            <Link onClick={() => setIsOpen(false)} className='py-4 px-5  hover:bg-white hover:text-pp' href={'/Rigister'}>Rigister</Link>
                        </>

                        ):(

                            <button className='py-4 px-5 text-start  hover:bg-white hover:text-pp' type='button' onClick={handleLogout}>Logout </button>

                        )}


                </div>

            </div>


        </div>
    )
}

export default Navbar
