import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose'
import router from './router'
import dotenv from 'dotenv';


dotenv.config();

// create express app
const app = express();

// apply middlewares
app.use(cors({
   credentials:true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// create server
const server = http.createServer(app);


// listen for incoming requests
server.listen(8080, () =>{
   console.log('Server is running on http://localhost:8080/');
});

// connect to a db




mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database is connected'))
.catch((error: Error) => console.log('Database connection error:', error));


mongoose.connection.on('error', (error: Error) => console.log(error));
app.use('/', router());