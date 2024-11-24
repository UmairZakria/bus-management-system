'use client'

import React from 'react'
import { SessionProvider, useSession } from "next-auth/react";
import Navbar from '@/components/Navbar';
import { useState, useEffect } from "react";
import axios from 'axios'
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";



const Pagework = () => {
  const { data: session, status } = useSession();
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [whereto, setWhereto] = useState('')
  const [minDate, setMinDate] = useState("");

  const [search, setSearch] = useState([])
  const [search2, setSearch2] = useState([])

  const [should, setShould] = useState(true)
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
  const [prof ,setProf] = useState('')
  const getdata = () => {
    axios.get('/api/onbus')
      .then((res) => {
        setData(res.data.bus)
      })
      .catch((er) => { console.log(err) })
  }
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    setMinDate(today);
    getdata()

    if (data.length === 0) {
      getdata()



    }
  }, [])

  useEffect(() => {

    const searchdata = data.filter(item =>
      item.fromto.toLowerCase().includes(searchQuery.toLowerCase())
    )
    if (should) {

      setSearch(searchdata)
    }
    if (searchQuery === '') {
      setSearch([])
      setShould(true)


    }



  }, [searchQuery])

  useEffect(() => {

    const searchdata = data.filter((item) => item.fromto === searchQuery)
    if (should) {

      setSearch2(searchdata)
    }

    if (whereto === '') {
      setSearch2([])
      setShould(true)


    }



  }, [whereto])
  const handelquery = (fromto) => {
    setSearchQuery(fromto)
    setShould(false)
    setSearch([])



  }
  const handelquery2 = (whereto) => {
    setWhereto(whereto)
    setShould(false)
    setSearch2([])



  }
  const handelbook = (id) => {
    if (!session) {
      router.push('/Login')

    } else if (session) {
      router.push(`Bookbus/${id}`)


    }
  }
  function Format(time) {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  }


  const handelsubmit = (e) => {
    e.preventDefault()
    const searchdata = data.filter(item =>
      item.fromto.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setProf('Your Search Busses: ')
    setTimeout(() => {
      setProf('')
    }, 3000);
    setData2(searchdata)


  }




  return (
    <>
      <Navbar></Navbar>
      <div className='w-full  h-screen relative'>
        <img className='w-full object-cover h-full' src="https://images.pexels.com/photos/2224424/pexels-photo-2224424.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <motion.div 
        initial={{scale:0.1,opacity:0.1}} 
        
        
        animate={{scale:1,opacity:1}} 
        transition={{delay:1,duration:1}}
        
        className='absolute space-y-4  bg-[#00000063] py-10 bottom-5  p-8  px-16 left-0 w-full  h-auto'>

          <div>
            <h1 className='font-semibold text-white text-2xl md:text-3xl lg:text-3xl text-center lg:text-start md:text-start'>Search for Bus</h1>
            <span className='text-gray-400'>Find the best deals for your bus travel</span>
          </div>
          <form onSubmit={handelsubmit} className='flex lg:flex-row md:flex-row flex-wrap justify-center   gap-4 items-center'>
            <div className='flex  relative flex-col flex-grow '>

              <input placeholder='From'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

                className='px-4  hover:border border border-pp transition-all ease-out duration-700 bg-[#5d6e7e] text-white   py-3   ' type="text" />
              <div className="absolute top-[54px] left-0 w-full z-[100] bg-white">

                {

                  search.map((data) => (
                    <div onClick={() => handelquery(data.fromto)} key={data._id} className=' bg-white w-full cursor-pointer'>
                      <h2 className='p-2'>{data.fromto}</h2>


                    </div>


                  ))



                }
              </div>
            </div>
            <div className='flex  relative flex-col flex-grow '>

              <input placeholder='Where to'
                value={whereto}
                onChange={(e) => setWhereto(e.target.value)}
                className='px-4  hover:border flex-grow border border-pp transition-all ease-out duration-700 bg-[#5d6e7e] text-white   py-3  ' type="text" />
              <div className="absolute top-[54px] left-0 w-full  bg-white">

                {

                  search2.map((data) => (
                    <div onClick={() => handelquery2(data.whereto)} key={data._id} className=' bg-white w-full cursor-pointer'>
                      <h2 className='p-2'>{data.whereto}</h2>


                    </div>


                  ))



                }
              </div>
            </div>



            <input
              min={minDate}
              placeholder='Departure Date' className='bg-[#5d6e7e] text-white flex-grow  py-3  px-4' type="date" name="" id="" />
            <input type="submit" value="Search" className='px-4 hover:border border border-pp transition-all ease-out duration-700 bg-[#5d6e7e]  text-white  m-1 py-3 hover:bg-transparent  ' />
          </form>

        </motion.div>
      </div>
      <div className='container space-y-3 px-2 my-5 l mx-auto'>
        <label htmlFor="" className='text-lg text-red-700 text-center'>{prof}</label>
        <h1 className="text-center text-3xl w-full">{data2.length > 0 ? "Buses You Search": ""}</h1>

        {
          data2.length > 0 ? (
          data2.map((data) => (

              <div key={data._id} className='border relative rounded-lg p-2 justify-between flex-wrap flex gap-4' >
                <div className='flex flex-col  justify-center gap-4 '>
                  <div className="flex gap-1 flex-col -center">

                    <h1 className='text-2xl '>{data.date}</h1>
                    <p className='space-x-2 '><span className='font-semitbold text-xl'>From : </span>{data.fromto}   <span className='font-semitbold text-xl'>Where To :</span> {data.whereto} <span className='font-semitbold text-xl'>Time : </span>{data.time ? Format(data.time) : ''} <span className='font-semitbold text-xl'>Seats Price : </span> Rs. {data.seatprice} </p>


                  </div>
                  <div className='text-sm dark:text-gray-400 '>
                    {data.message}
                  </div>


                </div>
                <button onClick={() => handelbook(data._id)} className='px-4 bg-pp py-3 lg:py-1 text-white'>BOOK NOW</button>

              </div>

          ))

        ):''
      }

      </div>



      <div  style={{ overflow: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className='container space-y-3 px-2 my-5 l mx-auto'>
        <h1 className="text-center text-3xl w-full">Book Your Bus Now!</h1>

        {
          data.map((data,index) => (

            <motion.div
            initial={{scale:0.4}}
            whileInView={{scale:1}}
            transition={{delay: 0.2*index,duration: 1}}
            viewport={{once: true}}
            
            key={data._id} className='border relative rounded-lg p-2 justify-between flex-wrap flex gap-4' >
              <div className='flex flex-col  justify-center gap-4 '>
                <div className="flex gap-1 flex-col -center">

                  <h1 className='text-2xl '>{data.date} </h1>
                  <p className='space-x-2 '><span className='font-semitbold text-xl'>From : </span>{data.fromto}   <span className='font-semitbold text-xl'>Where To :</span> {data.whereto} <span className='font-semitbold text-xl'>Time : </span>{data.time ? Format(data.time) : ''} <span className='font-semitbold text-xl'>Seats Price : </span> Rs. {data.seatprice} </p>


                </div>
                <div className='text-sm dark:text-gray-400 '>
                  {data.message}
                </div>


              </div>
              <button onClick={() => handelbook(data._id)} className='px-4 bg-pp py-3 lg:py-1 text-white'>BOOK NOW</button>

            </motion.div>
          ))}

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


