//CONEXION A BASE DE DATOS

const mysql = require('mysql')

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_nodejs'
    
})

conexion.connect ((error) =>{
    if(error) {
        console.error('The connection error is:' + error)
        return
    }
    console.log('Conectado a la bdd en mysql')
})

module.exports = conexion
