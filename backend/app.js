const express = require('express');

require('dotenv').config();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { errors } = require('celebrate');

const userRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { auth } = require('./middlewares/auth');

const { cors } = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { login, addUser } = require('./controllers/users');

const { validatorLogin, validatorAddUser } = require('./middlewares/validator');

const serverError = require('./errors/ServerError');

const NotDataError = require('./errors/NotDataError');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.socket.on('error', () => {
    res.status(400).end('Ошибка сокета в запросе');
  });
  res.socket.on('error', () => {
    res.status(400).end('Ошибка сокета в ответе');
  });
  next();
});

app.use(requestLogger);

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validatorLogin, login);
app.post('/signup', validatorAddUser, addUser);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth);

app.use('/users', userRoutes);
app.use('/cards', cardsRoutes);

app.use(errorLogger);

app.use(errors());

app.use('', (req, res, next) => {
  next(new NotDataError('Данного пути не существует'));
});

app.use(serverError);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
