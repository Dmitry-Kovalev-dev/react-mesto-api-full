require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const errorHandler = require('./middleware/errorHandler');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middleware/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
