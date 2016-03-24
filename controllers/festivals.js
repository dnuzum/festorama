var express = require('express');
var Festival = require('../models/festival');
var router = express.Router();

router.route('/')
  .get(function(req, res) {
    Festival.find(function(err, festivals) {
      if (err) return res.status(500).send(err);
      res.send(festivals);
    });
  })
  .post(function(req, res) {
    Festival.create(req.body, function(err, festival) {
      if (err) return res.status(500).send(err);
      res.send(festival);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Festival.findById(req.params.id, function(err, festival) {
      if (err) return res.status(500).send(err);
      res.send(festival);
    });
  });

module.exports = router;
