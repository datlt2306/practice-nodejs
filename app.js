import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import morgan from 'morgan';
require('dotenv').config();
const app = express();

// Connect DB
mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connect failed, ', error))

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Router
readdirSync('./routes').map(route => {
    return app.use("/api", require(`./routes/${route}`))
})

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('server is running port', port);
});


