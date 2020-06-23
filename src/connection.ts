
import Knex from "knex";
const knexFile = require('../knexfile')

export const knex = Knex(knexFile[process.env['ENVIRONMENT'] || 'development']);