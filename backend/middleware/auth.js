const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET_KEY, errMessages } = require('../utils/utils');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const auth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new UnauthorizedError(errMessages.authorizationErr);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    throw new UnauthorizedError(errMessages.authorizationErr);
  }

  req.user = payload;
  next();
};

module.exports = {
  auth,
};
