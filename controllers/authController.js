const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const conexion = require('../database/db')
const {promosify} = require('util')
const nodemailer = require('nodemailer')

//procedure para register
exports.register = async (req, res) => {
    
    try {
        const name = req.body.name
        const email = req.body.email
        const pass = req.body.pass
        
        let passHash = await bcryptjs.hash(pass, 10)
        //console.log(name + '-' + email + '-' + passHash)                
        conexion.query('INSERT INTO users SET ?', {name: name, email: email, pass: passHash}, (error, results) => {
            if(error){
                //console.error(error)
                res.render('register', {
                    //creamos dos variables
                    alert: true,
                    alertMessage: 'Este email ya esta registrado'
                })
            } else {
                //create email body
                contentHTML = `
                    <h1>Informacion de usuario</h1>
                    <ul>
                        <li>Username: ${name}</li>
                        <li>Email: ${email}</li>
                    </ul>                
                `;
                //set email configuration, sender and server
                const transporter = nodemailer.createTransport({
                    host: 'premium78.web-hosting.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: 'info@doriansgym.com',
                        pass: 'a5P7c&=vLYI['
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });

                //send email
                const info = transporter.sendMail({
                    from: "'Dorians Gym' <info@doriansgym.com>",
                    to: email,
                    subject: 'Bienvenido a Dorians Gym',
                    html: contentHTML
                })
                
                res.redirect('/')
            }            
        })    
    } catch (error) {
        console.error(error)
    }
}

//procedure oara logout
exports.logout = (req, res) => {
    return res.redirect('/')
}