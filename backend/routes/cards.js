const cardRouter = require('express').Router();

const {
  getCards,
  postCard,
  deleteCard,
  setLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');

const {
  validateParamId,
  validatePostCard,
} = require('../utils/validateJoi');

cardRouter.get('/cards', getCards);
cardRouter.post('/cards', validatePostCard, postCard);
cardRouter.delete('/cards/:id', validateParamId, deleteCard);
cardRouter.put('/cards/:id/likes', validateParamId, setLikeCard);
cardRouter.delete('/cards/:id/likes', validateParamId, deleteLikeCard);

module.exports = cardRouter;
