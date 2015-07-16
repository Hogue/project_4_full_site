var config = require('../config');
var async = require('async');
var mongoose = require('mongoose');

// connect to the contacts DB.
mongoose.connect(config.mongo.dbUrl);

// Contact is the constructor function for the Contact model.
var Bathroom = require('../models/bathrooms.js');
// var Image = require('../models/books.js');
// var Image = require('../models/images.js');

var removeBathrooms = function(done) {
  Bathroom.remove({}, done);
};

var addBathroom = function(done) {
  Bathroom.create({
    longitude: -122.14301949999998,
    latitude: 37.4418834,
    title: 'Palo, Alto, CA',
  }, done);
};

async.series([
  // remove contacts
  removeBathrooms,
  // create socks contacts
  addBathroom
  ],
  // fire the function that will be invoked
  // when the above functions are done
  function(err) {
    if(err) {
      console.error(err);
    }
    // drop the db, because we don't need it anymore
    mongoose.disconnect();
  }

  );
