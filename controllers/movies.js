const Movies = require('../models/movie');
const WrongDataError = require('../errors/wrong-data-error');
const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.getMovies = (req, res, next) => {
  try {
    Movies.find({})
      .then((movies) => {
        if (!movies) {
          throw new Error();
        }
        res.send({ data: movies });
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail,
    } = req.body;
    const owner = req.user._id;
    const movieId = 1;
    const newMovie = {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      owner,
      movieId,
    };
    Movies.create(newMovie)
      .then((movie) => res.send({ data: movie }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new WrongDataError('Некорректные данные фильма');
        } else {
          next(err);
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteMovie = (req, res, next) => {
  try {
    Movies.findById(req.params.movieId)
      .then((movie) => {
        if (!movie) {
          throw new NotFoundError('Фильм не найден');
        }
        if ((req.user._id) !== movie.owner.toString()) {
          throw new ForbiddenError('Фильм может удалить только создавший его пользователь');
        }
        movie.remove();
        res.send({ data: movie });
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new WrongDataError('Фильм не найден');
        } else {
          next(err);
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};
