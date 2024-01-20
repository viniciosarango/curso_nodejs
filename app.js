const express = require('express'); //llamamos a express
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const { json } = require('express')
const multer = require('multer')






//MOTOR DE PLANTILLA
app.set('view engine', 'ejs')

//middlewares
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

app.use(multer({
    storage,
    dest: path.join(__dirname, 'public/uploads'),
    limits: {fileSize: 2 * 1024 * 1024},  // 2 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const mimetype = filetypes.test(file.mimetype)
        const extname = filetypes.test(path.extname(file.originalname))
        if (mimetype && extname) {
            return cb(null, true)
        }
        cb("Error: File must be an valid image")
    }
}).single('image'));


dotenv.config({path: './env/.env'})

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

