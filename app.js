import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { readdirSync } from 'fs';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
require('dotenv').config();
const app = express();

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ["./routes/*.js"]
}


// Connect DB
mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log('Database connected'))
    .catch(error => console.log('Database connect failed, ', error))

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());


const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
// Router
readdirSync('./routes').map(route => app.use("/api", require(`./routes/${route}`)))

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log('server is running port', port);
});


