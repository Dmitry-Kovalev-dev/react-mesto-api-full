const SERV_ERROR = 500;
const CREATED = 201;
const mongoErrorCode = 11000;
const SECRET_KEY = 'secret-key';
// eslint-disable-next-line no-useless-escape
const REGEX_URL = /[-a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&\/=]*)?/i;
const errMessages = {
  cardIdNotFound: 'Карточка с указанным _id не найдена.',
  userIdNotFound: 'Пользователь с указанным _id не найден',
  idIncorrect: 'Передан некорректный _id',
  createCardBadReq: 'Переданы некорректные данные при создании карточки',
  createUserBadReq: 'Переданы некорректные данные при создании пользователя',
  updateUserBadReq: 'Переданы некорректные данные при обновлении данных пользователя',
  unavailable: 'Ошибка доступа',
  emailConflict: 'Пользователь с таким email уже существует',
  unauthorized: 'Неправильные логин или пароль',
  authorizationErr: 'Необходима авторизация',
  serverError: 'На сервере произошла ошибка',
};

module.exports = {
  SERV_ERROR,
  CREATED,
  mongoErrorCode,
  SECRET_KEY,
  REGEX_URL,
  errMessages,
};
