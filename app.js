import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp"
import * as path from "path";
import router from "./routes/api.js"
import {MONGODB_CONNECTION,
    PORT,
    MAX_JSON_SIZE,
    URL_ENCODED,
    WEB_CACHE,
    REQUEST_LIMIT_NUMBER,
    REQUEST_LIMIT_TIME} from "./app/config/config.js"
import {etag} from "express/lib/utils.js";
import fileUpload from 'express-fileupload'

const app = express()

app.use(cors());
app.use(express.json({limit: MAX_JSON_SIZE}))
app.use(express.urlencoded({extended: URL_ENCODED}))
app.use(hpp())
app.use(helmet())
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

//Rate limiter

const limiter = rateLimit({windowMs:REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER })
app.use(limiter)


//Web Caching

app.set('etag', WEB_CACHE)

//MongoDB Connection
mongoose.connect(MONGODB_CONNECTION, { autoIndex: true })
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error Connecting to MongoDB:", err);
    });


// **********

// Set api routes

app.use("/", router)

// Set application storage

app.use(express.static('storage'))

// Run express project

app.listen(PORT, ()=>{
    console.log("Server running at PORT "+PORT)
})