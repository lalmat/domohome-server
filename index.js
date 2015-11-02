// API Stuff
var express = require ('express');
var port    = 8080;
var app     = express();

var domo    = require ('./domotic.js');

domo.config = {
  'door_lock': {pin:7, state:0, mode:'output'}
}
domo.init();

app.get('/setItem', function (req, res) {
  var item  = req.query.item;
  var state = req.query.state % 2;
  domo.set(item, state, function() {
    res.send(domo.config[item]); 
  });
});

app.get('/getItem', function (req, res) {
  var item  = req.query.item;
  res.send(domo.config[item]);
});

//TODO: Add authentication Layer

var server = app.listen(port);
console.log("API Ready");
