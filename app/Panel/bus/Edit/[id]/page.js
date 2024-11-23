'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'

import React, { useState, useRef, useEffect } from 'react';




const page = ({ params }) => {
      const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value, files } = e.target;
    
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        
      };
      
  const [imagebus, setImagebus] = useState()
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImagebus(selectedFile)

  };

    const [formData, setFormData] = useState({
        name: "",
        busNumber: "",
        seats: "",
        driverName: "",
        contactNumber: "",
    });
    const router = useRouter()
    let { id } = React.use(params);
    id = decodeURIComponent(id);
    const getdata = async (id) => {
        // document.body.style.overflow = 'hidden';


        try {
            const res = await axios.get(`/api/addbus?id=${id}`)
            console.log(res)
            setFormData(res.data.bus)



        } catch (error) {
            console.error('Error fetching data:', error);
            router.push('/')
        }

    }
        useEffect(() => {
            getdata(id);

        }, [id]);
        const handleSubmit = async (e) => {
            e.preventDefault();
            setError('Loading...')
            window.scroll(0, 0)
        
        
            const data = new FormData();
            data.set('file',imagebus)
            data.set("name", formData.name);
            data.set("busNumber", formData.busNumber);
            data.set("seats", formData.seats);
            data.set("driverName", formData.driverName);
            data.set("contactNumber", formData.contactNumber);
            data.set("id",id)
            try {
              axios.put('/api/addbus', data )
                .then((res) => { console.log(res) 
        
        
                  if (res.data.success){
                    setError('Bus Updated Succesfully !')
                    router.push('/Panel')
                    setTimeout(() => {
                        setError('')
        
        
                    }, 3000);
                  }else if(res.data.message==='fail'){
                    setError('Something went wrong')
                    setTimeout(() => {
                        setError('')
        
        
                    }, 3000);
                  }else{
                    setError('Server Error')
                    setTimeout(() => {
                        setError('')
        
        
                    }, 4000);
        
                  }
                })
                .catch((err) => { console.log(err) })
        
        
        
            } catch (error) {
              console.log(error);
            }
          };

        return (
            <>



                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto p-6 bg-white mb-[90px] rounded shadow-md"
                >
                    <h1 className="text-2xl font-semibold mb-4">Add New Bus</h1>
                    <label className='text-lg text-red-500 font-semibold'>{error}</label>


                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Bus Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Bus Number</label>
                        <input
                            type="text"
                            name="busNumber"
                            value={formData.busNumber}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Seats</label>
                        <input
                            type="number"
                            name="seats"
                            value={formData.seats}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Driver Name</label>
                        <input
                            type="text"
                            name="driverName"
                            value={formData.driverName}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Contact Number</label>
                        <input
                            type="text"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            type="file"
                            name="image"
                            // onChange={handleChange}
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Update Bus
                    </button>
                </form>






            </>
        )
    }

    export default page
