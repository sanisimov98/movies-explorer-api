const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./errors/errors-handler');
const rateLimit = require('./utils/rateLimit');

const { BITFILMSDB } = process.env;

const app = express();

app.use(cors());

mongoose.connect(BITFILMSDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(requestLogger);
app.use(rateLimit);

app.use('/', routes);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

const { PORT = 3000 } = process.env;

app.listen(PORT);
