import "dotenv/config";
import express from "express";
import cors from "cors";
import { connect } from "./utils/databse.connection";
import passport from "passport";
import config from './config/index'
import logger from "./utils/Loger";
import { googleauth } from "./config/google.auth";
import { routesInit } from "./routes";
import session from 'express-session';
import MongoStore from 'connect-mongo'

const app = express();
const PORT = process.env.PORT || 8050;

app.use(cors());
app.use(express.json({limit : "10mb"}));
app.use(session({
    secret : config.SESSION_SECRET,
    resave : false,                         //loses race condition
    store : MongoStore.create({mongoUrl : config.DB_CONNECTION_STRING}),
    saveUninitialized : false, 
    cookie : {
        secure : false,
        expires : new Date(Date.now() + 10000),
        maxAge : 10000
    } ,
}));

app.use(passport.initialize());
app.use(passport.session());


app.get("/" , (req,res,next) => {
    res.send("<a href='http://localhost:8050/auth/google'>Login with Google</a>");
    next();
})



app.listen(PORT , () => {
    console.log(`🚩 server is up and running on PORT ${PORT} ✅ 🤟`);
    logger.info("Hey it's working...this is a log");
    connect();
    routesInit(app,passport);
    googleauth(passport);
    
    // logger.error("Hey it's working...this is a log");
    // logger.warn("hey this is warning")
})
