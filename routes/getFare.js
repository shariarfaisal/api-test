const Router = require('express').Router()
const getFare = require('../controller/getFare')


Router.get('/',getFare)

module.exports = Router
