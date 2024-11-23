"use client";

import { useState, useEffect } from "react";
import axios from 'axios'
import { useRouter } from "next/navigation";


const OnbusForm = () => {
    const [minDate, setMinDate] = useState("");
    const [error, setError] = useState('')
    const router = useRouter()

    const [formData, setFormData] = useState({
        fromto: "",
        whereto: "",
        busid: "",
        seatprice: "",
        time: "",
        date: "",
    });
    const [busdata, setBusdata] = useState([])
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const getdata = () => {
        axios.get('/api/addbus')
            .then((res) => {
                console.log(res)
                setBusdata(res.data.bus)
            })
            .catch((er) => { console.log(err) })
    }

    useEffect(() => {
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
        setMinDate(today);
        getdata()



    }, [])


    const handleSubmit =  (e) => {
        e.preventDefault();
        setError("Loading...")
        window.scroll(0,0)

        console.log(formData)
        axios.post('/api/onbus', formData)
        .then((res) => {console.log(res)
            if (res.data.status === "success"){
                setError("Bus Time Created Successfully")
                router.push('/Panel/busbook/view')
            }else{
                setError("Server Error")

            }



        })
        .catch((err) => {console.log(err)})
    };

    return (
        <div className="p-4 max-w-md mx-auto mb-[85px] bg-white shadow-md rounded-md">
            <h1 className="text-xl font-bold mb-4">Bus Route Information</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
            <label className='text-lg text-red-500 font-semibold'>{error}</label>

                <div>
                    <label htmlFor="fromto" className="block text-sm font-medium">
                        From :
                    </label>
                    <input
                        type="text"
                        id="fromto"
                        name="fromto"
                        value={formData.fromto}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="whereto" className="block text-sm font-medium">
                        Where To:
                    </label>
                    <input
                        type="text"
                        id="whereto"
                        name="whereto"
                        value={formData.whereto}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="busid" className="block text-sm font-medium">
                        Busses:
                    </label>
                    <select
                        id="busid"
                        name="busid"
                        value={formData.busid}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required



                        >
                        <option value=""> Select Bus</option>
                        {
                            busdata ? busdata.map((data) => (
                                <option key={data._id} value={data._id}> {data.name} - {data.busNumber} </option>

                            )) : (
                                <option value="">  No BUS AVAIABLE </option>

                            )
                        }
                    </select>

                </div>
                <div>
                    <label htmlFor="seatprice" className="block text-sm font-medium">
                        Price Per Seat:
                    </label>
                    <input
                        type="text"
                        id="seatprice"
                        name="seatprice"
                        value={formData.seatprice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium">
                        Time:
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="date" className="block text-sm font-medium">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        min={minDate}
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default OnbusForm;
