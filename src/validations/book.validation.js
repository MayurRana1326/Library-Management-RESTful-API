const Joi = require("joi");
const ObjectId = require("./objectId.validation");

const bookSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    author: Joi.string().min(3).max(50).required(),
    year: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear())
      .required()
      .strict(true),
    genre: Joi.string().min(3).max(30).required(),
  }),
};

const updateBookSchema = {
  params: Joi.object({
    id: ObjectId,
  }),
  body: Joi.object({
    title: Joi.string().min(3).max(100),
    author: Joi.string().min(3).max(50),
    year: Joi.number()
      .integer()
      .min(1000)
      .max(new Date().getFullYear())
      .strict(true),
    genre: Joi.string().min(3).max(30),
  }),
};

const getBooksSchema = {
  query: Joi.object({
    skip: Joi.number().optional(),
    limit: Joi.number().optional(),
  }),
};

const deleteBookSchema = {
  params: Joi.object({
    id: ObjectId,
  }),
};

const getBookSchema = {
  params: Joi.object({
    id: ObjectId,
  }),
};

module.exports = {
  bookSchema,
  updateBookSchema,
  deleteBookSchema,
  getBooksSchema,
  getBookSchema,
};
