const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

var GoogleSpreadsheet = require('google-spreadsheet');
var doc = new GoogleSpreadsheet('1N1J1lVat6ruxSh7_knh_ihjpFxsNjSuaKUziw31RLII');

var port = process.env.PORT || 8080;

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/views'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});

app.get('/thanks', (req, res) => {
    res.render('thanks');
});

app.post('/thanks', (req, res) => {
    var certs = require('./certs.json')
    doc.useServiceAccountAuth(certs, function() {
        doc.addRow(1, req.body, () => {
            res.render('thanks', { contact: req.body });
        });
    });
});

app.listen(port, () => {
    console.log('App is running on http://localhost:' + port);
});
