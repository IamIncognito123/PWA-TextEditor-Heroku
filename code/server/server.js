const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use function to set up middleware, handles all requests
// serves up static files from the dist folder (static files are unchanged files while the application is running)
app.use(express.static('../client/dist'));

// used for put and post requests
// urlencoded parses the requests coming in with urlencoded payloads that allows us to access the req.body
// recognizes the request objects as strings or arrays
app.use(express.urlencoded({ extended: true }));

// recognizes the request objects as a json object
app.use(express.json());

// not sure what this line does
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
