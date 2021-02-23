var express = require('express');


// ==============================================================================
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// ==============================================================================

// Tells node that we are creating an "express" server
var app = express();

var PORT = process.env.PORT || 8080;
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('routes/apiRoutes')(app);
require('routes/htmlRoutes')(app);

app.listen(PORT, function () {
  console.log('App listening on PORT: ' + PORT);
});