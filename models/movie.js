const mongoose = require('mongoose');
const validator = require('validator');

const MovieSchema = mongoose.Schema({
  country: {
    type: 'String',
    required: true,
  },
  director: {
    type: 'String',
    required: true,
  },
  duration: {
    type: 'Number',
    required: true,
  },
  year: {
    type: 'String',
    required: true,
  },
  description: {
    type: 'String',
    required: true,
  },
  image: {
    type: 'String',
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  trailer: {
    type: 'String',
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  thumbnail: {
    type: 'String',
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
  },
  owner: {
    required: true,
  },
  movieId: {
    required: true,
  },
  nameRU: {
    required: true,
    type: 'String'
  },
  nameEN: {
    required: true,
    type: 'String'
  }
});