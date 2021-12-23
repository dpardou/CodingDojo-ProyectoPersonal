const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/jwt.config');

module.exports.register = (req, res) => {
    
    User.find({$or: [{email: req.body.email }, {username: req.body.username}]})
        .then(data => {
            if(!data || data.length == 0) {
                
                
                User.create(req.body)
                    
                    .then(user => res.status(200).json({ ok: true, message: 'Usuario registrado correctamente', data: user}))
                    .catch(error => {
                        
                        if(error.name === 'ValidationError'){
                            res.status(200).json({ok: false, message: error.message, error: error})
                        } else{ 
                            
                            res.status(200).json({ok: false, message: '1.- Error al registrar el usuario'})    
                        }
                    });
            } else {
                res.status(200).json({ok: false, message: 'El usuario ya existe'})    
            }
        }).catch(error => {
            if(error.name === 'ValidationError'){
                res.status(200).json({ok: false, message: error.message, error: error})
            } else{ 
                res.status(200).json({ok: false, message: '2. Error al registrar el usuario'})    
            }
        })
}

module.exports.login = (req, res) => {
    User.find({ $or: [{email: req.body.username }, {username: req.body.username}] })
        .then(resp => {
            if(resp && resp.length == 1) {
                bcrypt.compare(req.body.password, resp[0].password)
                    .then(valid => {
                        if(valid) {
                            const payload = {
                                id: resp[0]._id,
                                name: resp[0].name,
                                email: resp[0].email
                            }
                            const token = jwt.sign(payload, secret);
                            res.cookie("usertoken", token, secret, { httpOnly: true })
                                .json( {ok: true, message: 'Usuario autenticado correctamente', data: payload}); 
                        } else {
                            res.json({ ok: false, message: '1.- Usuario o clave inválido' });
                        }
                    })
            } else {
                res.json({ ok: false, message: '2.- Usuario o clave inválido' });
            }
        }).catch(error => res.json({ ok: false, message: '3.- Usuario o clave inválido' }));
}


module.exports.getAll = (request, response) => {
    User.find({})
        .then(data => response.json(data))
        .catch(err => response.json(err))
}

module.exports.get = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(data => response.json(data))
        .catch(err => res.status(400).json(err))
}

module.exports.update = (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, { new: true , runValidators: true})
        .then(data => response.json(data))
        .catch(err => res.status(500).json(err))
}

module.exports.delete= (request, response) => {
    User.deleteOne({ _id: request.params.id })
        .then(data=> response.json(data))
        .catch(err => res.status(400).json(err))
}