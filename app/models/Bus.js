import mongoose from 'mongoose';


const BusSchema = new mongoose.Schema({
    name : {type : String},
    busNumber: { type: String, required: true, unique: true },
    seats: { type: Number, required: true },
    driverName: { type: String },
    contactNumber: { type: String },
    seatprice : {type: String},
    image : {type: String},    
    date: {
        type: Date,
        default: Date.now, 
    },
});



const Bus = mongoose.models.bus || mongoose.model('bus', BusSchema);

export default Bus;
