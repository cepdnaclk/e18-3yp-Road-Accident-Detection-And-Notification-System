const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 8000;
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

// app.use('/api/goals',require('./routes/goalRoutes'));
//app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/drivers',require('./routes/driverRoutes'));
app.use('/api/emergencycontacts',require('./routes/emergencyContactRoutes'));

app.use(errorHandler);

app.listen(port,() => console.log(`Server Started on Port ${port}`));