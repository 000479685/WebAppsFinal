const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
require('dotenv').config();
const UserRoutes = require('./Routes/User');

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.error(`Error connecting to the database: ${error}`);
})

app.get('/', (req, res) => {
    res.send('INTRO WEBAPPS FINAL endpoints');
})

app.use('/api/IntroWebAppsFinal/v1/users', UserRoutes);

app.listen(PORT, () =>
{
    console.log(`Server Running at : ${PORT}`);
});