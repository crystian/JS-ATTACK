/**
 * Created by geronimo on 11/28/14.
 */

var express = require('express');
var app = express();

app.get('/', function(req, res, next){
    res.send("Hellow world");

});

app.get('/course', function(req, res, next){
    res.send("Hellow world");

});

app.get('/course/:track', function(req, res, next){
    res.send("Hellow world");

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});