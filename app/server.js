/**
 * Created by geronimo on 11/28/14.
 */

var express = require('express');
var bodyParser = require('body-parser');
var Datastore = require('nedb');
var Promise = require('bluebird');
var app = express();

var db = new Datastore({filename: './datastore/user.db', autoload: true});
Promise.promisifyAll(Object.getPrototypeOf(db));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../www'));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: './../www'});
});

app.post('/register', function(req, res){
    var name = req.param('name');
    var email = req.param('email');
    var phone = req.param('phone');

    if([name, email, phone].some(function(el){ return !el; })){
        return res.status(500).json({ data: { code: 500, msg: "Something went wrong"}});
    }

    var doc = {
        name: name,
        email: email,
        phone: phone
    };

    db.insertAsync(doc).then(function(newDoc){
        console.log(newDoc);
        return res.sendStatus(200);
    });

    console.log(req.param('name'));
    console.log(req.param('email'));
    console.log(req.param('phone'));
});

app.get('/course', function(req, res){
    res.sendFile('code.html', { root: './../www'});
});

app.get('/course/:track', function(req, res){
    res.send("Hellow world");

});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});