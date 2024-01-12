//llamanos a la bd
const conexion = require('../database/db')

//procedure to "save"
exports.saveUser = (req, res) => {
    const email = req.body.email
    const name = req.body.name
    const rol = req.body.rol
    
    //console.log(email + " - " + name + " - " + rol)
    conexion.query('INSERT INTO users SET ?', {email:email, name:name, rol:rol}, (error, results) => {
        if(error){
            console.log(error)
        } else {
            res.redirect('/users')
        }
    });
}

//procedure to "edit"
exports.updateUser = (req, res) => {
    const id = req.body.id
    const email = req.body.email
    const name = req.body.name
    const rol = req.body.rol
        
    conexion.query('UPDATE users SET name = ?, email = ?, rol = ? WHERE id = ?', [name, email, rol, id], (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error interno del servidor.");
        } else {
            res.redirect('/users');
        }
    });        
}
