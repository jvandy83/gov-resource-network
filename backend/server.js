const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
var jwt = require('express-jwt');
// var jwks = require('jwks-rsa');

const cookieParser = require('cookie-parser');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const keys = require('./config/keys');

// app.use(jwtCheck);
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

app.use('/v1/api', apiRoutes);
app.use('/v1/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.log('error inside Error middleware', err);
  const status = err.statusCode || 500;
  const message = err.message;
  const { data } = err;
  res.status(status).json({ message: message, data });
});

mongoose
  .connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then((result) => {
    console.log(`${keys.mongoURI.blue} connected & app is running!!!`);
    app.listen(keys.port, (err) => {
      console.log(`App listening on port ${keys.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
