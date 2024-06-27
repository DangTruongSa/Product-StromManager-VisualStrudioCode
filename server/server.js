const express = require("express");
const userRouter = require('./router/userRouter');
const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/and103DB";
const distributorRouter = require('./router/distributorRouter');
const fruitRouter = require('./router/fruitRouter');
const cors = require("cors");


const app = express();


mongoose.connect(url);

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/uploads', express.static(__dirname + 'public/uploads'));
app.use(express.static('Image'));
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin,X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(userRouter);
app.get('/', (req, res) => {
    res.send("xin chao! and103");
});

app.use(distributorRouter);
app.use(fruitRouter);
app.listen(3001, console.log("server is running post 3001"));