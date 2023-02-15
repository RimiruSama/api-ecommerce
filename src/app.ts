import express, {Express, NextFunction, Request, Response} from 'express';
import dotenv from 'dotenv';

const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

const productsRouter = require('./routers/products');
const categoryRouter = require('./routers/categories');
const userRouter = require('./routers/users');

dotenv.config();

const app: Express = express();
const api_url = process.env.API_URL;

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt())
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send('Hello API!');
});

// Routes
app.use(`${api_url}/products`, productsRouter);
app.use(`${api_url}/categories`, categoryRouter);
app.use(`${api_url}/users`, userRouter);


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Database Connection is ready...')
})
.catch((err: Error) => {
    console.error(err)
});

app.listen(3000, () => {
    console.log('Server is running in port 3000')
});