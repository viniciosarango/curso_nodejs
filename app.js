const express = require('express'); //llamamos a express
const app = express()

//MOTOR DE PLANTILLA
app.set('view engine', 'ejs')

//se usa para formularios, si no lo ponemos nos da el error:TypeError: Cannot read properties of undefined 
app.use(express.urlencoded({extended:false}))

// importar el router
app.use('/', require('./routes/router'))



//escuchamos un puerto
app.listen(5000, ()=>{
    console.log('Servidor corriendo en puerto: 5000')
});

