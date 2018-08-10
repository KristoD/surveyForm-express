var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/assets'));
app.use(session({secret: 'veryVERYsecretkey'}));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/resultForm', function(req, res) {
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language ;
    req.session.comment = req.body.comment;
    res.redirect('/result')
});

app.get('/result', function(req, res) {
    var results = {
        "name" : req.session.name,
        "location" : req.session.location,
        "language" : req.session.language,
        "comment" : req.session.comment
    }
    console.log(req.session.name)
    res.render('result', {result: results})
});

app.listen(8000, function() {
    console.log("Server listening on port 8000...");
});

