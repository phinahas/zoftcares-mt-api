const routes = require('express').Router()

const admin = require('./admin');

routes.use('/',admin)

module.exports = routes;

