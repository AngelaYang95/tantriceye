const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

/** SERVES STATIC FILES FROM PRODUCTION FOLDER DIST. */
app.use(express.static(path.join(__dirname + '/dist')));

// Default every route except the above to serve the index.html
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + 'dist/index.html'));
});

app.get('/about', function(req, res) {  
  res.sendFile(path.join(__dirname + 'dist/about.html'));
});

app.listen(port, function() {  
    console.log('Express server listening on port ' + port);
});
