var express = require('express');
var path = require('path')

var app = express();

//find all of the assets for our page
app.use(express.static(__dirname+'/../client/'));

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8001;

// set the home page route
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/../client/index.html'))
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});