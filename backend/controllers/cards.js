const mongoose = require('mongoose');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Card = require('../models/card');
const { CREATED, errMessages } = require('../utils/utils');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards.reverse());
    })
    .catch(next);
};

const postCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(errMessages.createCardBadReq));
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { _id } = req.user;
  const { id } = req.params;
  Card.findById(id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errMessages.cardIdNotFound);
      }
      if (_id !== card.owner.toString()) {
        throw new ForbiddenError(errMessages.unavailable);
      }
      Card.findByIdAndRemove(id)
        .then(() => res.send({ message: 'Пост удален!' }))
        .catch(next);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errMessages.idIncorrect));
      }
      next(err);
    });
};

const setLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errMessages.cardIdNotFound);
      }
      res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errMessages.idIncorrect));
      }
      next(err);
    });
};

const deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errMessages.cardIdNotFound);
      }
      res.send(card);
    })
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(errMessages.idIncorrect));
      }
      next(err);
    });
};

module.exports = {
  getCards,
  postCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
};
