//Logica de conexion con la DB
import mongoose from "mongoose"
import ENVIROMENT from "./enviroment.js"

const MONGO_URL = ENVIROMENT.MONGO_DB_CONNETION_STR + '/' + ENVIROMENT.MONGO_DB_NAME

//.connect se utiliza para establecer una conexion con la DB
//Recibe un connection_string (url de la DB) y un objeto de configuracion
mongoose.connect(MONGO_URL, {})
    .then(
        () => {
            console.log('Se establecio la conexion con mongoDB')

        }
    )
    .catch(
        (error) => {
            console.error('La conexion con mongoDB ha fallado', error)
        }
    )
    .finally(
        () => {
            console.log('El proceso de conexion con la DB esta finalizado')
        }
    )
//de esta forma se puede exportar
export default mongoose