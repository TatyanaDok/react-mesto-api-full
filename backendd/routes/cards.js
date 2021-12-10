/* eslint-disable comma-dangle */
const router = require('express').Router();
const { validateCard, validateId } = require('../middlewares/celebrate');
const {
  getCards,
  createCard,
  removeCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', validateCard, createCard);
router.delete('/cards/:_id', validateId, removeCard);
router.put('/cards/:_id/likes', validateId, likeCard);
router.delete('/cards/:_id/likes', validateId, dislikeCard);

module.exports = router;
