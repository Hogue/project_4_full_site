// Load MongoDB driver
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our bathroom schema
var bathroomSchema = new mongoose.Schema({
  id: Number,
  longitude: Number,
  latitude: Number,
  title: String,
  place_id: String
});

// We bind the Location model to the LocationSchema
module.exports = mongoose.model('Bathroom', bathroomSchema);
