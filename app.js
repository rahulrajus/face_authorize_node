var express = require('express');
var app = express();
var multer = require('multer');
var autoReap  = require('multer-autoreap');
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(autoReap);
app.use(require('./controllers'));

app.get('/',function(req,res){
	res.sendFile(__dirname + "/index.html");
});

app.listen('3000', function(){

});
