const routes = require('express').Router()

const product = require('./product');

routes.use('/',product)

module.exports = routes;

