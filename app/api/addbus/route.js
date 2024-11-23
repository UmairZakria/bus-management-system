import { connectMongo } from '../../../lib/mongodb';
import Bus from "@/app/models/Bus";
import { writeFile } from 'fs/promises'
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongo();

    const url = new URL(request.url);
    const id = url.searchParams.get('id'); 
    if (id) {
      // Fetch a single Admin by ID
      const bus = await Bus.findById(id);
      if (!bus) {
        return new Response(JSON.stringify({ message: 'bus not found' }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify({ bus }), { status: 200 });
    }
    const bus = await Bus.find({});

    return new Response(JSON.stringify({ bus: bus }));
  } catch (error) {
    return new Response(JSON.stringify({ message: 'error', error }), { status: 500 });
}
}



export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');
  const name = data.get('name')
  const busNumber = data.get('busNumber')
  const seats = data.get('seats')
  const driverName = data.get('driverName')
  const contactNumber = data.get('contactNumber')
  try {

    await connectMongo();



    if (!file) {
      return NextResponse.json({ "message": "no image found", success: false })
    }
    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/uploads/${file.name}`
    await writeFile(path, buffer);
    const busdata = await Bus.findOne({ busNumber: busNumber })
    if (busdata) {
      return NextResponse.json({ "message": "already", success: false })

    } else {
      const newbus = new Bus({ name: name, busNumber: busNumber, seats: seats, driverName: driverName, contactNumber: contactNumber, image: file.name })
      await newbus.save();
      return NextResponse.json({ "message": "file uploaded", success: true })

    }
  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: 'error', error: err }), {
      status: 500,
    });
  }

}

export async function DELETE(request) {
  try {
      const url = new URL(request.url);
      const id = url.searchParams.get('id'); // Extract 'id' from query params

      if (!id) {
          return new Response(JSON.stringify({ message: 'ID is required' }), {
              status: 400,
          });
      }

      // Connect to MongoDB
      await connectMongo();

      // Find and delete the message
      const deletedBus = await Bus.findByIdAndDelete(id);

      if (!deletedBus) {
          return new Response(JSON.stringify({ message: 'Bus not found' }), {
              status: 404,
          });
      }

      return new Response(JSON.stringify({ status: 'success', deletedBus }), {
          status: 200,
      });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'error', error }), {
          status: 500,
      });
  }
}

export async function PUT(req) {
  const data = await req.formData();
  const file = data.get('file');
  const name = data.get('name')
  const busNumber = data.get('busNumber')
  const seats = data.get('seats')
  const driverName = data.get('driverName')
  const contactNumber = data.get('contactNumber')
  const id = data.get('id')
  try {

    await connectMongo();



    if (!file.name) {
      const bus = await Bus.findOne({ _id: id })
      if (bus) {
  
        const res = await Bus.findByIdAndUpdate(id,{ name: name, busNumber: busNumber, seats: seats, driverName: driverName, contactNumber: contactNumber }, { new: true })
        if (res){
          
          return NextResponse.json({ "message": "success", success: true })
          
        }else{
          return NextResponse.json({ "message": "fail1", success: false })

        }
    }else{
      return NextResponse.json({ "message": "fail2", success: false })

    }
  
  }else if (file.name){

    const byteData = await file.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/uploads/${file.name}`
    await writeFile(path, buffer);
    const busdata = await Bus.findOne({ _id : id })
    if (busdata) {

      const res = await Bus.findByIdAndUpdate(id,{ name: name, busNumber: busNumber, seats: seats, driverName: driverName, contactNumber: contactNumber,  image: file.name }, { new: true })
      if (res){
        
        return NextResponse.json({ "message": "success", success: true })
        
      }else {
        return NextResponse.json({ "message": "fail3", success: false })

      }



    } else {
      return NextResponse.json({ "message": "fail4", success: false })


    }
  }

  } catch (err) {
    console.log(err)
    return new Response(JSON.stringify({ message: 'error', error: err }), {
      status: 500,
    });
  }

}


