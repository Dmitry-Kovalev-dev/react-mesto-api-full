const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { validateLogin, validateRegister } = require('../utils/validateJoi');
const { login, createUser } = require('../controllers/users');
const { auth } = require('../middleware/auth');
const NotFoundError = require('../errors/NotFoundError');
const cors = require('../middleware/cors');

router.use(cors);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);

router.use(auth);

router.use(userRouter);
router.use(cardRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
