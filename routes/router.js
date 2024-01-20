const express = require('express')
const router = express.Router()

//invocamos al metodo pata el CRUD  de usuarios, 
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

//invocar a la conexion de la bdd

const conexion = require ('../database/db')

//creacion de ruta inicial
router.get('/users', (req, res) =>{
    //res.send('Hola mundo desde rutas!')    
     conexion.query('SELECT * FROM users', (error, results) => {
         if(error){
             throw error;
         } else {
             //res.send(results);
             res.render('users', {results: results, titleWeb: "List users"}) // pasamos los resultadoa como una variable
         }
     })
})

router.get('/createUser', (req, res) =>{
    res.render('createUser', { titleWeb: "Create user" })
})

router.get('/editUser/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id= ?', [id], (error, results) => {
        if(error){
            throw error;
        } else {            
            res.render('editUser', {user: results[0], titleWeb: "Edit user" }) 
        }
    })
})

//el delete lo hacemos directamente aqui
router.get('/deleteUser/:id', (req, res) => {
    const id = req.params.id
    conexion.query('DELETE FROM users WHERE id= ?', [id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor.");
        } else {
            res.redirect('/users');
        }
    })
});

router.post('/saveUser', userController.saveUser)
router.post('/updateUser', userController.updateUser)


//router for views
router.get('/', authController.isAuthenticated, (req, res) => {
    res.render('index', {userName: row.name, image: row.image, titleWeb: "Control Dashboard"})
})


router.get('/logout', authController.logout)

router.get('/login', (req, res) => {
    res.render('login', {alert:false})
})

router.get('/register', (req, res) => {
    res.render('register', {alert:false})
})

router.post('/register', authController.register)
router.post('/login', authController.login)

router.post('/upload/:id', (req, res) =>{
    const id = req.params.id
    const image = req.file.filename

    conexion.query('UPDATE users SET ? WHERE id= ?', [{image:image}, id], (error, results) => {
        if (error) {
            console.error(error);            
        } else {
            res.redirect('/users');
        }
    })

})

//tenemos que exportar hacia el app
module.exports = router