import { connectMongo } from '../../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';


export async function GET(request) {
    return new Response(JSON.stringify({ message: 'This is a GET request' }));
  } 

  export async function POST(request) {




    try {
      const res = await request.json();
  
      // Connect to MongoDB
      await connectMongo();
  
      // Create a new user
      const user = await User.findOne({ email: res.email });
      if(user){
        return new Response(JSON.stringify({ status: 'already'}), {
          status: 409,
        });
        
      }
      const hashpass =  await bcrypt.hash(res.password, 10);
      const newUser = new User({ email: res.email, password: hashpass, name : res.name , phone : res.phone });
      await newUser.save();
  
      return new Response(JSON.stringify({ status: 'success' }), {
        status: 201,
      });
    } catch (error) {
      return new Response(JSON.stringify({ message: 'error',err : error }), {
        status: 500,
      });
    }
  }
  
  
