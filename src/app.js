const app = require('express')()
const bodyParser = require('body-parser')
const router = require('./routes')
const port = 3000


// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', router)

app.listen(port, ()=> console.log(`server listening on ${port}`))
