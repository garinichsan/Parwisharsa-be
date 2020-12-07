const express = require('express');
const mongoose = require('mongoose');

const app = express();

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// DB congig
const db_link = "mongodb+srv://garin:kapalair@cluster0.ggvbv.mongodb.net/parwisharsa";

// Connect to MongoDB
mongoose.connect( db_link, { useNewUrlparser: true } )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Route
app.get('/', (req, res) => res.send('Expres Active!'));

let apiRoutes = require("./api-routes")
app.use('/api', apiRoutes)

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));


