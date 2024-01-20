const express = require('express'); //llamamos a express
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

dotenv.config({path: './env/.env'})

//MOTOR DE PLANTILLA
app.set('view engine', 'ejs')

//se usa para formularios, si no lo ponemos nos da el error:TypeError: Cannot read properties of undefined 
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


// importar el router
app.use('/', require('./routes/router'))

//ruta estatica, public va a ser la ruta estatica
app.use(express.static(path.join(__dirname, '/public')))

//escuchamos un puerto
app.listen(5000, ()=>{
    console.log('Servidor corriendo en puerto: 5000')
});

