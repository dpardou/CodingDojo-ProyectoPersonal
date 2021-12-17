const {ParkingLot} = require('../models/parkingLots.model');

module.exports.create = (req, res) => {
    ParkingLot.create(req.body)
    .then(data => res.json({ ok: true, message: 'Se agregó el estacionamiento', data: data }))
    .catch(error => {
        if(error.name == 'ValidationError')
            res.status(500).json({ ok: false, message: error.message, error: error });
        else {
            res.status(500).json({ok: false, message: 'Error al guardar el estacionamiento'})    
        }
    });
}

module.exports.edit = (req, resp) => {
    ParkingLot.findOneAndUpdate({_id: req.params.id }, req.body)
        .then(data => resp.status(200).json({ ok: true, message: 'Se actualizó el estacionamiento', data: req.body}))
        .catch(error => {
            if(error.name === 'ValidationError'){
                resp.status(500).json({ok: false, message: error.message, error: error})
            } else{ 
                resp.status(500).json({ok: false, message: 'Error al acualizar el estacionamiento'})    
            }
        });
}

module.exports.get = (req, res) => {
    ParkingLot.findById(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Estacionamiento encontrado correctamente', data: data}))
        .catch(error => {
            console.log('Ocurrió un error en el Get', error);
            res.status(500).json({ok: false, message: 'Error al obtener el estacionamiento'})
        });
}

module.exports.getAll = (req, res) => {
    ParkingLot.find()
        .then(data => res.status(200).json({ ok: true, message: 'Listado de estacionamientos obtenido correctamente', data: data}))
        .catch(error => {
            console.log('Ocurrió un error en el GetAll', error);
            res.status(500).json({ok: false, message: 'Error al obtener el listado de estacionamientos'})
        });
}

module.exports.delete = (req, res) => {
    ParkingLot.findByIdAndRemove(req.params.id)
        .then(data => res.status(200).json({ ok: true, message: 'Se eliminó  el estacionamiento correctamente', data: data}))
        .catch(error => {
            console.log('Ocurrió un error en el Delete', error);
            res.status(500).json({ok: false, message: 'Error al eliminar el estacionamiento'})
        });
}