//CONEXION A BASE DE DATOS

const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE    
})

conexion.connect ((error) =>{
    if(error) {
        console.error('The connection error is:' + error)
        return
    }
    console.log('Conectado a la bdd en mysql')
})

module.exports = conexion
