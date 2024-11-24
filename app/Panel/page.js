'use client'
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useState, useEffect } from 'react'

import { useRouter } from "next/navigation";
import { format } from 'date-fns';
import { motion } from 'framer-motion'

const page = () => {
  const router = useRouter()
  const [data, setData] = useState([])
  const [isScaled, setIsScaled] = useState(true);


  const [profile, setProfile] = useState('')
  const [businfo,setBusinfo] = useState({})
  const [infodisplay, setInfodisplay] = useState('none')



  const handelinfo = (data) =>{
    setInfodisplay('flex')
    window.scroll(0,0)
    document.body.style.overflow = 'hidden';

    setBusinfo(data)


  }
  const handelclose = () =>{
    setInfodisplay('none')
    document.body.style.overflow = 'auto';

    setBusinfo({})
  }
  const handelredrict = (title) => {
    setInfodisplay('none')
    document.body.style.overflow = 'auto';

    setBusinfo({})
    router.push(`/Panel/bus/Edit/${encodeURIComponent(title)}`)


  }
  const getdata = () => {
    axios.get('/api/addbus')
      .then((res) => {
        setData(res.data.bus)
      })
      .catch((err) => { console.log(err) })
  }
  const handeldelete = (id) =>{
    setIsScaled(!isScaled);

    setTimeout(() => {
      setInfodisplay('none')
      
    }, 2000);
    document.body.style.overflow = 'auto';

    setBusinfo({})
    axios.delete(`/api/addbus?id=${id}`)
    .then((res) =>{
      if (res.data.status === 'success'){
        setProfile('Bus Deleted Successfully!')
      }else {
        setProfile('Bus not found')
      }


    })
    .catch((err)=> {console.log(err)})
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
  return (
    <div className='relative '>
      <motion.div
  
      
      
      style={{display:infodisplay}} className='absolute h-screen flex items-center  justify-center top-0 left-0 w-full bg-[#000000ad] font-semibold z-[100]'>

        <motion.div
            initial={{scale:0}}
            whileInView={{scale:1}}
            transition={{delay:0.5,duration:1.2}}
        
        className="bg-white relative flex flex-wrap flex-col lg:flex-row items-center justify-around  w-[95%] h-auto gap-4 p-4 lg:w-1/2 md:w-1/2 ">
        <button onClick={handelclose} className='absolute top-3 right-3'><img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/multiply.png" alt="multiply"/></button>
          <h1 className="text-2xl font-semibold">BUS INFO</h1>
          <div className="flex items-center justify-around w-full">

            <img src={`/uploads/${businfo.image}`} className='lg:size-[150px] object-cover size-[120px] rounded-full' alt="bus image" />
            <h1 className="font-semibold text-gray-500 text-lg">{businfo.name}</h1>

          </div>
          <div className="flex items-center justify-around w-full ">
          <h1 className="font-semibold text-gray-500 text-lg">Bus Number: </h1>
          <p>{businfo.busNumber}</p>

          </div>
          <div className="flex items-center justify-around w-full ">
          <h1 className="font-semibold text-gray-500 text-lg">Total Seats: </h1>
          <p>{businfo.seats}</p>

          </div>
          <div className="flex items-center justify-around w-full">
          <h1 className="font-semibold text-gray-500 text-lg">Driver Name: </h1>
          <p>{businfo.driverName}</p>

          </div>
          <div className="flex items-center justify-around w-full">
          <h1 className="font-semibold text-gray-500 text-lg">Driver Contact: </h1>
          <p>{businfo.contactNumber}</p>

          </div>
          <div className="flex items-center justify-around w-full">
          <h1 className="font-semibold text-gray-500 text-lg">Per Seat Price: </h1>
          <p>{businfo.seatprice}</p>

          </div>
          <div className="flex items-center justify-around w-full">
          <h1 className="font-semibold text-gray-500 text-lg">Date Added: </h1>
          <p>{businfo.date?format(new Date(businfo.date), 'MMM dd yyyy'):''}</p>

          </div>

          

        </motion.div>



      </motion.div>
      <div className='p-8 border rounded-xl  mt-6  flex flex-wrap container mx-auto justify-between items-center '>
        <h1 className='font-semibold text-lg '> Add Buses</h1>
        <div className='flex gap-4'>


          <button onClick={() => router.push('/Panel/bus')} className='p-2 px-8 hover:opacity-80 bg-black text-white rounded-3xl font-semibold text-lg' >Add</button>

        </div>
      </div>
      <div className="container px-5 py-5 mx-auto">
        <label htmlFor="" className="text-xl text-red-600">{profile}</label>

        <div className="flex flex-wrap justify-around mb-[90px] space-y-5 ">
          {
            data.map((data) => (


              <div key={data._id}  className="px-6 border  rounded-xl h-auto lg:mb-0 mb-6 p-2">


                <div  className="h-full flex flex-col items-center justify-center text-center">
                  <img  alt="bus_image" className="w-[200px] h-[200px] mb-2object-cover object-center object-cover rounded-full inline-block border-2 border-gray-200 bg-gray-100" src={data.image ? `/uploads/${data.image}` : "https://dummyimage.com/302x302"} />
                  {/* <p className="leading-relaxed">Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p> */}
                  <span className="inline-block h-1 w-10 rounded bg-gray-700 mt-6 mb-4"></span>
                  <h2 className=" font-medium title-font tracking-wider text-sm">{data.name}</h2>
                  <p className="">{data.busNumber}</p>
                  <div className='w-full flex flex-wrap transition-all ease-out duration-200 justify-around px-1 gap-3 mt-4 '>
                    <button onClick={() => handelredrict(data._id)} className='rounded-3xl flex px-4  z-[50] py-1 gap-1 border-2 items-center' >Edit  <img width="28" className='' height="28" src="https://img.icons8.com/pastel-glyph/64/1A1A1A/edit--v1.png" alt="edit--v1" /> </button>
                    <button onClick={()=>handelinfo(data)} className='p-2 px-6  bg-pp   text-white hover:opacity-80  rounded-3xl'>View</button>
                    
                    <button onClick={() => handeldelete(data._id)} className='p-2 px-6  bg-[#000000d0]  z-[50] text-white hover:opacity-80  rounded-3xl'>Delete</button>


                  </div>
                </div>


              </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default page
