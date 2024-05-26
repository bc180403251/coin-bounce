const express= require('express');

const dbConnect=require('./database/db');

const {port}= require('./config/config')

const router= require('./routes/api')
const erroeHandler= require('./middlewares/errorHandler');





// dbConnect();

const app= express()
app.use(express.json())
app.use(router)


app.use(erroeHandler);

app.listen(port, console.log(`Server is running on port:${port}`))