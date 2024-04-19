const express = require('express');
const Router = express.Router();
const TrackerController = require('../controllers/Tracker');

Router.post('/', TrackerController.CreateEntry);

Router.get('/', TrackerController.GetAllEntries);

Router.delete('/', TrackerController.DeleteEntry);

module.exports = Router; 