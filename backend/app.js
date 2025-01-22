const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const cors = require('cors');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const app = express();
app.use(cors())
connectToDb();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('hello world')
});

app.use('/users', userRoutes);


module.exports = app;
