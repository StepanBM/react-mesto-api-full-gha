const Cards = require('../models/card');

const NotDataError = require('../errors/NotDataError');
const IncorrectDataError = require('../errors/IncorrectDataError');
// const AuthorizationError = require('../errors/AuthorizationError');
const NotRightsError = require('../errors/NotRightsError');

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const addCard = (req, res, next) => {
  const card = {
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  };
  Cards.create(card)
    .then((data) => res.status(200).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Переданы некорректные данные'));
        return;
      }
      next(err);
    });
};

const removeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findById(cardId)
    .then((data) => {
      if (!data) {
        throw new NotDataError('Карточки с данным _id несуществует');
      }
      if (!data.owner.equals(req.user._id)) {
        throw new NotRightsError('Вы не можите удалить данную карточку');
      }
      return Cards.deleteOne(data)
        .then(() => res.status(200).send({ message: 'Карточка удалена' }));
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotDataError('Карточка по указанному _id не найден'));
      } else {
        next(res.status(200).send(card));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректный _id'));
        return;
      }
      next(err);
    });
};

const removeLikeCard = (req, res, next) => {
  const { cardId } = req.params;
  Cards.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        next(new NotDataError('Карточка по указанному _id не найден'));
      } else {
        next(res.status(200).send(card));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректный _id'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getCards,
  addCard,
  removeCard,
  addLikeCard,
  removeLikeCard,
};
