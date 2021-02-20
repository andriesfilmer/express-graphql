const express = require('express')
const { graphqlHTTP } = require('express-graphql')

// CORS - Access-Control-Allow-Origin.
const cors = require("cors");

// Body parsing middleware to populate req.body
const bodyParser = require('body-parser')

// Validates JsonWebTokens and set req.user.
const jwt = require('jsonwebtoken')

// Read config from json files.
const config = require('./src/config')

const corsOptions = { origin: config.env().cors_url};
const schema = require('./src/schema')
const query = require('./src/resolvers/query')

const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    token = req.headers.authorization.replace('Bearer ','')
    jwt.verify(token, 'secret', (err, decoded) => {
      if (err){
        if (req.path === '/graphql') {
          return res.status(401).send(config.errors('verifyToken')).end();
        } else {
          return res.status(401).send('No valid authorization token').end();
        }
      } else {
        console.log("######## decoded.foo: " + decoded.foo);
        next();
      }
    });
  } else if (config.env().name === 'development') {
    next();
  } else {
    return res.send('TOKEN required in HTTP HEADERS: Authorization: "Bearer __TOKEN__"')
  }
}

const app = express();
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.post('/auth', (req, res) => {
  const token = jwt.sign({ foo: 'bar' }, 'secret')
  res.send(token);
})
app.use(verifyToken)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: query,
  graphiql: config.env().graphiql,
}))
app.listen(3000,() => console.log('Server started on port 3000 in ' + config.env().name))
