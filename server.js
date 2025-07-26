const { createServer } = require('node:http');
const { URL } = require('node:url');

const hostname = '0.0.0.0';
const port = 80

let variable1 = null;

const server = createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${hostname}`);
  const pathname = parsedUrl.pathname;
  const valueParam = parsedUrl.searchParams.get('value');

  if (req.method === 'GET' && pathname === '/variable1') {
    // Return the current value
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ variable1 }));
  } else if (req.method === 'GET' && pathname === '/setVariable1' && valueParam !== null) {
    // Set variable1 using query parameter
    variable1 = valueParam;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end('Variable1 Updated');
  } else {
    // Not found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}/`);
});
