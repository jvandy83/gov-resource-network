const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
var jwt = require('express-jwt');
// var jwks = require('jwks-rsa');

const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');

const keys = require('./config/keys');

// var jwtCheck = jwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://dev-pyo61mpz.auth0.com/.well-known/jwks.json'
//   }),
//   audience: 'https://gov-resource/auth',
//   issuer: 'https://dev-pyo61mpz.auth0.com/',
//   algorithms: ['RS256']
// });

// app.use(jwtCheck);
// app.use(cors({ credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
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
  console.log(err);
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
