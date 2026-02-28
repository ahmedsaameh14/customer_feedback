const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/db.config');
const path = require('path');
const app = express();

const corsMiddleware = require('./middleware/cors.middleware');
app.use(corsMiddleware);

app.use(express.json());

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT , () => console.log(`🚀 Server Started at port ${PORT}`))