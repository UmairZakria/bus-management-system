import { connectMongo } from '../../../lib/mongodb';
import Admin from '../../models/Admin';
import bcrypt from 'bcryptjs';


export async function GET(request) {
  try {
    await connectMongo();

    const url = new URL(request.url);
    const id = url.searchParams.get('id'); 
    if (id) {
      // Fetch a single Admin by ID
      const admin = await Admin.findById(id);
      if (!admin) {
        return new Response(JSON.stringify({ message: 'Admin not found' }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify({ admin }), { status: 200 });
    }
    const admin = await Admin.find({});

    return new Response(JSON.stringify({ admin: admin }));
  } catch (error) {
    return new Response(JSON.stringify({ message: 'error', error }), { status: 500 });
}
}




export async function POST(request) {




    try {
      const res = await request.json();

      // Connect to MongoDB
      await connectMongo();

      // Create a new user
      const admin = await Admin.findOne({ email: res.email });
      if (admin) {
        return new Response(JSON.stringify({ status: 'already' }), {
          status: 409,
        });

      }
      const hashpass = await bcrypt.hash(res.password, 10);
      const newAdmin = new Admin({ email: res.email, password: hashpass, name: res.name, phone: res.phone });
      await newAdmin.save();

      return new Response(JSON.stringify({ status: 'success' }), {
        status: 201,
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'error', err: error }), {
        status: 500,
      });
    }
  }


