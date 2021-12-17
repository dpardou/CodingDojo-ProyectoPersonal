const ParkingLotController = require('../controllers/parkingLot.controller');

module.exports = app => {
    app.get('/api/parkingLots', ParkingLotController.getAll);
    app.get('/api/parkingLots/:id', ParkingLotController.get);
    app.post('/api/parkingLots', ParkingLotController.create);
    app.put('/api/parkingLots/:id', ParkingLotController.edit);
    app.delete('/api/parkingLots/:id', ParkingLotController.delete);
}