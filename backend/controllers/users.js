const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATED,
  SECRET_KEY,
  mongoErrorCode,
  errMessages,
} = require('../utils/utils');

const {
  NODE_ENV,
  JWT_SECRET,
} = process.env;

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send({ data: userData });
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errMessages.idIncorrect));
      }
      next(err);
    });
};

const getMyData = (req, res, next) => {
  const { _id } = req.user;
  User.findById(_id)
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send(userData);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    email, name, about, avatar,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email,
      name,
      about,
      avatar,
      password: hash,
    }))
    .then((userData) => {
      res.status(CREATED).send(userData);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errMessages.createUserBadReq));
      }
      if (err.code === mongoErrorCode) {
        return next(new ConflictError(errMessages.emailConflict));
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send(userData);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errMessages.updateUserBadReq));
      }
      next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: false },
  )
    .then((userData) => {
      if (!userData) {
        throw new NotFoundError(errMessages.userIdNotFound);
      }
      res.send(userData);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errMessages.updateUserBadReq));
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((userData) => {
      if (!userData) {
        throw new UnauthorizedError(errMessages.unauthorized);
      }
      bcrypt.compare(password, userData.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(errMessages.unauthorized);
          }
          const token = jwt.sign({ _id: userData._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY, { expiresIn: '7d' });
          res.cookie('token', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
          });
          res.send(userData);
        })
        .catch(next);
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('token').send({ message: 'Goodbye!' });
};

module.exports = {
  getUsers,
  getUserById,
  getMyData,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
  signout,
};
