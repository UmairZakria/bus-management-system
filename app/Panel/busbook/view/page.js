'use client'
import React from 'react'
import { useState, useEffect } from "react";
import axios from 'axios'
import { format } from 'date-fns';

// import Navbar from './Components/Navbar'
const Message = () => {
    const [profile, setProfile] = useState('')
    const [data, setData] = useState([])


    const getdata = () => {
        axios.get('/api/onbus')
            .then((res) => {
                console.log(res)
                setData(res.data.bus)
            })
            .catch((er) => { console.log(err) })
    }
    useEffect(() => {
        if (profile !== '') {
            window.scroll(0, 0)
            setTimeout(() => {
                setProfile('')
            }, 2000);
        }
        getdata()
    }, [profile])
    const handeldelete = (id) =>{
        axios.delete(`/api/onbus?id=${id}`)
        .then((res) =>{console.log(res)
          if (res.data.status === 'success'){
            setProfile('Bus Time Deleted Successfully!')
          }else {
            setProfile('Bus not found')
          }
    
    
        })
        .catch((err)=> {console.log(err)})
      }
    return (
        <div>

            <div className="container mx-auto w-full space-y-4  my-4 p-4 rounded-xl">
                <label htmlFor="" className="text-xl text-red-600">{profile}</label>

                {
                    data.map((data) => (

                        <div key={data._id} className='border relative rounded-lg p-2 flex gap-4' >
                            <button onClick={()=>handeldelete(data._id)} className='w-[36px] h-[36px]  absolute lg:top-6 md:top-6 bottom-2 right-4'>

                                <img className='w-[36px] h-[36px]  absolute lg:top-6 md:top-6 bottom-2 right-4' src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/external-dustbin-smart-home-flatart-icons-lineal-color-flatarticons.png" alt="" />
                            </button>
                            <div className='flex flex-col  justify-center gap-4 '>
                                <div className="flex gap-1 flex-col -center">

                                    <h1 className='text-2xl '>{data.date}</h1>
                                    <p className='space-x-2 '><span className='font-semitbold text-xl'>From : </span>{data.fromto}   <span className='font-semitbold text-xl'>Where To :</span> {data.whereto} <span className='font-semitbold text-xl'>Time : </span>{data.time} </p>
                                    

                                </div>
                                <div className='text-sm dark:text-gray-400 '>
                                    {data.message}
                                </div>
                            </div>
                        </div>
                    ))}

            </div>
        </div>
    )
}

export default Message
