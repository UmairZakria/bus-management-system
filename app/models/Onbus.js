import mongoose from 'mongoose';


const OnbusSchema = new mongoose.Schema({
    fromto : {type : String},
    whereto: {type: String},
    busid :{type: String},
    seatprice : {type: String},
    time : {type :String},
    date: {type : String}
});



const Onbus = mongoose.models.onbus || mongoose.model('onbus', OnbusSchema);

export default Onbus;
