import React from 'react'
import Link from 'next/link'
import { signOut } from "next-auth/react";
const Navbar = () => {

    const handleLogout = () => {
        signOut({ callbackUrl: "/" });
    };

    return (
        <div className='relative  z-[100]'>
            <nav


            className='bg-transparent fixed bottom-0 left-1/2 md:left-0 md:translate-x-0  md:top-1/2 md:-translate-y-1/2  lg:left-0 lg:translate-x-0  lg:top-1/2 lg:-translate-y-1/2 -translate-x-1/2 flex gap-6  justify-around items-center w-full md:w-[80px] lg:w-[80px] h-[80px] lg:h-[auto] md:h-auto '
            >



                <div className=' w-full  flex lg:flex-col md:flex-col rounded-md bg-[#000000] opacity-95  py-5  items-center justify-evenly'>
                    <Link href='/Panel' className={'    hover:bg-pp   p-2  '}>
                        <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/FFFFFF/home.png" alt="home" />
                    </Link>

                    <Link href='/Panel/messages' className={'hover:animate-bounce    hover:bg-pp   p-2   transition-all ease-in'}>
                        <img width="34" height="34" src="https://img.icons8.com/sf-black-filled/64/FFFFFF/messaging-.png" alt="settings" />
                    </Link>
                    <Link href='/Panel/busbook/view' className={'hover:animate-pulse    hover:bg-pp   p-2   transition-all ease-in'}>
                        <img width="34" height="34" src="https://img.icons8.com/ios-filled/50/FFFFFF/org-unit.png" alt="settings" />
                    </Link>
                    <Link href='/Panel/busbook' className={'hover:animate-pulse    hover:bg-pp   p-2   transition-all ease-in'}>
                        <img width="34" height="34" src="https://img.icons8.com/external-bartama-glyph-64-bartama-graphic/64/FFFFFF/external-appointment-graphic-design-glyph-bartama-glyph-64-bartama-graphic.png" alt="settings" />
                    </Link>
                    <Link href='/Panel/setting' className={'hover:rotate-[44deg]    hover:bg-pp   p-2 rounded-full  active:rotate-[24deg] transition-all ease-in'}>
                        <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/FFFFFF/settings.png" alt="settings" />
                    </Link>

                    <div onClick={handleLogout} className='cursor-pointer     hover:bg-pp   p-2   '>
                        {/* <button onClick={handleLogout} type="button" className='text-white px-5 flex py-6 w-auto  font-semibold bg-bb hover:bg-[#0098ac]'> Logout</button> */}
                        <img width="32" height="32" src="https://img.icons8.com/ios-filled/50/FFFFFF/exit.png" alt="exit" />

                    </div>


                </div>




            </nav>


        </div>
    )
}

export default Navbar
