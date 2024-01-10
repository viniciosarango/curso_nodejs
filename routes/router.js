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

router.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {            
            res.render('edit', {user: results[0] }) 
        }
    })
})




//invocamos al metodo pata el CRUD  de usuarios, llamamo al metodo save
const userController = require('../controllers/userController')

router.post('/save', userController.save)
router.post('/update', userController.update)

//el delete lo hacemos directamente aqui
router.get('/delete/:id', (req, res) => {
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