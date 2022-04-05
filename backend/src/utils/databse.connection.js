import logger from "./Loger";
import config from '../config'

import mongoose from "mongoose";


let database;

export const connect = async() => {
    const MONGODB_URL = config.DB_CONNECTION_STRING;

    if(database) return;

    await mongoose.connect(MONGODB_URL)
    .then( (connection) =>{
        database = connection;
        logger.info("Database synced ")
    })
    .catch(  (err) => {
        logger.error(err.message)
    })
}


