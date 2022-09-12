// activasmos este metodo para poder trabjar con promesas
// nota este archivo marca error si uso el formato TSX 
import { enablePromise, openDatabase } from 'react-native-sqlite-storage';
enablePromise(true);

// definimos el nombre de la base de datos
const DATABASE_NAME = 'rpalocal.db';

// creamos una funcion que nos permita una conexion ala base de datos (como yo lo entendi es hacer un llamado ala libreria y me cree la bd con el nombre)
export async function getDbConnection() {
    const db = await openDatabase({ name: DATABASE_NAME, location: 'default' });
    console.log('conexion creada')
    return db;
}
// ya creada la bd creamos una funcion para generar las tablas que necesitamos
export async function createTables(db) {
    const query =
        'CREATE TABLE IF NOT EXISTS rpalocal(id INTEGER PRIMARY KEY AUTOINCREMENT, ps FLOAT(30), pd FLOAT(30), pm FLOAT(30), time VARCHAR(30))';
    await db.executeSql(query);
    console.log('Tabla Creada')
}

// ahora ejecutaremos las funciones para poder crear la bd con todo lo solicitado en otras palabras inicializamos la bd
export async function initDataBase() {
    const db = await getDbConnection();
    await createTables(db);
    db.close();// cerramos la peticon
    console.log('conexion cerrada')
}

//metodo para poder hacer una una insercion a la bd
export async function insertData(db, ps, pd, pm, time) {
    const insertQuery = `INSERT INTO rpalocal (ps, pd, pm, time) values ('${ps}', '${pd}', '${pm}', '${time}')`;
    console.log('Insercion en la bd')
    return await db.executeSql(insertQuery);
}

// para poder solicitar los datos de la bd
export async function getData(db) {
    const data = [];
    const results = await db.executeSql('SELECT * FROM rpalocal');
    console.log("estos son los resutados optenido de la bd");
    console.log(results);
    results.forEach(function (resultSet) {
        for (let index = 0; index < resultSet.rows.length; index++) {
            data.push(resultSet.rows.item(index));
        }
    });
    return data;
}


export async function getDate() {
    /**
 * It returns a string in the format of "YYYY-MM-DD:HH:MM:SS"
 * @returns A string.
 */
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var SetData = year + '-' + month + '-' + date + ':' + hours + ':' + min + ':' + sec;
    return SetData;
}
