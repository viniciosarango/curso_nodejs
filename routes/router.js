const express = require('express')
const router = express.Router()

//invocar a la conexion de la bdd

const conexion = require ('../database/db')


//creacion de ruta inicial
router.get('/', (req, res) =>{
    //res.send('Hola mundo desde rutas!')
    
     conexion.query('SELECT * FROM users', (error, results) => {
         if(error){
             throw error;
         } else {
             //res.send(results);
             res.render('index', {results: results}) // pasamos los resultadoa como una variable
         }
     })
})

router.get('/create', (req, res) =>{
    res.render('create')
})

//invocamos al metodo pata el CRUD  de usuarios, llamamo al metodo save
const userController = require('../controllers/userController')
router.post('/save', userController.save)


//tenemos que exportar hacia el app
module.exports = router