const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/User');


Router.post('/register', UserController.RegisterUser);

Router.post('/login', UserController.LoginUser);

// Router.post('/finduser', UserController.GetUserById);

Router.get('/', UserController.GetUsers);

module.exports = Router; 