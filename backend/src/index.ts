import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose'
import router from './router'

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
const MONGO_URL = 'mongodb+srv://ghanahazardreporter:pf9uY1YOcIGRcLCp@cluster0.w3fk9tn.mongodb.net/hazardreporter-api?retryWrites=true&w=majority&appName=Cluster0'



mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
console.log('Database is connected');

mongoose.connection.on('error', (error: Error) => console.log(error));
app.use('/', router());