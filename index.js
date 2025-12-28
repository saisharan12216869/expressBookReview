const express = require('express');
const bodyParser = require('body-parser');

const general_routes = require('./router/general').general;
const user_routes = require('./router/auth_users').authenticated;

const app = express();
app.use(bodyParser.json());

app.use('/', general_routes);
app.use('/auth', user_routes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
