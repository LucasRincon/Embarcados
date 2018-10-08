const express = require('express');
const Joi = require('joi');

const db = require('../db');
const location = db.get('location');

const router = express.Router();

const schema = Joi.object().keys({
	latitude: Joi.number().min(-90).max(90).required(),
	longitude: Joi.number().min(-180).max(180).required()
});

router.get('/', (req, res) => {
  location
	.find()
	.then(allLocation => {
		res.json(allLocation)
	});
});

router.post('/', (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if(result.error == null){
    const {latitude, longitude} = req.body;
    const userLocation = {
      latitude,
      longitude,
      date: new Date()
    };
    location
	.insert(userLocation)
	.then(insertedLocation =>{
		res.json(insertedLocation);
  });
  }else{
    next(result.error);
  }

});

module.exports = router;
