/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

// JWT, который вернул публичный сервер
const YOUR_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGM0YzQ0MTI4ODNjY2RkZTFlODlmYmQiLCJpYXQiOjE2OTA2MTY5MDQsImV4cCI6MTY5MTIyMTcwNH0.yKgxFqon7RQXIkYnLXvhu-lFXrVTOx4YDywrmCmR25w';
// секретный ключ для разработки из кода
const SECRET_KEY_DEV = 'dev-secret';
try {
  // eslint-disable-next-line no-unused-vars
  const payload = jwt.verify(YOUR_JWT, SECRET_KEY_DEV);
  console.log('\x1b[31m%s\x1b[0m', `
    Надо исправить. В продакшне используется тот же
    секретный ключ, что и в режиме разработки.
  `);
} catch (err) {
  if (err.name === 'JsonWebTokenError' && err.message === 'invalid signature') {
    console.log('\x1b[32m%s\x1b[0m', 'Всё в порядке. Секретные ключи отличаются');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'Что-то не так', err);
  }
}
