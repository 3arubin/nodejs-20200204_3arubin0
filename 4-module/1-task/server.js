const url = require('url');
const http = require('http');
const path = require('path');
const {createReadStream} = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);
  const filepath = path.join(__dirname, 'files', pathname);


  switch (req.method) {
    case 'GET':
      if (pathname.indexOf('/') === -1) {
        const readStream = createReadStream(filepath);
        readStream.pipe(res);

        readStream.on('end', () => {
          res.statusCode = 200;
          console.log('end');
        });

        readStream.once('error', () => {
          res.statusCode = 404;
          console.log('error');
          res.end();
        });
        break;
      }
      res.statusCode = 400;
      res.end();
    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
