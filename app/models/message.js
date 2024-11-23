import mongoose from 'mongoose';


const MessageSchema = new mongoose.Schema({


    name: {
        type: String,
    },
    email: {
        
        type: String,
    },




    title: {
        type: String,

    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now, 
      },
    







})



const Message =  mongoose.models.message || mongoose.model("message", MessageSchema)
export default Message;
