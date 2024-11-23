import { connectMongo } from '../../../lib/mongodb';
import Onbus from '@/app/models/Onbus';


export async function GET(request) {
    try {
      await connectMongo();
  
      const url = new URL(request.url);
      const id = url.searchParams.get('id'); 
      if (id) {
        // Fetch a single Admin by ID
        const bus = await Onbus.findById(id);
        if (!bus) {
          return new Response(JSON.stringify({ message: 'busbook not found' }), {
            status: 404,
          });
        }
        return new Response(JSON.stringify({ bus }), { status: 200 });
      }
      const bus = await Onbus.find({});
  
      return new Response(JSON.stringify({ bus: bus }));
    } catch (error) {
      return new Response(JSON.stringify({ message: 'error', error }), { status: 500 });
  }
  }

export async function POST(request) {




    try {
        const res = await request.json();

        // Connect to MongoDB
        await connectMongo();


        const newbus = new Onbus({ fromto: res.fromto, whereto: res.whereto, seatprice: res.seatprice, busid: res.busid, time: res.time, date: res.date });
        await newbus.save();

        return new Response(JSON.stringify({ status: 'success' }), {
            status: 201,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'error', err: error }), {
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
      const deletedbus = await Onbus.findByIdAndDelete(id);

      if (!deletedbus) {
          return new Response(JSON.stringify({ message: 'Message not found' }), {
              status: 404,
          });
      }

      return new Response(JSON.stringify({ status: 'success', deletedbus }), {
          status: 200,
      });
  } catch (error) {
      return new Response(JSON.stringify({ message: 'error', error }), {
          status: 500,
      });
  }
}