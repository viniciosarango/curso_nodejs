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
             res.render('users', {results: results}) // pasamos los resultadoa como una variable
         }
     })
})

router.get('/createUser', (req, res) =>{
    res.render('createUser')
})

router.get('/editUser/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {            
            res.render('editUser', {user: results[0] }) 
        }
    })
})

//invocamos al metodo pata el CRUD  de usuarios, llamamo al metodo save
const userController = require('../controllers/userController')

router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)

//el delete lo hacemos directamente aqui
router.get('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM users WHERE id= ?', [id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor.");
        } else {
            res.redirect('/');
        }
    })
});

//tenemos que exportar hacia el app
module.exports = router