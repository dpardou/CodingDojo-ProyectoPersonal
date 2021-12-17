const {  register, login } = require('../controllers/user.controller');
const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.post('/api/register', register);
    app.post('/api/login', login);

    app.get('/api/users', authenticate, UserController.getAll);
    app.get('/api/users/:id', authenticate, UserController.get);
    app.put('/api/users/:id', authenticate, UserController.update);
    app.delete('/api/users/:id', authenticate, UserController.delete);
}