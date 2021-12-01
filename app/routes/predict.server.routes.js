const predict = require("../controllers/predict.server.controller");

var express = require('express');
var router = express.Router();
module.exports = function (app) {

  app.get("/results", predict.trainAndPredict);
};