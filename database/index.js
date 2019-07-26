require('dotenv').config()
// const primise = require('util').Promise

const { Pool, Client } = require('pg');

const pool = new Pool();

module.exports = function(id){
  if (isNaN(id) || id > 10000000){
    return new Promise(() => 'not an id');
  }
  return pool.query('select * from products where id=$1', [Number(id)])
  .then(res => res.rows[0])
  .catch(err => {
    console.log(err);
    console.error(err)
  });
}

