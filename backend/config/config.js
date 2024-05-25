const Dotenv = require('dotenv').config();

const port= process.env.Port

const mongoDb_connection_string= process.env.db_connection_string


module.exports={
    port,
    mongoDb_connection_string
}