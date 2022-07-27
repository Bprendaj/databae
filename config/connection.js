const Sequelize = require('sequelize');

require('dotenv').config();

//create connection to our db
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      {
        database: process.env.DB_NAME, 
        username: process.env.DB_USER, 
        password: process.env.DB_PASSWORD,
        host: 'localhost',
        dialect: 'mysql'
    });

// //create connection to our db
// const sequelize = new Sequelize(
//       {
//         database: process.env.DB_NAME, 
//         username: process.env.DB_USER, 
//         host: 'localhost',
//         dialect: 'mysql'
//     });


module.exports = sequelize;