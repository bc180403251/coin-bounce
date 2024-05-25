const mongoose= require('mongoose');
const{mongoDb_connection_string}=require('../config/config')


const connection_string=mongoDb_connection_string
const dbConnect=async  ()=>{
    try {
         const conn= await mongoose.connect(connection_string)

         console.log('Databse connected', conn.connection.host)
    } catch (error) {
        console.log(`erro:${error}`)
    }
   
}

module.exports = dbConnect()