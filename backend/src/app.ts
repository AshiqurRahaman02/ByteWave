import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRouter from './routes/user.route';
import feedbackRouter from './routes/feedback.route';


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter)
app.use("/feedback", feedbackRouter)


export default app;