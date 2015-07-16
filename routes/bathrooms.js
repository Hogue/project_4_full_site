var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Bathroom = require('../models/bathrooms.js');
var fs = require('fs');

router.get('/', function(req, res) {
  Bathroom.find({}, function(err, bathroomList) {
    if (err) {
      res.sendStatus(404);
    }
    res.status(200);
    res.json(bathroomList);

  });
});

router.post('/', function(req, res) {
  Bathroom.create({
    id: req.body.id,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    title: req.body.title,
    place_id: req.body.place_id
  }, function(err){
    if(err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

module.exports = router;
