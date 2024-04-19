const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config();
const UserRoutes = require('./Routes/User');
const TrackerRoutes = require('./Routes/Tracker');
const path = require('path');

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('connected to database');
}).catch((error) => {
    console.error(`Error connecting to the database: ${error}`);
})
    

// app.get('/', (req, res) => 
// {
//     res.send('This is a test');
// })

app.use(express.static(path.join(__dirname, 'frontend')));

app.use('/api/IntroWebAppsFinal/v1/users', UserRoutes);
app.use('/api/v1/user/tracker', TrackerRoutes);

app.listen(PORT, () =>
{
    console.log(`Server Running at : ${PORT}`);
});
