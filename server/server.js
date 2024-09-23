const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
const fs = require('fs');
const path = require('path');

// Check the current working directory
console.log('Current working directory:', process.cwd());

// Check the absolute path to .env
const envPath = path.resolve(__dirname, '.env');
console.log('Absolute path to .env:', envPath);

// Check if .env file exists at the expected path
console.log('Does .env exist?', fs.existsSync(envPath));

// Load environment variables from .env file
dotenv.config({ path: envPath });

// Log the value of the environment variables
console.log('TEST_VAR:', process.env.TEST_VAR);
console.log('MONGO_URI:', process.env.MONGO_URI);

const app = express();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
