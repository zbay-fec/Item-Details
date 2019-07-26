require('dotenv').config();

const { Pool, Client } = require('pg');

const pool = new Pool();

module.exports = function(id){
  return pool.query('select * from products where id=$1', [Number(id)])
  .then(res => res.rows[0])
  .catch(err => {
    console.log(err);
    console.error(err)
  });
}

