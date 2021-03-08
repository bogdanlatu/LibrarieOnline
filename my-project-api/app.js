const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digilib', {useNewUrlParser : true, useUnifiedTopology: true},()=> {
	console.log('successfully connected to database');
});


const userRouter = require('./routes/User');
app.use('/user',userRouter);

const adminRouter = require('./routes/Admin');
app.use('/admin',adminRouter);


app.listen(5000,()=>{
	console.log('express server started');
});