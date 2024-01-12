const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promosify} = require('util')

//procedure para register
exports.register = async (req, res) => {
    
    try {
        const name = req.body.name
        const email = req.body.email
        const pass = req.body.pass
        let passHash = await bcryptjs.hash(pass, 10)
        //console.log(name + '-' + email + '-' + passHash)
        //conexion con la bd para enviarle los datos
        conexion.query('INSERT INTO users SET ?', {
            name: name,
            email: email,
            pass: passHash
        }, (error, results) => {
            if(error){
                console.error(error)
            }
            res.redirect('/')
        })    
    } catch (error) {
        console.error(error)
    }
}

//procedure oara logout
exports.logout = (req, res) => {
    return res.redirect('/')
}