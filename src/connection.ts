import Knex from "knex";


const knexFile = require('../knexfile')

let knex = require('knex')(knexFile[process.env['ENVIRONMENT'] || 'development']);

module.exports = knex