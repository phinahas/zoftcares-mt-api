const routes = require('express').Router();


const adminRoutes = require('./admin/index');
const productRoutes = require('./product/index')

routes.use('/api/admin/',adminRoutes);
routes.use('/api/product/',productRoutes);


module.exports = routes;