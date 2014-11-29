/**
 * Created by geronimo on 11/28/14.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var Datastore = require('nedb');
var Promise = require('bluebird');
var marked = require('marked');

var path = require('path');
var fs = Promise.promisifyAll(require('fs'));

var app = express();

var db = new Datastore({filename: './datastore/user.db', autoload: true});
Promise.promisifyAll(Object.getPrototypeOf(db));

app.set('views', path.join(__dirname, '../www'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: '1234567890QWERTY',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '../www')));

app.get('/', function(req, res){
    res.sendFile('index.html', { root: '/../www'});
});

app.get('/test', function(req, res){
    res.sendFile('test.html', { root: '../www'});
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
        req.session.userId = newDoc._id;
        console.log(newDoc);
        return res.sendStatus(200);
    });
});

app.post('/success', function(req, res){
    var id = req.session.userId;
    var key = 'exercise' + req.param('exercise');
    var script = req.param('script');
    var criteria, payload, upd;

    if([id, key, script].some(function(el){ return !el; })){
        return res.status(500).json({ data: { code: 500, msg: "Something went wrong"}});
    }

    payload = {};
    payload[key] = script;

    criteria = { _id: id };
    upd = { $set: payload };

    db.updateAsync(criteria, upd).then(function(replaced){
        console.log('updated: ' + replaced);
        return res.sendStatus(200);
    });
});

app.get('/course/:track', function(req, res){
    function getDescription(track){
        return fs.readFileAsync(path.join(__dirname, '../www/data/exercise' + track + '.md'));
    }

    function getCode(track){
        return fs.readFileAsync(path.join(__dirname, '../www/exercises/exercise' + track + '.js'));
    }

    var t = req.param('track');
    var join = Promise.join;
    var spec = '../spec/' + t + '/runner.html';

    join(getCode(t), getDescription(t), function(exercise, description){
        res.render('code', { track: t, exercise: exercise, description: marked(description.toString()), spec: spec });
    });
});

app.get('/course', function(req, res){
    res.sendFile('code.html', { root: './../www'});
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});