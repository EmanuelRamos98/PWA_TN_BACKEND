import mysql from 'mysql2/promise'
import ENVIROMENT from './enviroment.js'

const pool = mysql.createPool(
    {
        host: ENVIROMENT.MYSQUL.HOST,
        user: ENVIROMENT.MYSQUL.USERNAME,
        password: ENVIROMENT.MYSQUL.PASSWORD,
        database: ENVIROMENT.MYSQUL.DATABASE
    }
)
pool.getConnection().then(
    () => {
        console.log('conexion exitosa con mysql');

    }
).catch((err) => {
    console.error('fallo mysql');
})

export default pool