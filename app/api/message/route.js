import { connectMongo } from '../../../lib/mongodb';
import Message from '@/app/models/message';


export async function GET(request) {
  await connectMongo();
  const Messages = await Message.find({});

  return new Response(JSON.stringify({ Messages: Messages }));
}

export async function POST(request) {




  try {
    const res = await request.json();

    // Connect to MongoDB
    await connectMongo();

    // Create a new user



    const message = new Message({ name:res.name , email:res.email , message : res.message , title: res.title});
    await message.save();

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
        const deletedMessage = await Message.findByIdAndDelete(id);

        if (!deletedMessage) {
            return new Response(JSON.stringify({ message: 'Message not found' }), {
                status: 404,
            });
        }

        return new Response(JSON.stringify({ status: 'success', deletedMessage }), {
            status: 200,
        });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'error', error }), {
            status: 500,
        });
    }
}


