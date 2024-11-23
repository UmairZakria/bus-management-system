'use client'
import { useState, useEffect } from 'react'
import React from 'react'
import axios from 'axios'
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";



const page = ({ params }) => {
    
    let { id } = React.use(params);
    id = decodeURIComponent(id);
    const router = useRouter()

    const [seats, setSeats] = useState(0)

    const [data, setData] = useState([])
    const [data2, setData2] = useState([])

    const [price, setPrice] = useState(0)
    const [totalprice, setTotalprice] = useState(0)

    const [counter, setCounter] = useState(0)
    function Format(time) {
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    }
    function handleConfirm() {
        const doc = new jsPDF();
      
        // Set general styles
        doc.setFont("Helvetica", "normal");
      
        // Add title
        doc.setFontSize(16);
        doc.setFont("Helvetica", "bold");
        doc.text("Ticket Receipt", 105, 20, { align: "center" });
      
        // Draw a separator line
        doc.setLineWidth(0.5);
        doc.line(10, 25, 200, 25);
      
        // Journey Details Section
        doc.setFontSize(12);
        doc.setFont("Helvetica", "bold");
        doc.text("Journey Details", 10, 35);
        doc.setFont("Helvetica", "normal");
        doc.text(`From:`, 10, 45);
        doc.text(`${data.fromto}`, 190, 45, { align: "center" });
        doc.text(`To:`, 10, 55);
        doc.text(`${data.whereto}`, 190, 55, { align: "center" });
        doc.text(`Date:`, 10, 65);
        doc.text(`${data.date}`, 190, 65, { align: "center" });
        doc.text(`Time:`, 10, 75);
        doc.text(`${data.time ? Format(data.time) : ""}`, 190, 75, { align: "center" });
        doc.text(`Bus Number:`, 10, 85);
        doc.text(`${data2.busNumber}`, 190, 85, { align: "center" });
      
        // Pricing Section
        doc.setFont("Helvetica", "bold");
        doc.text("Pricing Details", 10, 100);
        doc.setFont("Helvetica", "normal");
        doc.text(`Price Per Seat:`, 10, 110);
        doc.text(`${data.seatprice}`, 190, 110, { align: "center" });
        doc.text(`Total Seats:`, 10, 120);
        doc.text(`${counter}`, 190, 120, { align: "center" });
        doc.text(`Total Price:`, 10, 130);
        doc.text(`${totalprice}`, 190, 130, { align: "center" });
        // Footer
        doc.setLineWidth(0.5);
        doc.line(10, 140, 190, 140);
        doc.setFontSize(10);
        doc.setFont("Helvetica", "italic");
        doc.text("Thank you for booking with us!", 105, 150, { align: "center" });
      
        // Save the PDF
        doc.save("ticket_receipt.pdf");
      }

    const getdata2 =  (id) => {
        console.log(id)
        axios.get(`/api/addbus?id=${id}`)
        .then((res) => {

                console.log(res)
                setData2(res.data.bus)
                setSeats(res.data.bus.seats)
            })
        .catch((err)=>{console.log(err)})    





    }
    const getdata = (id) => {
        axios.get(`/api/onbus?id=${id}`)
            .then((res) => {
                console.log(res)
                setData(res.data.bus)
                setPrice(res.data.bus.seatprice)

            })
            .catch((err) => { console.log(err) })
    }

    useEffect(() => {

        getdata(id)

    }, [id])
    useEffect(() => {
        getdata2(data.busid)

    }, [price])
    const handelcancel = () => {
        router.push('/Home')

    }

    return (
        <div className=' h-auto flex items-center  justify-center w-full bg-[#131212] font-semibold '>
            <div className="bg-white  flex flex-col items-center justify-center w-[95%] lg:w-1/2 md:w-1/2 h-auto gap-6 p-6 rounded-lg shadow-md border border-gray-190">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Your Ticket</h1>

                {/* Journey Details */}
                <div className="w-full text-gray-700 text-lg space-y-2">
                    <div className="flex justify-between">
                        <p className="font-medium">From:</p>
                        <p className="font-semibold text-gray-900">{data.fromto}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">To:</p>
                        <p className="font-semibold text-gray-900">{data.whereto}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Date:</p>
                        <p className="font-semibold text-gray-900">{data.date}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Time:</p>
                        <p className="font-semibold text-gray-900">{data.time ? (Format(data.time)) : ''}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Available Seats:</p>
                        <p className="font-semibold text-gray-900">{seats}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Bus Number:</p>
                        <p className="font-semibold text-gray-900">{data2.busNumber}</p>
                    </div>
                </div>



                {/* Counter Section */}
                <div className="flex items-center w-full justify-around flex-wrap">
                    <p className="text-gray-800  font-medium">Select Your Seats:</p>


                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                if (counter >= 1) {
                                    setCounter(counter - 1);
                                    setSeats(seats + 1);
                                    setTotalprice(Number(totalprice) - Number(price));
                                }
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                            -
                        </button>
                        <span className="text-xl font-semibold text-gray-800">{counter}</span>
                        <button
                            onClick={() => {
                                if (seats >= 1) {
                                    setCounter(counter + 1);
                                    setSeats(seats - 1);
                                    setTotalprice(Number(totalprice) + Number(price));
                                }
                            }}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            +
                        </button>
                    </div>
                </div>


                {/* Pricing Details */}
                <div className="w-full text-lg text-gray-700">
                    <div className="flex justify-between">
                        <p className="font-medium">Price Per Seat:</p>
                        <p className="font-semibold text-gray-900">{data.seatprice}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="font-medium">Total Price:</p>
                        <p className="font-semibold text-gray-900">{totalprice}</p>
                    </div>
                </div>

                {/* Selected Seats */}
                <div className="w-full">
                    <p className="text-lg font-medium text-gray-700 mb-2">Your Seats:</p>
                    <div className="flex flex-wrap  gap-2">
                        {Array.from({ length: counter }, (_, i) => (
                            <div
                                key={i}
                                className="h-8 w-8 bg-blue-500 text-white rounded-md flex items-center justify-center"
                            >
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Confirm Button */}
                <div className='flex items-center flex-wrap justify-between w-full'>
                    <button onClick={handelcancel} className="mt-4 px-6 py-2 bg-black text-white text-lg font-medium rounded-lg hover:opacity-80">
                        Cancel
                    </button>

                    <button 
                    
                    onClick={handleConfirm}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700">
                        Confirm
                    </button>

                </div>
            </div>





        </div>
    )
}

export default page
