const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const OngController = require('./controllers/OngController.js');
const IncidentController = require('./controllers/IncidentController.js');
const ProfileController = require('./controllers/ProfileController.js');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

/**
 * Métodos HTTP;
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
 *Tipos de parametros:
 *Query params = parâmetros nomeados enviados na rota ap[os "?" (Filtros, paginação)
 *Route params = Parâmetros utilizados para identificar recursos
 *Request body = Corpo da requisição, utilizados para criar ou alterar recursos
 *
 * Exemplos:
 * 
 *Query params = ?teste=1 
 *Route params = /users/1
 *Request body = { "name": "Jodaías", "email": "jodaias2013@gmail.com" }
 *
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, Firebase, etc.
 */

/**
 * Driver: Select * From 
 * 
 */
routes.post('/sessions', SessionController.create);

routes.get("/ongs", OngController.index);

routes.post("/ongs", celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email,
    whatsapp: Joi.number().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);


module.exports = routes;