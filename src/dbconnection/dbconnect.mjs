import mongoose from "mongoose";
// import dotenv from 'dotenv'

// dotenv.config();

console.log(process.env.DB_URL);
async function dbConnect() {
    
    try{
        let con=await mongoose.connect(process.env.DB_URL);
        con.connection.on('connected', ()=>{
            console.log("connected to db");
        });
    }   
    catch(err){
        console.log("error in coonnecting to db", err);
    }
}

export default dbConnect;