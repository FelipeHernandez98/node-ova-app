const mysql = require('mysql');
const { database } = require('./conexion');
const { promisify } = require ('util');

const pool = mysql.createPool(database);

 pool.getConnection((err,connection)=>{
     if(err){
         if(err.code === 'PROTOCOL_CONNECTION_LOST' ){
            console.error('Database Connection Was Closed');
         }
         if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('Database Has To Many Connections'); 
         }
         if(err.code === 'ECONNREFUSED'){
            console.error('Database Connection was Refused'); 
         }
     }
     if(connection) connection.release();
     console.log('Base de datos conectada')
     return;
 });

 pool.query = promisify(pool.query);
 module.exports = pool;