const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000;


// Connect DB
connectDB(process.env.MONGO_URI);


// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));


app.get('/', (req, res) => res.send('MERN Task Manager API running'));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));