import bodyParser from 'body-parser';
import cors from 'cors';
import express, { ErrorRequestHandler } from 'express';
import morgan from 'morgan';

import './database';

import validationRouter from './routes/validation';
import { PORT } from './utils/constants';

const app = express();

//middleware
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', validationRouter);

// 404 route handler
app.all('*', (req, res) => {
  res.status(404).send({
    msg: 'Not Found',
  });
});

//error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send({
    msg: 'There was something wrong. Please try again.',
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server started on port %d', PORT);
});
