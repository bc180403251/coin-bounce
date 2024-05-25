const express= require('express');

const dbConnect=require('./database/db');

const {port}= require('./config/config')





// dbConnect();

const app= express()

app.get('/', (req,res )=>res.json({message:'Hellow Pakistan!'}))

app.listen(port, console.log(`Server is running on port:${port}`))