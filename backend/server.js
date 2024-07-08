const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
//used to parse json data
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydatabase',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=>{
    console.log('connected to mongoDB');
})

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.listen(port,()=>{
    console.log("server is running");
})