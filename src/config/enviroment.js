//Modulo con la logica de las varibles de entorno de nuestra aplicacion
import dotenv from 'dotenv'

//process es una variable global que guarda datos del proceso de ejecucion de node
//configutamos en process.env las vairables del archivo evn
dotenv.config()

const ENVIROMENT = {
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    EMAIL_USER: process.env.EMAIL_USER,
    SECRET_KEY: process.env.SECRET_KEY,
    URL_FRONTEND: process.env.URL_FRONTEND,
    MYSQUL: {
        HOST: process.env.MYSQL_HOST,//http://localhost3000
        DATABASE: process.env.MYSQL_DATABASE,//el nombre de su db
        USERNAME: process.env.MYSQL_USER, //local: root
        PASSWORD: process.env.MYSQL_PASSWORD //local: ''
    },
    MONGO_DB_CONNETION_STR: process.env.MONGODB_CONNECTION_STR,
    MONGO_DB_NAME: process.env.MONGO_DB_DATABASE
}


export default ENVIROMENT