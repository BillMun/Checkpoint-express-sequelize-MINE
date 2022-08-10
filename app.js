const express = require('express');
const app = express();
module.exports = app; // this line is only used to make testing easier.
const morgan = require('morgan')
const todos = require('./models/express-models/todos')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

// remember to plug in your router and any other middleware you may need here (i.e. body parser, mounting any router-level middleware, etc.)

const routes = require('./routes/index')
app.use('/users', routes)

app.use((err, req, res, next) => {
  res.sendStatus(err.status);
});

// app.listen(8080, ()=>{
//     console.log('App listening in port 8080')
// })

if (!module.parent) app.listen(3000); // conditional prevents a very esoteric EADDRINUSE issue with mocha watch + supertest + npm test.
