let app = require('./app');
let http = require('http');

let port = process.env.PORT || 3000;

let server = http.createServer(app);
server.listen(port);

module.exports = server;