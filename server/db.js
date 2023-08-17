// const { Client } = require('pg')
const config = require('config')
 
// const client = new Client({
//   user: config.get('user'),
//   host: config.get('host'),
//   database: config.get('database'),
//   password: config.get('password'),
//   port: config.get('port'),
// })


// module.exports = client


const Sequilize = require('sequelize')

module.exports = new Sequilize(config.get('database'), config.get('user'), config.get('password'), {
  host: config.get('host'),
  dialect: 'postgres',
})