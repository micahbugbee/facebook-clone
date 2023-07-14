import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import mongoose from 'mongoose';

const connectionString: string = 'mongodb://127.0.0.1:27017/postDB';

mongoose.connect(connectionString).then(
    () => console.log('database connection successful!'), 
    err => console.log('Error connecting to the database', err));

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const cors = require('cors');
app.use(cors());

// routes
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});

app.listen(3000);