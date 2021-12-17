const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const parkingLotSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
    },
    calle: {
      type: String,
      required: [true, 'El nombre de la calle es requerido'],
      min: [3, 'el nombre de la calle no puede tener menos de 3 caracteres'],
      max: [60, 'el nombre de la calle no puede tener más de 60 caracteres'],
    },
    numero: {
      type: Number,
      required: [true, 'El numero es requerido'],
    },
    comuna: {
      type: String,
      required: [true, 'La comuna es requerid'],
    },
    lat: {
      type: String,
      required: [true, 'La coordenada latitud es requerida'],
    },
    long: {
      type: String,
      required: [true, 'La coordenada longitud es requerida'],
    },
}, { timestamps: { createdAt: true, updatedAt: true }});

parkingLotSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico porfavor' });
const ParkingLot = mongoose.model('ParkingLot', parkingLotSchema, 'parkingLots');
module.exports = {ParkingLot};