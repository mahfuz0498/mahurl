const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


// Include controller
const convertController = require('./controllers/convert')
const homeController = require('./controllers/home')

const port = 3000

// body parser middle ware
app.use(bodyParser.urlencoded({extended :false}));
app.use(bodyParser.json());

// Database key
const db = require('./config/keys').mongoURL;

// connect to  mong,{ useUnifiedTopology: true }odb
mongoose.connect(db,{ useUnifiedTopology: true })
	.then(() => console.log(`mongoose connected`))
	.catch((err) => console.log(err));


// Include user model
const Url = require('./models/url')

// set up handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// serve static files
app.use(express.static('public'))

app.get('/', homeController)

app.get('/convert', convertController.getShortened)

app.get('/:shortenedUrl', convertController.getOriginal)

app.listen(process.env.PORT || port, () => {
  console.log('App is running')
})