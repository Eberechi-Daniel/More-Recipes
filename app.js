const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', (req, res) => res.status(200).send({
	message: 'Welcome to the beginning of Nothingness.',
}));

module.exports = app;

/*const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));

});*/